import { Component, Input, Output,EventEmitter } from '@angular/core';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})


export class CalendarComponent {
  private calendar;

  @Input() defaultSelectToday: boolean;
  @Output() selectDateChange: EventEmitter<Date> = new EventEmitter();

  constructor() { /*构造函数*/
    let now = new Date();
    this.calendar = {
      weekNames: ['一', '二', '三', '四', '五', '六', '日'],
      now: now,
      dates: [],
      currentActiveDate: null,//选中当日日期块（number，date，active，today，flag，extra）
      currentMonthFirstDay: this.getFirstDateOfTheDate(now),//默认选中当前日期所在月的第一天
      currentDatesIndex: -1
    };

    this.loadCalendarBoard(this.calendar.now);
    console.log('defaultSelectToday:',this.defaultSelectToday);
    console.log('currentDatesIndex:',this.calendar.currentDatesIndex);

    if(this.defaultSelectToday && this.calendar.currentDatesIndex !== -1){
      this.changeCurrentActive(this.calendar.dates[this.calendar.currentDatesIndex]);
    }
  }

  nextMonth() {
    this.calendar.currentMonthFirstDay.setMonth(this.calendar.currentMonthFirstDay.getMonth() + 1);
    this.loadCalendarBoard(this.calendar.currentMonthFirstDay);
    this.calendar.currentMonthFirstDay = new Date(this.calendar.currentMonthFirstDay);//重新赋值，界面才会发生变化
  }
  prevMonth() {
    this.calendar.currentMonthFirstDay.setMonth(this.calendar.currentMonthFirstDay.getMonth() - 1);
    this.loadCalendarBoard(this.calendar.currentMonthFirstDay);
    this.calendar.currentMonthFirstDay = new Date(this.calendar.currentMonthFirstDay);//重新赋值，界面才会发生变化
  }
  changeCurrentActive(dateObj){
    if (!dateObj || !dateObj.number) {
      return;
    }
    console.log('select date:', dateObj.date);
    if (this.calendar.currentActiveDate) {//上次选择去掉
      this.calendar.currentActiveDate.active = false;
    }
    dateObj.active = true;//这次选择选中
    this.calendar.currentActiveDate = dateObj;
    this.selectDateChange.emit(dateObj.date);

    console.log('select date2:', dateObj.date);
  }
  //面板数据更新
  private loadCalendarBoard(theDate) {
    
    //** start 当月第一天为周几，面板第一天之前补空*/
    let firstDayWeekdayTheMonth = this.getFirstDayWeekdayByTheDate(theDate);//当月第一天为周几
    this.calendar.dates = [];//面板dates清空
    this.calendar.currentDatesIndex = -1;//当天在dates的index恢复初始值
    for (let i = 1; i < firstDayWeekdayTheMonth; i++) {
      this.calendar.dates.push({ number: '' });//当月第一天为周几，前面补空
    }
    //** end 当月第一天为周几，面板第一天之前补空*/

    //** start 从当月第一天开始填空，填到当月最后一天*/
    let now = new Date();//目前时间
    let theFirstDateTimestamp = this.getFirstDateOfTheDate(theDate).getTime();//获取当月第一天时间戳，用于之后生成每天的日期
    let totalDayCountThisMonth = this.getDayCount(theDate);//获取当月总共的天数
    for (let i = 1; i <= totalDayCountThisMonth; i++) {
      let currentDate = new Date(new Date(theFirstDateTimestamp).setDate(i));//当日的日期date
      let actived = this.calendar.currentActiveDate && this.calendar.currentActiveDate.date.getTime() === currentDate.getTime();//已选日期是否是这个日期一致
      let isToday = this.isSameYearMonthOfTheTwoDate(theDate, now) && now.getDate() === i;
      let date = {
        number: i,
        active: actived,//是否选中该项
        today: isToday, //同一个月同号认为是today
        flag: false,
        date: currentDate,
        extra: {}
      }
      if (actived) {
        this.calendar.currentActiveDate = date;//注意：已选日期要更新！！！因为dates数组里的元素每次切换面板都会更新，即使同日，数据也是新的
      }
      this.calendar.dates.push(date);

      if(isToday){
        this.calendar.currentDatesIndex = this.calendar.dates.length - 1;
      }
    }
    //** end 从当月第一天开始填空，填到当月最后一天*/

    this.calendar.now = now;//更新目前时间
  }

  //两个日期是否是同年同月
  private isSameYearMonthOfTheTwoDate(theDate, otherDate) {
    return theDate.getMonth() === otherDate.getMonth() && theDate.getFullYear() === otherDate.getFullYear();
  }
  //根据指定日期，获取该日期所在月的第一天是周几。例如：2018-12-12这天的1号是周几
  private getFirstDayWeekdayByTheDate(theDate) {
    return this.getWeekdayOfTheDate(this.getFirstDateOfTheDate(theDate));
  }
  //获取指定日期那个月的第一天的日期
  private getFirstDateOfTheDate(theDate) {
    let newDate = new Date(theDate.getTime());//设置该日期的第一天时会改变原来的日期，所以要先转一下
    return new Date(newDate.setDate(1));
  }
  //获取指定日期为星期几
  private getWeekdayOfTheDate(theDate) {
    return theDate.getDay() || 7;//本月第一天为周几，周日为7
  }
  //判断是否是闰年
  private isLeapYear(year) {
    if (year % 100 == 0 && year % 400 == 0) {
      return true;
    } else if (year % 100 != 0 && year % 4 == 0) {
      return true;
    }
    return false;
  }
  //得到某月多少天
  private getDaysOfMonth(isLeapYear, month) {
    let days = 0;
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        days = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30;
        break;
      case 2:
        if (isLeapYear) {
          days = 29;
        } else {
          days = 28;
        }
    }
    return days;
  }
  //获取某日期当月总共多少天
  private getDayCount(theDate) {
    let isLeapYear = this.isLeapYear(theDate.getFullYear());
    let month = theDate.getMonth() + 1;
    return this.getDaysOfMonth(isLeapYear, month);
  }

}

