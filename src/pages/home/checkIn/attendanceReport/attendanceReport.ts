import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CheckNetwork } from '../../../../network/check.network';
import { ToastService } from '../../../../service/toast.service';
import { formatDate } from '../../../../network/http';

@IonicPage({
  name: 'app-home-attendanceReport'
})
@Component({
  templateUrl: 'attendanceReport.html'
})
export class AttendanceReportPage {
  constructor(private navCtrl: NavController, private checkNetwork: CheckNetwork, private toastService: ToastService) {
    this.currentReport = 'day';
    this.loadWorkShiftList();
    this.loadDailyReport(new Date());
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

  selectDateChange(date) {
    console.log('change date:', formatDate(date, 'yyyy-MM-dd'));
    this.loadDailyReport(date);
  }

  monthObj = {
    name: '小肉丸',
    time: formatDate(new Date(), 'yyyy/MM'),
    lateTime: 0,
    leaveEarlyTime: 0,
    absentTime: 0,
    overTime: 0,//加班时间
    outsideTime: 0,
    absenceCount: 0,
    workFrequency: 0,
    rest: 0,//休息天数
    signCount: 0
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
          this.monthObj.absenceCount = result.absenceCount;//缺勤次数
          this.monthObj.workFrequency = result.workFrequency;//班次次数（天）
          this.monthObj.rest = result.rest;//休息天数（天）
          this.monthObj.signCount = result.signCount;//签到天数（天）
        }
      }, err => {
        this.toastService.show('获取月报失败');
      });
  }
  monthChange(month){
    this.loadMonthReport(new Date(month))
  }
}
