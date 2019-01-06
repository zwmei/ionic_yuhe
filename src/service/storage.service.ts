import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  constructor() {

  }

  get(key) {
    let value = Cache[key];
    if (value === undefined) {
      value = localStorage.getItem(key);
      if (value) {
        try {
          value = JSON.parse(value);
        }
        catch (e) {
          console.error('json parse error', e);
        }
      }
    }

    return value;
  }
  set(key, value) {
    Cache[key] = value;
    localStorage.setItem(key, JSON.stringify(value));
  }
}
const Cache = {};

export const STORAGE_KEY = {
  LOGIN_INFO: 'yh_login_info',
  USER_INFO: 'yh_user_info',
  GET_VALID_CODE_TIME: 'yh_get_valid_code_time' //获取验证码的时间,毫秒数
}
