import { Ng2AdsensePage } from './app.po';

describe('ng2-adsense App', function() {
  let page: Ng2AdsensePage;

  beforeEach(() => {
    page = new Ng2AdsensePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
