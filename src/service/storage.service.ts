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

  empty() {
    Cache = {};
    localStorage.setItem(STORAGE_KEY.USER_INFO, null);
    //退出后清空提醒
    localStorage.setItem(STORAGE_KEY.MESSAGE_TYPE_APPROVAL, null);
    localStorage.setItem(STORAGE_KEY.MESSAGE_TYPE_SCHEDULE, null);
    localStorage.setItem(STORAGE_KEY.MESSAGE_TYPE_MAIL, null);
  }
}
var Cache = {};

export const STORAGE_KEY = {
  SERVER_ADDR: 'yh_server_addr',
  LOGIN_INFO: 'yh_login_info',
  USER_INFO: 'yh_user_info',
  MANUAL_LOGOUT:'yh_manual_logout', //手动退出
  GET_VALID_CODE_TIME: 'yh_get_valid_code_time', //获取验证码的时间,毫秒数
  MESSAGE_TYPE_APPROVAL: 'yh_message_type_approval', //有审批消息
  MESSAGE_TYPE_SCHEDULE: 'yh_message_type_schedule', //有日程安排
  MESSAGE_TYPE_MAIL: 'yh_message_type_mail', //有邮件提醒
}
