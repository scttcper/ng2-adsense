/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PageComponent } from './page.component';

import { AdsenseModule } from '../lib/ng2-adsense';

describe('PageComponent', () => {
  const options = {
    adClient: 'ca-pub-7640562161899788',
    adSlot: 2930227358,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AdsenseModule.forRoot(options),
      ],
      declarations: [
        PageComponent,
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(PageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Page 1');
  }));

  it('should render ng adsense', async(() => {
    const fixture = TestBed.createComponent(PageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const ad = compiled.querySelector('ins');
    expect(ad.className).toEqual('adsbygoogle');
    expect(ad.getAttribute('data-ad-slot')).toEqual(String(options.adSlot));
    expect(ad.getAttribute('data-ad-client')).toEqual(options.adClient);
  }));
});
