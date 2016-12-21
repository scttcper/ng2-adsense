export default {
  entry: './deploy/ng2-adsense.js',
  dest: './deploy/ng2-adsense.umd.js',
  format: 'umd',
  moduleName: 'ngadsense',
  globals: {
    '@angular/core': 'ng.core',
  }
};
