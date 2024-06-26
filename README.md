# ng2-adsense [![NPM version][npm-image]][npm-url][![coverage status][coverage-img]][coverage-url]

[npm-image]: https://img.shields.io/npm/v/ng2-adsense.svg
[npm-url]: https://npmjs.org/package/ng2-adsense
[coverage-img]: https://codecov.io/gh/scttcper/ng2-adsense/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/scttcper/ng2-adsense

> Easy AdSense for Angular Applications

**Demo**: https://ng2-adsense.xmplaylist.com/

## Install

```
npm install ng2-adsense
```

## Dependencies

Latest version available for each version of Angular

| ng2-adsense | Angular     |
| ----------- | ----------- |
| 5.4.3       | 5.x 6.x 7.x |
| 6.0.3       | 8.x         |
| 8.0.1       | 9.x         |
| 9.1.0       | 10.x 11.x   |
| 10.1.0      | 12.x 13.x   |
| 11.0.0      | 14.x        |
| 12.0.0      | 15.x        |
| 13.0.0      | 16.x        |
| current     | >=17        |

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

| input               | type          | description                                         |
| ------------------- | ------------- | --------------------------------------------------- |
| adClient            | string        | account ca-pub-XXXXXXXXXXXXXXXX                     |
| adSlot              | string/number | ad slot/number                                      |
| adFormat            | string        | adsense ad format                                   |
| adRegion            | string        | older adsense code to make all ads on page the same |
| display             | string        | element display style                               |
| fullWidthResponsive | boolean       | enable full width responsive ad                     |
| height              | number        | element height in px                                |
| width               | number        | element width in px                                 |
| layout              | string        | used for in-feed ads                                |
| layoutKey           | string        | used for in-feed ads                                |
| pageLevelAds        | boolean       | enable page-level ads                               |
| adtest              | string        | sets up some sort of google test ad                 |
| className           | string        | add custom class names to the "ins" element         |

```html
<ng-adsense
  [adClient]="'ca-pub-7640562161899788'"
  [adSlot]="7259870550"
  [display]="'inline-block'"
  [width]="320"
  [height]="108"
></ng-adsense>
```
