import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { extend } from 'lodash';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../service/toast.service';
import { App } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { StorageService, STORAGE_KEY } from '../service/storage.service';
import { isDate, debounce } from 'lodash';

@Injectable()
export class HttpNetwork {

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private storage: StorageService,
    private app: App
  ) { }

  waitDebounceLogout = () => {
    console.log('logout to login page');
    this.storage.set(STORAGE_KEY.USER_INFO,null);
    this.app.getRootNav().push(LoginPage);
  }
  debouncedFnc = debounce(this.waitDebounceLogout, 250);

  wrapHttp(requestFunc) {
    return new Observable((observe) => {
      requestFunc.subscribe({
        next: (data: any) => {
          if (!data) {
            this.toast.show('请求没有返回数据');
          }
          else if (data.status) {
            if (data.status == 7001) {
              this.debouncedFnc();
            }
            this.toast.show(data.message || '获取数据错误');
          }
          observe.next(data);
        },
        error: (err) => {
          this.toast.show(err.message || '请求异常');
          if (err.status == 7001) {
            this.app.getRootNav().push(LoginPage);
          }
          observe.error(err);
        },
        complete: () => { observe.complete() }
      });
    });
  }

  fetch(url, options?) {
    const httpOptions = {
      body: undefined,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      withCredentials: true
    };

    if (url.indexOf('http') !== 0) {
      url = `${HTTP_URL.MAIN}${url}`;
    }
    options = options || {};

    extend(httpOptions.headers, options.headers || {});
    if (options.body) {
      httpOptions.body = options.body;
    }
    let aa = this.http.request(options.method, url, httpOptions);
    return this.wrapHttp(aa);
  }

  get(url, params?) {
    params = params || {};
    let str = Object.keys(params).map(key => {
      return `${key}=${params[key]}`
    }).join('&');

    if (str) {
      url = `${url}?${str}`;
    }
    return this.fetch(url, { method: 'get' });
  }

  getConcat(url, params?) {
    params = params || {};
    let str = Object.keys(params).map(key => {
      return params[key];
    }).join('/');

    if (str) {
      url = `${url}/${str}`;
    }
    return this.fetch(url, { method: 'get' });
  }

  post(url, params?) {
    params = params || {};
    return this.fetch(url, { method: 'post', body: JSON.stringify(params) });
  }
  postForm(url, params?) {
    params = params || {};
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: json2form(params)
    }
    return this.fetch(url, options);
  }
  uploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);

    let aa = this.http.post(HTTP_URL.MAIN + '/app/approval/application/postFile',
      formData,
      {
        withCredentials: true
      });
    return this.wrapHttp(aa);
  }


}

// export function formatDate(date: number | Date | string, format: string) {
//   return new DatePipe('en-US').transform(date, format);
// }

export function formatDate(dateTime: Date | string | number, format: string) {
  if (!dateTime || !format) {
    return '';
  }
  if (!isDate(dateTime)) {
    if (typeof dateTime == 'string') {
      dateTime = dateTime.replace(/-/g, '/');
    }
    dateTime = new Date(dateTime as string);
  }


  if (!isDate(dateTime)) {
    throw new TypeError('时间格式错误');
  }
  dateTime = dateTime as Date;

  let o: any = {
    "M+": dateTime.getMonth() + 1,                 //月份   
    "d+": dateTime.getDate(),                    //日   
    "h+": dateTime.getHours(),                   //小时   
    "H+": dateTime.getHours(),                   //小时   
    "m+": dateTime.getMinutes(),                 //分   
    "s+": dateTime.getSeconds(),                 //秒   
    "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度   
    "S": dateTime.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

  return format;
}


export function json2form(a) {
  var s = [],
    rbracket = /\[\]$/,
    isArray = function isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    add = function add(k, v) {
      v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
      s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    },
    buildParams = function buildParams(prefix, obj) {
      var i, len, key;

      if (prefix) {
        if (isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            if (rbracket.test(prefix)) {
              add(prefix, obj[i]);
            } else {
              buildParams(prefix + '[' + (typeof (obj[i]) === 'object' ? i : '') + ']', obj[i]);
            }
          }
        } else if (obj && String(obj) === '[object Object]') {
          for (key in obj) {
            buildParams(prefix + '[' + key + ']', obj[key]);
          }
        } else {
          add(prefix, obj);
        }
      } else if (isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          add(obj[i].name, obj[i].value);
        }
      } else {
        for (key in obj) {
          buildParams(key, obj[key]);
        }
      }
      return s;
    };

  return buildParams('', a).join('&').replace(/%20/g, '+');
};

export function getServerAddress() {
  let storage = new StorageService();
  return storage.get(STORAGE_KEY.SERVER_ADDR) || 'http://www.yuhe.insighthink.com/yh_YEManager';
}

export const HTTP_URL = {
  // MAIN: ''
  MAIN: getServerAddress()
}