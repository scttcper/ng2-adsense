# ng2-adsense [![NPM version][npm-image]][npm-url] [![build status][travis-img]][travis-url] [![coverage status][coverage-img]][coverage-url]

[npm-image]: https://img.shields.io/npm/v/ng2-adsense.svg
[npm-url]: https://npmjs.org/package/ng2-adsense
[travis-img]: https://api.travis-ci.org/scttcper/ng2-adsense.svg?branch=master
[travis-url]: https://travis-ci.org/scttcper/ng2-adsense
[coverage-img]: https://codecov.io/gh/scttcper/ng2-adsense/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/scttcper/ng2-adsense  

> Easy AdSense for Angular Applications   

Demo: https://scttcper.github.io/ng2-adsense/ 

### Install
```bash
npm install ng2-adsense
```

### Use

#### Add adsense code
Use the standard AdSense code somewhere in your `<head></head>` as you [normally would](https://support.google.com/adsense/answer/7477845)
```html
<script async src=//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js></script>
```
#### Add NgModule
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
#### Use
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

