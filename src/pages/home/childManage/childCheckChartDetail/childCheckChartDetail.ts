import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { formatDate } from "../../../../network/http";
import { ToastService } from "../../../../service/toast.service";
import { ChildAttendanceNetwork } from "../../../../network/childAttendance.network";

@IonicPage({
  name: 'app-home-childCheckChartDetail'
})
@Component({
  templateUrl: 'childCheckChartDetail.html'
})
export class ChildCheckChartDetail {
  currentTag: string;
  startDateString: string;
  endDateString: string;
  startDateFilter: Date;
  endDateFilter: Date;

  constructor(private navCtrl: NavController, private toastService: ToastService, private childAttendanceNetwork: ChildAttendanceNetwork) {
    this.startDateString = formatDate(new Date(), 'yyyy-MM-dd');
    this.endDateString = formatDate(new Date(), 'yyyy-MM-dd');
    this.changeTag('day');
    this.loadAttendanceStatisticOnChart(this.startDateString, this.endDateString)
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
          distance: -60,
          formatter: function () {
            return '<b>' + this.point.name + '</b>:' + this.point.percentage.toFixed(2) + "%";
          },
        },
        events: {
          click: (e) => {
            this.onChartClick(e);
          }
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Brands',
      data: [{
        name: '出勤',
        y: 20,
        sliced: true,
        selected: true,
        color: '#df56ff',
        description: '20%'
      }, {
        name: '请假',
        y: 12,
        color: '#71b9fd'
      }, {
        name: '缺勤',
        y: 43,
        color: '#7d81ff'
      }]
    }]
  });

  onChartClick(e){
    console.log(e.point.name);

    console.log('start:',this.startDateFilter);
    console.log('end:',this.endDateFilter);
    this.navCtrl.push('app-home-chartDetailList', { name: e.point.name, startDate: this.startDateFilter, endDate: this.endDateFilter });
  }

  goToPage(pageName, id) {
    pageName = pageName || 'app-home-childCheckList';
    console.log('id:', id);
    this.navCtrl.push(pageName, { id: id });
  }

  changeTag(tag) {
    console.log('tag:', tag);
    if (tag === this.currentTag) {
      return;
    }
    this.currentTag = tag;
    switch (this.currentTag) {
      case 'month':
        console.log('init month');
        this.loadMonthChart(new Date(formatDate(new Date(), 'yyyy/MM' + '/1')));
        break;
      case 'season':
        console.log('init season');
        let currentSeason = Math.floor((new Date().getMonth() + 3) / 3);//第几季度
        let theCurrentSeasonFirstDayString = [new Date().getFullYear(), (3 * currentSeason - 2), 1].join('/');
        this.loadSeasonChart(new Date(theCurrentSeasonFirstDayString));//默认为当季度第一天
        break;
      case 'year':
        console.log('init year');
        this.loadYearChart(new Date(formatDate(new Date(), 'yyyy')));
        break;
      case 'day':
      default:
        this.startDateFilter = new Date(this.startDateString);
        this.endDateFilter = new Date(this.endDateString);
        break;
    }
  }

  sure() {
    console.log('search start:', this.startDateString);
    console.log('search end:', this.endDateString);
    this.startDateFilter = new Date(this.startDateString);
    this.endDateFilter = new Date(this.endDateString);
    if (this.endDateFilter.getTime() - this.startDateFilter.getTime() < 0) {
      return this.toastService.show('结束时间应改晚于开始时间！');
    }
    this.loadAttendanceStatisticOnChart(this.startDateString, this.endDateString);
  }

  loadAttendanceStatisticOnChart(startDate, endDate) {
    this.childAttendanceNetwork.getAttendanceRateChart({ startDate: startDate.replace(/\//g, '-'), endDate: endDate.replace(/-g/, '/') })
      .subscribe((result: { absenceCount: number, absenceRate: number, leaveCount: number, leaveRate: number, signCount: number, signRate: number, totalCount: number }) => {
        console.log(result);
        if (result) {
          this.chart.removeSerie(0);
          this.chart.addSerie({
            name: 'Brands',
            data: [{
              name: '出勤',
              y: result.signCount,
              sliced: true,
              selected: true,
              color: '#df56ff',
            }, {
              name: '请假',
              y: result.leaveCount,
              color: '#71b9fd'
            }, {
              name: '缺勤',
              y: result.absenceCount,
              color: '#7d81ff'
            }]
          }, true);
        }
      }, err => {
        this.toastService.show('加载图标数据失败！');
      });
  }

  loadMonthChart(date){
    let startString = formatDate(date, 'yyyy-MM-dd');
    let nextMonth = new Date(new Date(startString.replace(/-/g, '/')).setMonth(date.getMonth() + 1));
    let end = new Date(nextMonth.setDate(nextMonth.getDate() - 1));
    let endString = formatDate(end, 'yyyy-MM-dd');


    //用于条件筛选
    this.startDateFilter = date;
    this.endDateFilter = end;

    console.log('start:', startString, ',end:', endString);
    this.loadAttendanceStatisticOnChart(startString, endString);
  }
  nextMonth(date) {
    console.log('next month:');
    this.loadMonthChart(date);
  }
  prevMonth(date) {
    console.log('prev month:', date);
    this.loadMonthChart(date);
  }

  loadSeasonChart(date){
    let startString = formatDate(date, 'yyyy-MM-dd');
    let nextSeason = new Date(new Date(startString.replace(/-/g, '/')).setMonth(date.getMonth() + 3));
    let end = new Date(nextSeason.setDate(nextSeason.getDate() - 1));
    let endString = formatDate(end, 'yyyy-MM-dd');


    //用于条件筛选
    this.startDateFilter = date;
    this.endDateFilter = end;

    console.log('start:', startString, ',end:', endString);
    this.loadAttendanceStatisticOnChart(startString, endString);
  }
  nextSeason(date) {
    console.log('next Season:');
    this.loadSeasonChart(date);
  }
  prevSeason(date) {
    console.log('prev Season:');
    this.loadSeasonChart(date);
  }

  loadYearChart(date){
    let endString = `${date.getFullYear() + '-12-31'}`;
    console.log('start:', formatDate(date, 'yyyy-MM-dd'), ',end:', endString);

    //用于条件筛选
    this.startDateFilter = date;
    this.endDateFilter = new Date(endString);

    this.loadAttendanceStatisticOnChart(formatDate(date, 'yyyy-MM-dd'), endString);
  }
  nextYear(date) {
    console.log('next year:', date);
    this.loadYearChart(date);
  }
  prevYear(date) {
    console.log('prev year:');
    this.loadYearChart(date);
  }

}
