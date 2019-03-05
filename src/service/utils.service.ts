import { Injectable } from '@angular/core';

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
