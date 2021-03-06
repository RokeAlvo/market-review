import { Builder, By, Key, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
// import { createConnection } from 'typeorm';
// import {databaseProviders} from '../database.providers';
import { databaseProviders } from '../database.providers';
import 'reflect-metadata';
import { Review } from './review.entity';

import { solverCaptcha } from './solverCaptcha';
import { getComments } from './getComments';
import { log, makeList } from './helpers';
import { HEADLESS, maxPage, URL, DB_CONFIG } from '../config';
import { CAPTCHA_INPUT_SELECTOR, CAPTCHA_SELECTOR, ROOT_SELECTOR} from './constants';

(async function parser() {
  const db = await databaseProviders[0].useFactory();

  const screen = {
    width: 640,
    height: 480,
  };

  let driver;
  if (!HEADLESS) {
    driver = await new Builder().forBrowser('chrome').build();
  } else {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless().windowSize(screen))
      .build();
  }

  const urls = makeList(maxPage).map(page => {
    return page === 0 ? URL : URL + '?page=' + page;
  });
  const getUrl = get(driver);

  try {
    // @ts-ignore
    // const db = await createConnection({
    //   "type": "mysql",
    //   "host": "localhost",
    //   "port": 3306,
    //   "username": "root",
    //   "password": "root",
    //   "database": "test_db",
    //   "entities": ["src/**/*.entity{.ts,.js}"],
    //   "synchronize": true
    // });
    for (const url of urls) {
      log('parse url', url);
      const status = await getUrl(url);
      if (status === null) {
        log('не вышло', '');
        continue;
      }
      const bodyEl = driver.wait(until.elementLocated(By.css(ROOT_SELECTOR)), 20000);
      const bodyString = await bodyEl.getAttribute('outerHTML');
      const comments = getComments(bodyString);
      for (const comment of comments) {
        const id: string = comment.id;
        let repo = db.getRepository(Review);
        const record: Review = await repo.findOne({ yandexId: id });
        const recordExists = !!record;
        if (recordExists) {
          continue;
        }
        let review = new Review();
        review.yandexId = comment.id;
        review.user = comment.user;
        review.rating = comment.rating;
        review.ratingLabel = comment.ratingLabel;
        review.body = comment.body;
        review.date = comment.date;
        review.city = comment.city;

        await repo.save(review);
      }
    }
  // } catch (err) {
  //
  //   log('error in parser.ts:', err);
  } finally {
    await driver.quit();
  }
})();

function get(driver) {
  let errorCount = 0;
  return async (url) => {
    await driver.get(url);
    const title = await driver.getTitle();
    if (title === 'Ой!') {
      log('resulting page: ОЙ!', '');
      const img = driver.wait(until.elementLocated(
        By.css(CAPTCHA_SELECTOR)), 20000);
      const captchaUrl = await img.getAttribute('src');
      const captchaText = await solverCaptcha(captchaUrl);
      driver.findElement(By.css(CAPTCHA_INPUT_SELECTOR)).sendKeys(captchaText + Key.ENTER);
      log('captcha is solving', '');
    }
    try {
      driver.wait(until.elementLocated(
        By.css('dl.n-product-review-item__stat'),
      ), 20000);
      return true;
    } catch (e) {
      if (errorCount > 5) {
        throw Error(e);
      }
      errorCount++;
      return null;
    }
  };
}
