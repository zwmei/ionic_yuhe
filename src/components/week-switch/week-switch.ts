import { Component } from '@angular/core';
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

  list = {
    today: [],
    tomorrow: []
  };
  currentMonthString: string;
  weekDay;
  constructor() {
    let now = new Date();
    this.refreshBoard(now);
    console.log('today:', now);
  }

  refreshBoard(newDate){
    this.currentMonthString = formatDate(newDate, 'yyyy-MM');
    this.weekDay = [{name: '日'}, {name: '一'}, {name: '二'},{name: '三'},{name: '四'},{name: '五'},{name: '六'}];
    let newWeekIndex = newDate.getDay();

    for(let i = 0; i < 7; i++){
      if(i < newWeekIndex){
        this.weekDay[i].date = new Date(new Date().setDate(newDate.getDate() - (newWeekIndex - i)));
      }else if(i > newWeekIndex){
        this.weekDay[i].date = new Date(new Date().setDate(newDate.getDate() + (i - newWeekIndex)));
      }else{
        this.weekDay[i].date = new Date(formatDate(newDate, 'yyyy-MM-dd'));
        this.weekDay[i].current = true;
      }

      this.weekDay[i].dateNumber = formatDate(this.weekDay[i].date, 'd');
    }
  }

  changeDate(dateItem){
    this.weekDay.forEach(item=>{
      item.current = false;
    });
    dateItem.current = true;
    //reloadData
    console.log('click date:', formatDate(dateItem.date, 'yyyy-MM-dd'));
  }


}
