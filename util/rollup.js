const sourcemaps = require('rollup-plugin-sourcemaps');

export default {
  entry: './deploy/ng2-adsense.js',
  dest: './deploy/ng2-adsense.umd.js',
  format: 'umd',
  moduleName: 'ngadsense',
  sourceMap: true,
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
  },
  external: [
    '@angular/core',
    '@angular/common',
  ],
  plugins: [
    sourcemaps()
  ]
};
