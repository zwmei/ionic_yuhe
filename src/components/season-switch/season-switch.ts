import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SeasonSwitchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'season-switch',
  templateUrl: 'season-switch.html'
})
export class SeasonSwitchComponent {
  @Output() prevSeasonChange: EventEmitter<Date> = new EventEmitter();
  @Output() nextSeasonChange: EventEmitter<Date> = new EventEmitter();

  private formatString = 'yyyy 第q季度';
  currentDate: Date;
  currentSeasonString: string;

  constructor() {
    let currentSeason = Math.floor((new Date().getMonth() + 3) / 3);//第几季度
    let theCurrentSeasonFirstDayString = [new Date().getFullYear(), (3 * currentSeason - 2), 1].join('/');
    this.currentDate = new Date(theCurrentSeasonFirstDayString);//默认为当季度第一天
    this.currentSeasonString = this.privateDateFormat(this.currentDate, this.formatString);
  }

  prevSeason() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 3));
    this.currentSeasonString = this.privateDateFormat(this.currentDate, this.formatString);
    this.prevSeasonChange.emit(this.currentDate);
  };
  nextSeason() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 3));
    this.currentSeasonString = this.privateDateFormat(this.currentDate, this.formatString);
    this.nextSeasonChange.emit(this.currentDate);
  }

  privateDateFormat(newDate, fmt) {
    var o = {
      "M+": newDate.getMonth() + 1,                 //月份
      "d+": newDate.getDate(),                    //日
      "h+": newDate.getHours(),                   //小时
      "m+": newDate.getMinutes(),                 //分
      "s+": newDate.getSeconds(),                 //秒
      "q+": Math.floor((newDate.getMonth() + 3) / 3), //季度
      "S": newDate.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }

}
