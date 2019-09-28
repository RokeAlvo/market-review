export const DEBUG = true;
export const HEADLESS = false;
export const URL = 'https://market.yandex.ru/shop--www-pleer-ru/720/reviews';
export const maxPage = 100;
export const API_KEY_RUCAPTCHA = '5d8c587e0d9462eea87c57b4d67f9bdd';
export const TIMEOUT_FOR_CAPTCHA = 20000;
export const DB_CONFIG = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test_db',
  charset: 'utf8mb4_unicode_ci',
  // extra: {
  //   charset: 'utf8mb4',
  // },
  // entities: [
  //   __dirname + '/../**/*.entity{.ts,.js}',
  // ],
  synchronize: true,
};
