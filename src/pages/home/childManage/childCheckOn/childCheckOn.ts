import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { ChildAttendanceNetwork } from "../../../../network/childAttendance.network";
import { ToastService } from "../../../../service/toast.service";
import { formatDate } from '../../../../network/http';

@IonicPage({
  name: 'app-home-childCheckOnManage'
})
@Component({
  templateUrl: 'childCheckOn.html'
})
export class ChildCheckOn {

  loadMonthFirstDayAndLastDayString(monthString){
    let firstDayString =monthString + '-' + 1;
    let lastDayString = monthString + '-' + this.getDayCount(new Date(firstDayString.replace(/-/g, '/')))
    this.currentMonthFirstDay = new Date(firstDayString.replace(/-/g, '/'));
    this.currentMonthLastDay = new Date(lastDayString.replace(/-/g, '/'));
    console.log('first day:', this.currentMonthFirstDay);
    console.log('last:', this.currentMonthLastDay);
  }
  
  currentMonthFirstDay :Date;
  currentMonthLastDay: Date;
  todayString = formatDate(new Date(), 'yyyy-MM-dd');
  summary: any = {
    absenceCount: 0,
    leaveCount: 0,
    signCount: 0,
    totalCount: 0
  };
  constructor(private navCtrl: NavController, private childAttendanceNetwork: ChildAttendanceNetwork, private toastService: ToastService) {
    this.loadPageData(new Date());
    // this.loadMonthFirstDayAndLastDayString(formatDate(new Date(), 'yyyy-MM'));
    // this.getSummary();
    // this.loadAttendanceStatisticOnChart();

    // this.loadRankingCompleted = false;
    // this.loadAttendanceRanking();
  }

  chart: Chart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}:{point.percentage:.1f} %',
          distance: -60,
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Brands',
      data: [{
        name: '出勤',
        y: 0,
        sliced: true,
        selected: true,
        color: '#df56ff'
      }, 
      // {
      //   name: '应到',
      //   y: 0,
      //   color: '#7d81ff'
      // }, 
      {
        name: '请假',
        y: 0,
        color: '#71b9fd'
      }, {
        name: '缺勤',
        y: 0,
        color: '#08f8f5'
      }]
    }]
  });


  loadPageData(date){
    this.loadMonthFirstDayAndLastDayString(formatDate(date, 'yyyy-MM'));
    this.getSummary();
    this.loadAttendanceStatisticOnChart();

    this.pagination.currentPage = 1;this.pagination.size=10;
    this.rankings = [];
    this.loadRankingCompleted = false;
    this.loadAttendanceRanking();
  }

  nextMonth(date){
    console.log('next month', date);
    this.loadPageData(date);
  }
  prevMonth(date){
    console.log('prev month', date);
    this.loadPageData(date);
  }


  goToPage(pageName, id) {
    pageName = pageName || 'app-home-childCheckList';
    console.log('id:', id);
    this.navCtrl.push(pageName, { id: id });
  }

  getSummary() {
    this.childAttendanceNetwork.getSummary({ startDate: this.todayString, endDate: this.todayString })
      .subscribe((result: { absenceCount: number, leaveCount: number, signCount: number, totalCount: number }) => {
        console.log(result);
        this.summary = {
          absenceCount: result.absenceCount,
          leaveCount: result.leaveCount,
          signCount: result.signCount,
          totalCount: result.totalCount
        };
      }, err => {
        this.toastService.show(err.message || '获取出勤统计失败！');
      });
  }

  loadAttendanceStatisticOnChart(){
    this.childAttendanceNetwork.getAttendanceRateChart({startDate: formatDate(this.currentMonthFirstDay, 'yyyy-MM-dd'), endDate: formatDate(this.currentMonthLastDay, 'yyyy-MM-dd') })
    .subscribe((result: {absenceCount: number, absenceRate: number, leaveCount: number, leaveRate: number,signCount: number, signRate: number, totalCount: number})=>{
      console.log(result);
      if(result){
        this.chart.removeSerie(0);
        this.chart.addSerie({
            name: 'Brands',
            data: [{
              name: '出勤',
              y: result.signCount,
              sliced: true,
              selected: true,
              color: '#df56ff',
            }, 
            // {
            //   name: '应到',
            //   y: result.totalCount,
            //   color: '#7d81ff'
            // }, 
            {
              name: '请假',
              y: result.leaveCount,
              color: '#71b9fd'
            }, {
              name: '缺勤',
              y: result.absenceCount,
              color: '#08f8f5'
            }]
        },true);
      }
    }, err=>{
      this.toastService.show('加载图标数据失败！');
    });
  }

  pagination: any = {
    currentPage: 1,
    size: 10
  };
  rankings: any = [];
  loadRankingCompleted: boolean;
  loadAttendanceRanking(onSuccess?:any, onError?:any){
    console.log('loadAttendanceRanking');
    this.childAttendanceNetwork.getStudentRankings({
      startDate: formatDate(this.currentMonthFirstDay,'yyyy-MM-dd'),
      endDate: formatDate(this.currentMonthLastDay, 'yyyy-MM-dd'),
      pageSize: this.pagination.size,
      pageNo: this.pagination.currentPage
    }).subscribe((result: any)=>{
        console.log(result);
        if(result && Array.isArray(result) && result.length > 0){
          this.rankings = this.rankings.concat(result.map((item)=>{
            return {
              name: item.xm,
              signRate: item.signRate
            };
          }));
        }else{
          this.loadRankingCompleted = true;
        }

        if(onSuccess){
          onSuccess();
        }
    },err=>{
      this.toastService.show('获取排名失败！');
      if(onError){
        onError();
      }
    });
  }

  loadMore(event){
    if(this.loadRankingCompleted){//已加载完成
      event.complete();
      return;
    }

    this.pagination.currentPage += 1;
    this.loadAttendanceRanking(()=>{
      console.log('load more...');
      event.complete();
    }, () =>{
      this.pagination.currentPage -= 1;
      event.complete();
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
}
