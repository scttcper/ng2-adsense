// from https://github.com/angular/angularfire2/blob/master/tools/build.js
const { rollup } = require('rollup');
const { spawn } = require('child_process');
const { Observable } = require('rxjs');
const { copy, readFileSync, writeFile } = require('fs-extra');
const { prettySize } = require('pretty-size');
const gzipSize = require('gzip-size');
const resolve = require('rollup-plugin-node-resolve');
const pkg = require(`${process.cwd()}/package.json`);

// Rollup globals
const GLOBALS = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
};

// Map of dependency versions across all packages
const VERSIONS = {
  ANGULAR_VERSION: pkg.dependencies['@angular/core'],
  RXJS_VERSION: pkg.dependencies['rxjs'],
  ZONEJS_VERSION: pkg.dependencies['zone.js'],
};

// Constants for running typescript commands
const TSC = 'node_modules/.bin/tsc';
const NGC = 'node_modules/.bin/ngc';
const TSC_ARGS = (config = 'build') => [`-p`, `${process.cwd()}/src/lib/tsconfig-${config}.json`];

/**
 * Create an Observable of a spawned child process.
 * @param {string} command
 * @param {string[]} args
 */
function spawnObservable(command, args) {
  return Observable.create(observer => {
    const cmd = spawn(command, args);
    observer.next(''); // hack to kick things off, not every command will have a stdout
    cmd.stdout.on('data', (data) => { observer.next(data.toString('utf8')); });
    cmd.stderr.on('data', (data) => { observer.error(data.toString('utf8')); });
    cmd.on('close', (data) => { observer.complete(); });
  });
}

/** ignores errors during rollup */
function onwarn(warning) {
  const skip_codes = [
    'THIS_IS_UNDEFINED',
    'MISSING_GLOBAL_NAME',
  ];
  if ( skip_codes.indexOf(warning.code) != -1 ) return;
  console.error(warning);
}

function generateBundle(input, { dest, globals, name }) {
  return rollup({ input, external: Object.keys(globals) }).then(bundle => {
    return bundle.write({
      dest,
      format: 'umd',
      external: Object.keys(globals),
      onwarn,
      plugins: [resolve()],
      globals,
      name,
    });
  });
}

/**
 * Create a UMD bundle given a module name.
 * @param {Object} globals
 */
function createUmd(globals) {
  const name = 'ngadsense';
  const entry = `${process.cwd()}/dist/packages-dist/index.js`;
  return generateBundle(entry, {
    dest: `${process.cwd()}/dist/packages-dist/bundles/ngadsense.umd.js`,
    globals,
    name
  });
}

/**
 * Get the file path of the src package.json for a module
 */
function getSrcPackageFile() {
  return `${process.cwd()}/src/lib/package.json`;
}

/**
 * Get the file path of the dist package.json for a module
 */
function getDestPackageFile() {
  return `${process.cwd()}/dist/packages-dist/package.json`;
}

/**
 * Create an observable of package.json dependency version replacements.
 * This keeps the dependency versions across each package in sync.
 * @param {Object} versions
 */
function replaceVersionsObservable(versions) {
  return Observable.create((observer) => {
    const package = getSrcPackageFile();
    let pkg = readFileSync(package, 'utf8');
    const regexs = Object.keys(versions).map(key =>
      ({ expr: new RegExp(key, 'g'), key, val: versions[key] }));
    regexs.forEach(reg => {
      pkg = pkg.replace(reg.expr, reg.val);
    });
    const outPath = getDestPackageFile();
    writeFile(outPath, pkg, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(pkg);
        observer.complete();
      }
    });
  });
}

function copyPackage() {
  return copy(getSrcPackageFile(), getDestPackageFile());
}

function copyNpmIgnore() {
  return copy(`${process.cwd()}/.npmignore`, `${process.cwd()}/dist/packages-dist/.npmignore`);
}

function copyReadme() {
  return copy(`${process.cwd()}/README.md`, `${process.cwd()}/dist/packages-dist/README.md`);
}

function measure(gzip = true) {
  const path = `${process.cwd()}/dist/packages-dist/bundles/ngadsense.umd.js`;
  const file = readFileSync(path);
  const bytes = gzipSize.sync(file);
  return prettySize(bytes, gzip);
}

/**
 * Returns each version of each AngularFire module.
 * This is used to help ensure each package has the same verison.
 */
function getVersions() {
  const paths = [
    getDestPackageFile(),
  ];
  return paths
    .map(path => require(path))
    .map(pkgs => pkgs.version);
}

function verifyVersions() {
  const versions = getVersions();
  console.log(versions);
  versions.map(version => {
    if (version !== pkg.version) {
      throw new Error('Versions mistmatch');
      process.exit(1);
    }
  });
}

function buildModule(globals) {
  const es2015$ = spawnObservable(NGC, TSC_ARGS());
  const esm$ = spawnObservable(NGC, TSC_ARGS('esm'));
  return Observable
    .forkJoin(es2015$, esm$)
    .switchMap(() => Observable.from(createUmd(globals)))
    .switchMap(() => replaceVersionsObservable(VERSIONS));
}

function buildLibrary(globals) {
  const modules$ = buildModule(globals);
  return Observable
    .forkJoin(modules$)
    // .switchMap(() => Observable.from(copyNpmIgnore()))
    .switchMap(() => Observable.from(copyReadme()))
    .do(() => {
      console.log(`ngadsense.umd.js - ${measure()}`);
      verifyVersions();
    });
}

buildLibrary(GLOBALS).subscribe(
  data => { console.log('data', data) },
  err => { console.log('err', err) },
  () => { console.log('complete') }
);
