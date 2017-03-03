import { Ng2adsensePage } from './app.po';

describe('ng2-adsense App', () => {
  let page: Ng2adsensePage;

  beforeEach(() => {
    page = new Ng2adsensePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
