import { DEBUG } from '../config';

export function makeList(len) {
  const res = [];
  for (let i = 0; i < len; i++) {
    res.push(i);
  }
  return res;
}

export function log(msg = '', value: any) {
  if (DEBUG) {
    // tslint:disable-next-line:no-console
    console.log(msg + ' ' + value);
  }
}

