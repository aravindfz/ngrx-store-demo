import { NgrxStoreDemoPage } from './app.po';

describe('ngrx-store-demo App', () => {
  let page: NgrxStoreDemoPage;

  beforeEach(() => {
    page = new NgrxStoreDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
