import { Component, Output, EventEmitter } from '@angular/core';
import { formatDate } from '../../network/http';

/**
 * Generated class for the WeekSwitchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'week-switch',
  templateUrl: 'week-switch.html'
})
export class WeekSwitchComponent {
  @Output () dateChange: EventEmitter <Date> = new EventEmitter();

  list = {
    today: [],
    tomorrow: []
  };
  currentFilterDateString: string;
  weekDay;
  todayString: string;
  currentChangeDateString: string;
  constructor() {
    this.todayString = formatDate(new Date(), 'yyyy-MM-dd');
    this.refreshBoard(new Date());
  }

  isToday(newDate){
    return formatDate(newDate, 'yyyy-MM-dd') === this.todayString;
  }

  refreshBoard(newDate){
    this.currentFilterDateString = formatDate(newDate, 'yyyy-MM-dd');
    this.weekDay = [{name: '日'}, {name: '一'}, {name: '二'},{name: '三'},{name: '四'},{name: '五'},{name: '六'}];
    let theDateIndex = newDate.getDay();

    for(let i = 0; i < 7; i++){
      if(i < theDateIndex){//筛选的这天之前
        this.weekDay[i].date = new Date(new Date().setDate(newDate.getDate() - (theDateIndex - i)));
      }else if(i > theDateIndex){//筛选的这天之后
        this.weekDay[i].date = new Date(new Date().setDate(newDate.getDate() + (i - theDateIndex)));
      }else{//筛选出的这一天
        this.weekDay[i].date = new Date(formatDate(newDate, 'yyyy-MM-dd'));
        this.weekDay[i].current = true;
        this.weekDay[i].today = this.isToday(this.weekDay[i].date);
      }

      this.weekDay[i].now = this.isToday(this.weekDay[i].date);//标记面板的今天

      this.weekDay[i].dateNumber = formatDate(this.weekDay[i].date, 'd');
    }
  }

  changeDate(dateItem){
    if(dateItem.current){//点击以选中的日期，不做任何事情
      return;
    }

    //清除其他所有日期的标记
    this.weekDay.forEach(item=>{
      item.current = false;
      item.today = false;
    });

    //reloadData
    console.log('click date:', formatDate(dateItem.date, 'yyyy-MM-dd'));

    dateItem.current = true;
    dateItem.today = this.isToday(dateItem.date);
    this.dateChange.emit(dateItem.date);
  }

  filterChange(dateString){
    console.log('onchange:');
    let changeDate = new Date(dateString);
    this.refreshBoard(changeDate);
    this.dateChange.emit(changeDate);
  }


}
