import { async, TestBed } from '@angular/core/testing';

import { AdsenseModule } from '../lib/ng2-adsense';

import { OtherPageComponent, PageComponent } from './page.component';

describe('PageComponent', () => {
  const options = {
    adClient: 'ca-pub-7640562161899788',
    adSlot: 2930227358,
    layout: 'z1',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdsenseModule.forRoot(options)],
      declarations: [PageComponent],
    });
    TestBed.compileComponents();
  });

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(PageComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );

  it(
    `should have as title 'Page 1'`,
    async(() => {
      const fixture = TestBed.createComponent(PageComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('Page 1');
    }),
  );

  it(
    'should render ng adsense',
    async(() => {
      const fixture = TestBed.createComponent(PageComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const ad = compiled.querySelector('ins');
      expect(ad.className).toEqual('adsbygoogle');
      expect(ad.getAttribute('data-ad-slot')).toEqual(String(options.adSlot));
      expect(ad.getAttribute('data-ad-client')).toEqual(options.adClient);
      expect(ad.getAttribute('data-layout')).toEqual('z1');
      expect(ad.getAttribute('data-layout-key')).toEqual(null);
      expect(ad.getAttribute('height')).toEqual(null);
      expect(ad.getAttribute('width')).toEqual(null);
    }),
  );
});

describe('OtherPageComponent', () => {
  const options = {
    adClient: 'ca-pub-7640562161899788',
    adSlot: 2930227358,
    heigth: 108,
    width: 320,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdsenseModule.forRoot(options)],
      declarations: [OtherPageComponent],
    });
    TestBed.compileComponents();
  });

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(OtherPageComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );

  it(
    `should have as title 'Page 2'`,
    async(() => {
      const fixture = TestBed.createComponent(OtherPageComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('Page 2');
    }),
  );

  it(
    'should render ng adsense',
    async(() => {
      const fixture = TestBed.createComponent(OtherPageComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const ad = compiled.querySelector('ins');
      expect(ad.className).toEqual('adsbygoogle');
      expect(ad.getAttribute('data-ad-slot')).toEqual(String(options.adSlot));
      expect(ad.getAttribute('data-ad-client')).toEqual(options.adClient);
      expect(ad.getAttribute('data-layout')).toEqual(null);
      expect(ad.getAttribute('data-layout-key')).toEqual(null);
    }),
  );
});
