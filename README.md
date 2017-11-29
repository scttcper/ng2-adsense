# ng2-adsense  
[![NPM version][npm-image]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage status][coverage-img]][coverage-url]
[![greenkeeper][greenkeeper-image]][greenkeeper-url]

[npm-image]: https://img.shields.io/npm/v/ng2-adsense.svg
[npm-url]: https://npmjs.org/package/ng2-adsense
[travis-img]: https://api.travis-ci.org/scttcper/ng2-adsense.svg?branch=master
[travis-url]: https://travis-ci.org/scttcper/ng2-adsense
[coverage-img]: https://codecov.io/gh/scttcper/ng2-adsense/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/scttcper/ng2-adsense  
[greenkeeper-image]: https://badges.greenkeeper.io/scttcper/ng2-adsense.svg
[greenkeeper-url]: https://greenkeeper.io/

Demo: https://scttcper.github.io/ng2-adsense/ 

### 1. Install
```bash
npm install ng2-adsense --save
```

### 2. Place Code
Use the standard AdSense code somewhere on your index.html.
```html
<script async src=//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js></script>
```
### 3. Add to NgModule
Add AdsenseModule to the imports of your NgModule
```typescript
import { AdsenseModule } from 'ng2-adsense';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // shown passing optional global defaults
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 7259870550,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### 4. Use
Use global defaults  
```html
<ng-adsense></ng-adsense>
```

__adClient__ and __adSlot__ will override the global defaults if set  
__display__, __width__, __height__ are all applied to the "ins" element and help specify size for ads  
__layout__, __layoutKey__ are available for in feed ads  
__pageLevelAds__ enables adsense page level ads  
```html
<ng-adsense
  [adClient]="'ca-pub-7640562161899788'"
  [adSlot]="7259870550"
  [display]="'inline-block'"
  [width]="320"
  [height]="108">
</ng-adsense>
```

### SystemJS
If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, `map` needs to tell the System loader where to look for `ng2-adsense`:
```js
map: {
  'ng2-adsense': 'node_modules/ng2-adsense/ng2-adsense.umd.js',
}
```
