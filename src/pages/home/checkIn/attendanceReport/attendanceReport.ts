import { IonicPage, NavController } from 'ionic-angular';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CheckNetwork } from '../../../../network/check.network';
import { ToastService } from '../../../../service/toast.service';
import { StorageService, STORAGE_KEY } from '../../../../service/storage.service';
import { formatDate } from '../../../../network/http';
import { CalendarComponent } from '../../../../components/calendar/calendar';
import { HTTP_URL } from "../../../../network/http";


@IonicPage({
  name: 'app-home-attendanceReport'
})
@Component({
  templateUrl: 'attendanceReport.html'
})
export class AttendanceReportPage implements AfterViewInit {
  @ViewChild(CalendarComponent) calendar1;

  constructor(private navCtrl: NavController, private checkNetwork: CheckNetwork, private toastService: ToastService, private storage: StorageService) {
    console.log('cons')
  }

  ngOnInit(){
    this.loadUserInfo();
    this.loadCheckGroup();
    this.currentReport = 'day';
    this.loadWorkShiftList();
    this.loadDailyReport(new Date());
    console.log('init')
  }

  ngAfterViewInit(){
    if(this.calendar1){
      this.loadDayReportStatus(new Date);
    }
    console.log('after')
  }

  currentReport;
  now = formatDate(new Date(), 'yyyy/MM/dd');

  goToRankPage(): void {
    this.navCtrl.push('app-home-attendance-rank');
  }
  changeCurrentReport(reportType) {
    if (reportType === this.currentReport) {
      return;
    }
    this.currentReport = reportType;
    if (reportType === 'day') {
      this.loadDailyReport(new Date());
      this.loadDayReportStatus(new Date());
    } else {
      this.loadMonthReport(new Date());
    }
  }

  workSchedule = {
    startTime: '07:00',
    endTime: '18:00'
  };
  loadWorkShiftList() {
    this.checkNetwork.getWorkShiftList()
      .subscribe(result => {
        console.log('work shift list:', result);
        // [{"bcmc":"早班","id":1,"sbsj":"1970-01-01 07:00:00","xbsj":"1970-01-01 12:00:00"},{"bcmc":"午班","id":2,"sbsj":"1970-01-01 13:00:00","xbsj":"1970-01-01 18:00:00"}]
        if (Array.isArray(result) && result.length > 0) {
          let sbsj = result[0].sbsj;
          let xbsj = result[1] && result[1].xbsj || result[0].xbsj;
          this.workSchedule.startTime = formatDate(sbsj, 'HH:mm');
          this.workSchedule.endTime = formatDate(xbsj, 'HH:mm');
        }
      }, err => {
        console.log(err);
        this.toastService.show('获取班次信息失败！');
      });
  }

