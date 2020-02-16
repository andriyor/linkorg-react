const puppeteer = require('puppeteer');

describe('posts', () => {
  test('youtube', async () => {
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();

    const NEW_URL= 'https://www.youtube.com/watch?v=vYmSYsj-s5w';
    const EXPECTED_IFRAME_URL= 'https://www.youtube.com/embed/vYmSYsj-s5w';

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('[data-test-id="post-url"]');
    await page.click('[data-test-id="post-url"]');
    await page.keyboard.type(NEW_URL);

    await page.click("#data-test-select-id");

    await page.waitForSelector("#react-select-2-option-0");
    await page.click("#react-select-2-option-0");

    await page.click('[data-test-id="add-post"]');

    const LAST_IFRAME_SELECTOR = '[data-test-id="post-wrapper"]:last-of-type  div iframe';
    await page.waitFor(1000);
    const srcValue = await page.$eval(LAST_IFRAME_SELECTOR, e => e.getAttribute('src'));
    expect(srcValue).toBe(EXPECTED_IFRAME_URL);

    browser.close();
  }, 16000);
  test('telegram', async () => {
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();

    const NEW_URL= 'https://t.me/libmustdie/4025';
    const EXPECTED_IFRAME_URL= 'https://t.me/libmustdie/4025?embed=1';

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('[data-test-id="post-url"]');
    await page.click('[data-test-id="post-url"]');
    await page.keyboard.type(NEW_URL);

    await page.click("#data-test-select-id");

    await page.waitForSelector("#react-select-2-option-0");
    await page.click("#react-select-2-option-0");

    await page.click('[data-test-id="add-post"]');

    const LAST_IFRAME_SELECTOR = '[data-test-id="post-wrapper"]:last-of-type  div iframe';
    await page.waitFor(1000);
    const srcValue = await page.$eval(LAST_IFRAME_SELECTOR, e => e.getAttribute('src'));
    expect(srcValue).toBe(EXPECTED_IFRAME_URL);

    browser.close();
  }, 16000);
   test('reddit', async () => {
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();

    const NEW_URL= 'https://www.reddit.com/r/PinkFloydCircleJerk/comments/f4qruf/since_you_all_liked_my_wish_you_were_hete_fanart/';
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('[data-test-id="post-url"]');
    await page.click('[data-test-id="post-url"]');
    await page.keyboard.type(NEW_URL);

    await page.click("#data-test-select-id");

    await page.waitForSelector("#react-select-2-option-0");
    await page.click("#react-select-2-option-0");

    await page.click('[data-test-id="add-post"]');

    const LAST_IFRAME_SELECTOR = '[data-test-id="post-wrapper"]:last-of-type  div';
    await page.waitFor(1000);
    const inputValue = await page.$eval(LAST_IFRAME_SELECTOR, e => e.getAttribute('data-test-id'));
    expect(inputValue).toBe('reddit');

    browser.close();
  }, 16000);
});
