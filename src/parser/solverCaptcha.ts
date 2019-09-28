import * as RuCaptcha from 'rucaptcha';
import 'os'
import { tmpdir } from 'os';
import { API_KEY_RUCAPTCHA, TIMEOUT_FOR_CAPTCHA } from '../config';

export function solverCaptcha(imgUrl) {
  const solver = new RuCaptcha({
    apiKey: API_KEY_RUCAPTCHA,
    tmpDir: tmpdir(),
    checkDelay: TIMEOUT_FOR_CAPTCHA,
  });
  return new Promise(((resolve, reject) => {
    solver.solve(imgUrl, (err, answer) => {
      if (err) {
        reject(err);
      } else {
        resolve(answer);
      }
    });
  }));
}