  checkIn: { startTime: string, endTime: string, count: number, hour: number } = {
    startTime: '未打卡',
    endTime: '未打卡',
    count: 0,
    hour: 0
  };
  loadDailyReport(checkDate) {
    this.checkIn.count = 0;
    this.checkNetwork.getDayReport({ checkDate: formatDate(checkDate, 'yyyy-MM-dd') })
      .subscribe(result => {
        console.log('daily report:', result);
        if (Array.isArray(result) && result.length > 0) {
          if (result[0].sbsj) {
            this.checkIn.startTime = formatDate(result[0].sbsj, 'HH:mm:ss');
            this.checkIn.count += 1;
          }
          if (result[0].xbsj) {
            this.checkIn.endTime = formatDate(result[0].xbsj, 'HH:mm:ss');
            this.checkIn.count += 1;
          }

          console.log('count: ', this.checkIn.count);

          if (this.checkIn.count === 2) {
            console.log('sb',result[0].xbsj);
            console.log('xb',result[0].sbsj);
            let end = new Date(result[0].xbsj.replace(/-/g, '/')).getTime();
            let start = new Date(result[0].sbsj.replace(/-/g, '/')).getTime();
            this.checkIn.hour = parseFloat(((end - start) / 1000 / 24 / 60 / 60).toFixed(2));
          }
          // [{"id":60,"sbsj":"2019-01-01 14:49:43","xbsj":"2019-01-01 19:12:49","zgid":1}]
        } else {
          this.checkIn.startTime = '未打卡';
          this.checkIn.endTime = '未打卡';
          this.checkIn.count = 0;
          this.checkIn.hour = 0;
        }
      }, err => {
        this.toastService.show('获取日报失败！');
      });
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

  loadDayReportStatus(checkDate){
    let count = this.getDayCount(checkDate);
    let startDate = formatDate(checkDate, 'yyyy-MM') + '-01';
    let endDate;
    if(count>9){
      endDate = formatDate(checkDate, 'yyyy-MM' + '-' + count);
    }else{
      endDate = formatDate(checkDate, 'yyyy-MM' + '-0' + count);
    }

    if(new Date(startDate.replace('-', '/')) > new Date()){//如果开始时间大于今天，直接返回
      return;
    }

    if(new Date(endDate.replace('-', '/')) > new Date()){//如果结束时间大于今天，结束时间直接返回今天
      endDate = formatDate(new Date(), 'yyyy-MM-dd');
    }
    this.checkNetwork.getDayReportStatus({startDate: startDate, endDate: endDate, staffId: ''})
    .subscribe( result => {
      console.log('statuses:', result);
      if(result && Array.isArray(result) && result.length > 0){
        this.calendar1.loadCalendarFlags(result);
      }
    }, err => {
      this.toastService.show('获取每日状态失败！');
    });
  }

  selectDateChange(date) {
    console.log('change date:', formatDate(date, 'yyyy-MM-dd'));
    this.loadDailyReport(date);
  }

  prevChange(date) {
    console.log('change date:', formatDate(date, 'yyyy-MM-dd'));
    this.loadDailyReport(date);
    this.loadDayReportStatus(date);
  }
  nextChange(date) {
    this.loadDailyReport(date);
    this.loadDayReportStatus(date);
  }

  monthObj = {
    name: '小肉丸',
    time: formatDate(new Date(), 'yyyy/MM'),
    lateTime: 0,
    leaveEarlyTime: 0,
    absentTime: 0,
    overTime: 0,//加班时间
    outsideTime: 0,
    absenceTime: 0,
    workFrequency: 0,
    rest: 0,//休息天数
    signCount: 0,
    leaveTime: 0,//请假天数
    dayWorkhour: 0//每天工时
  };
  loadMonthReport(checkMonth) {
    this.checkNetwork.getMonthReport({ checkMonth: formatDate(checkMonth, 'yyyy-MM') })
      .subscribe((result: any) => {
        console.log('month resport', result);
        if (result) {

          // {"absenceCount":3,"beingAbsenceTime":22.5,"beingLateTime":0,"leaveCount":0,"leaveEarlyTime":7.21,"outsideTime":0.0,"overTime":0,"rest":2,"signCount":1,"staffName":"系统管理员","workFrequency":2,"zgid":1}
          this.monthObj.name = result.staffName;
          this.monthObj.lateTime = result.beingLateTime;//迟到时间（小时）
          this.monthObj.absentTime = result.beingAbsenceTime;//矿工时间（小时）
          this.monthObj.leaveEarlyTime = result.leaveEarlyTime;//早退时间（小时）
          this.monthObj.overTime = result.overTime;//加班时间（小时）
          this.monthObj.outsideTime = result.outsideTime;//外勤时间（小时）
          this.monthObj.absenceTime = result.absenceTime;//缺勤天数
          this.monthObj.workFrequency = result.workFrequency;//班次次数（天）
          this.monthObj.rest = result.rest;//休息天数（天）
          this.monthObj.signCount = result.signCount;//签到天数（天）
          this.monthObj.leaveTime = result.leaveTime;//请假天数（天）
          this.monthObj.dayWorkhour = result.dayWorkhour;//每天工时
        }
      }, err => {
        this.toastService.show('获取月报失败');
      });
  }
  monthChange(month){
    // this.toastService.show('month:' + month)
    // this.toastService.show(new Date(month))
    // return
    // month = month.replace('-', '/')
    this.loadMonthReport(new Date(month))
  }

  user: any = {groupName: '未知'};
  loadUserInfo() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    if (userInfo && typeof userInfo === "object") {
      console.log(userInfo);
      this.user.number = userInfo.zggh;
      this.user.name = userInfo.zgxm;
      this.user.photo = HTTP_URL.MAIN + '/images/' + userInfo.photo;
    }
  }

  loadCheckGroup(){
    this.checkNetwork.checkGroupName()
    .subscribe( (data: any)=> {
      if(data && data.result && data.result.groupName){
        this.user.groupName = data.result.groupName;
      }
    }, error => {
      console.log(error);
    });
  }
}
