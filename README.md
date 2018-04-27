# ng2-adsense [![NPM version][npm-image]][npm-url] [![build status][travis-img]][travis-url] [![coverage status][coverage-img]][coverage-url]

[npm-image]: https://img.shields.io/npm/v/ng2-adsense.svg
[npm-url]: https://npmjs.org/package/ng2-adsense
[travis-img]: https://api.travis-ci.org/scttcper/ng2-adsense.svg?branch=master
[travis-url]: https://travis-ci.org/scttcper/ng2-adsense
[coverage-img]: https://codecov.io/gh/scttcper/ng2-adsense/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/scttcper/ng2-adsense

> Easy AdSense for Angular Applications

Demo: https://scttcper.github.io/ng2-adsense/

## Install

```bash
npm install ng2-adsense
```

## Use

#### Add adsense code

Use the standard AdSense code somewhere in your `<head></head>` as you [normally would](https://support.google.com/adsense/answer/7477845)

```html
<script async src=//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js></script>
```

#### Import NgModule

Add AdsenseModule to the imports of your NgModule

```typescript
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  imports: [
    // shown passing global defaults (optional)
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 7259870550,
    }),
    ...
```

#### Show Ad

Uses global defaults which can be overriden via inputs

```html
<ng-adsense></ng-adsense>
```

## Inputs

| input        | type          | description                                                           |
| ------------ | ------------- | --------------------------------------------------------------------- |
| adClient     | string        | account ca-pub-XXXXXXXXXXXXXXXX                                       |
| adSlot       | string/number | ad slot/number                                                        |
| adFormat     | string        | adsense ad format                                                     |
| adRegion     | string        | older adsense code to make all ads on page the same                   |
| display      | string        | element display style                                                 |
| height       | number        | element height in px                                                  |
| width        | number        | element width in px                                                   |
| layout       | string        | used for in-feed ads                                                  |
| layoutKey    | string        | used for in-feed ads                                                  |
| pageLevelAds | boolean       | enable page-level ads                                                 |
| timeOutRetry | boolean       | on first load sometimes adsense is not ready. retry's push after x ms |
| adtest       | string        | sets up some sort of google test ad                                   |

```html
<ng-adsense
  [adClient]="'ca-pub-7640562161899788'"
  [adSlot]="7259870550"
  [display]="'inline-block'"
  [width]="320"
  [height]="108">
</ng-adsense>
```
