import { Injectable } from '@angular/core';
import { formatDate } from '../network/http';
@Injectable()
export class UtilsService {
  constructor() { }

  //日初
  getBeginOfDay() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  //日末
  getEndOfDay() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  }

  //月初
  getBeginOfMonth() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  //月末
  getEndOfMonth() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  }

  //年初
  getBeginOfYear() {
    let date = new Date();
    return new Date(date.getFullYear(), 0, 1);
  }
  //年末
  getEndOfYear() {
    let date = new Date();
    return new Date(date.getFullYear(), 12, 0, 23, 59, 59);
  }

}

function getTimeStr(compareDate: Date, inclueToday: boolean) {
  let today = new Date();
  if (compareDate.getFullYear() !== today.getFullYear()) {
    return formatDate(compareDate, 'yy/MM/dd');
  }
  if (compareDate.getMonth() !== today.getMonth()) {
    return formatDate(compareDate, 'yy/MM/dd');
  }
  let diffDate = today.getDate() - compareDate.getDate();
  if (diffDate > 5) {
    return formatDate(compareDate, 'yy/MM/dd');
  }
  if (diffDate > 2) {
    let a = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' };
    return `${today.getDay() - compareDate.getDay() < 0 ? '上' : ''}${a[compareDate.getDay()]}`;
  }
  if (diffDate > 0) {
    return ({ 1: '昨天', 2: '前天' })[diffDate];
  }
  return inclueToday ? '今天' : '';
}

export function getTimeStrForChatList(dateStr: string) { //获取聊天列表上时间字符串
  if (!dateStr) return '';

  let listDate = new Date(dateStr);
  let hours = listDate.getHours();
  let minutes = listDate.getMinutes();

  return getTimeStr(listDate, false) || `${hours > 9 ? hours : ('0' + hours)}:${minutes > 9 ? minutes : ('0' + minutes)}`;
}
export function getTimeStrForChatContent(dateStr: string) { //获取聊天内容上时间字符串
  if (!dateStr) return '';

  let listDate = new Date(dateStr);
  let hours = listDate.getHours();
  let minutes = listDate.getMinutes();

  return `${getTimeStr(listDate, true)} ${hours > 9 ? hours : ('0' + hours)}:${minutes > 9 ? minutes : ('0' + minutes)}`
}

export function sureFloatPrecision(num: number, precision: number) { //确保浮点数精度，如14->14.000000000000002
  precision = precision || 2;
  return parseFloat(num.toFixed(precision));
  // var newNum = num.toFixed(precision);
  // var testStr = '.' + new Int8Array(precision).join('');
  // var regx = new RegExp(testStr);
  // if (regx.test(newNum)) {

  // }
  // else {

  // }
}


export const ColorMap = {
  Color1: '#3CC8B4',
  Color2: '#FF7DAF',
  Color3: '#F7BB5A',
  Color4: '#FF7F79',
  Color5: '#94E867',
  Color6: '#3EAAFE',
  Color7: '#AD54E0',
  Color8: '#41A3B6',
  Color9: '#DF81E5',

}

export const ColorSet = Object.keys(ColorMap).map((key: string) => ColorMap[key]);