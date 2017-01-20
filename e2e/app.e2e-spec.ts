import { GmailPage } from './app.po';

describe('gmail App', function() {
  let page: GmailPage;

  beforeEach(() => {
    page = new GmailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
