import * as HTMLParser from 'js-html-parser';
import {
  BODY_OF_COMMENT_SELECTOR,
  COMMENT_SELECTOR,
  DATE_CITY_SELECTOR,
  LABEL_SELECTOR,
  RATING_SELECTOR,
  USER_SELECTOR,
} from './constants';
import { Comment } from './Comment';

export function getComments(html) {
  const HtmlDoc = HTMLParser.parse(html);
  const cards = HtmlDoc.querySelectorAll(COMMENT_SELECTOR);
  return cards.map(card => {
    // @ts-ignore
    const userEl = card.querySelector(USER_SELECTOR);
      const user = userEl ? userEl.rawText : 'Неизвестный';
    // @ts-ignore
    const ratingEl = card.querySelector(RATING_SELECTOR);
    const rating = ratingEl ? ratingEl.attributes['data-rate'] : 0;
    // @ts-ignore
    const labelEl = card.querySelector(LABEL_SELECTOR);
      const label = labelEl ? labelEl.rawText : '';
    // @ts-ignore
    const bodyHtml = card.querySelectorAll(BODY_OF_COMMENT_SELECTOR);
    const bodyList = bodyHtml.map(section => {
      const titleElem = section.querySelector('dt');
      const textElem = section.querySelector('dd');
      const title = titleElem ? titleElem.rawText : '';
      const text = textElem ? textElem.rawText : '';
      return { title, text };
    });
    const body = JSON.stringify(bodyList);
    // @ts-ignore
    const dateCity = card.querySelector(DATE_CITY_SELECTOR).text;
    const { date, city } = getDateCity(dateCity);
    // @ts-ignore
    const yandexId = card.attributes['data-review-id'];
    return new Comment(yandexId, user, rating, label, body, date, city);
  });
}

const getDateCity = (str) => {
  const today = new Date();
  let date;
  const dateCity = str.split(',');
  switch (dateCity[0]) {
    case 'вчера':
      date = new Date(today.setDate(today.getDate() - 1));
      break;
    case 'сегодня':
      date = today;
      break;
    default:
      date = parseDate(dateCity[0]);
      break;
  }
  return { date, city: dateCity[1] };
};

const parseDate = (str) => {
  const today = new Date();
  const result = str.replace('января', 'January ')
      .replace('февраля', 'February')
      .replace('марта', 'March')
      .replace('апреля', 'April')
      .replace('мая', 'may')
      .replace('июня', 'June')
      .replace('июля', 'July')
      .replace('августа', 'August')
      .replace('сентября', 'September')
      .replace('октября', 'October')
      .replace('ноября', 'November')
      .replace('декабря', 'December')
    + ', ' + today.getFullYear() + ' 12:00:00';
  return new Date(result);
};
