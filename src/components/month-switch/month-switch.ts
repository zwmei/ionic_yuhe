import { Component,Output,EventEmitter } from '@angular/core';
import { formatDate } from "../../network/http";

/**
 * Generated class for the MonthSwitchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'month-switch',
  templateUrl: 'month-switch.html'
})
export class MonthSwitchComponent {
  @Output() prevMonthChange: EventEmitter<Date> = new EventEmitter();
  @Output() nextMonthChange: EventEmitter<Date> = new EventEmitter();

  
  private formatString = 'yyyy-MM';
  currentMonthString = formatDate(new Date(), this.formatString);

  constructor() {
  
  }

  nextMonth(){
    let currentMonth = new Date(this.currentMonthString);
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    this.currentMonthString = formatDate(new Date(currentMonth), this.formatString);
    this.nextMonthChange.emit(new Date(this.currentMonthString));
  }
  prevMonth(){
    let currentMonth = new Date(this.currentMonthString);
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    this.currentMonthString = formatDate(new Date(currentMonth), this.formatString);
    this.prevMonthChange.emit(new Date(this.currentMonthString));
  }
}
