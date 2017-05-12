import { AnonboxClientPage } from './app.po';

describe('anonbox-client App', () => {
  let page: AnonboxClientPage;

  beforeEach(() => {
    page = new AnonboxClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
