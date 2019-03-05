import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ToastService } from '../../../../../service/toast.service';
import { KindergartenOverviewNetwork } from '../../../../../network/kindergartenOverview.network';
import { formatDate } from '../../../../../network/http';

@IonicPage({
  name: 'app-home-attendance-chart'
})
@Component({
  templateUrl: 'attendanceChart.html'
})
export class AttendanceChartPage {
  chart: Chart;
  currentTag: string;
  startDateString: string;
  endDateString: string;
  startDateFilter: Date;
  endDateFilter: Date;


  constructor(
    public navCtrl: NavController,
    public toastService: ToastService,
    private kindergartenOverviewNetwork: KindergartenOverviewNetwork
  ) {
    this.startDateString = formatDate(new Date(), 'yyyy-MM-dd');
    this.endDateString = formatDate(new Date(), 'yyyy-MM-dd');
    this.changeTag('day');
  }


  changeTag(tag: string) {
    console.log('tag:', tag);
    if (tag === this.currentTag) {
      return;
    }
    this.currentTag = tag;
    switch (this.currentTag) {
      case 'month':
        console.log('init month');
        this.loadMonthChart(new Date(formatDate(new Date(), 'yyyy/MM/1')));
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
        this.loadDateChart();
        break;
    }
  }

  updateChart = (params) => {
    this.kindergartenOverviewNetwork.getAllAttendanceInfo(params)
      .subscribe((data: any) => {
        if (data.status) {
          return;
        }
        let options = {
          chart: {
            type: 'pie'
          },
          title: {
            text: ''
          },
          credits: {
            enabled: false
          },
          legend: {
            labelFormat: '{name}'
          },
          loading: {
            showDuration: 100,
            hideDuration: 100
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '{percentage:.0f}%',
                distance: -20
              },
              showInLegend: true,
              events: {
                click: (e) => {
                  this.goToAbsentPage();
                }
              },
              tooltip: {
              }
            }
          },
          series: [
            {
              name: '出勤',
              data: [
                {
                  name: '出勤',
                  y: data.signRate
                },
                {
                  name: '缺勤',
                  y: data.absenceRate
                },
                {
                  name: '迟到',
                  y: data.beingLateRate
                },
                {
                  name: '请假',
                  y: data.leaveRate
                }
              ]
            }
          ]
        };
        this.chart = new Chart(options);
      });
  }

  request(startDate, endDate) {
    this.updateChart({
      startDate,
      endDate
    });
  }

  loadDateChart() {
    this.startDateFilter = new Date(this.startDateString);
    this.endDateFilter = new Date(this.endDateString);
    if (this.endDateFilter.getTime() < this.startDateFilter.getTime()) {
      return this.toastService.show('开始时间不能大于结束时间！');
    }
    this.request(this.startDateString, this.endDateString);
  }


  loadMonthChart(date) {
    let startString = formatDate(date, 'yyyy-MM-dd');
    let nextMonth = new Date(new Date(startString.replace(/-/g, '/')).setMonth(date.getMonth() + 1));
    let end = new Date(nextMonth.setDate(nextMonth.getDate() - 1));
    let endString = formatDate(end, 'yyyy-MM-dd');


    //用于条件筛选
    this.startDateFilter = date;
    this.endDateFilter = end;

    console.log('start:', startString, ',end:', endString);
    this.request(startString, endString);
  }
  nextMonth(date) {
    console.log('next month:');
    this.loadMonthChart(date);
  }
  prevMonth(date) {
    console.log('prev month:', date);
    this.loadMonthChart(date);
  }

  loadSeasonChart(date) {
    let startString = formatDate(date, 'yyyy-MM-dd');
    let nextSeason = new Date(new Date(startString).setMonth(date.getMonth() + 3));
    let end = new Date(nextSeason.setDate(nextSeason.getDate() - 1));
    let endString = formatDate(end, 'yyyy-MM-dd');

    //用于条件筛选
    this.startDateFilter = date;
    this.endDateFilter = end;

    console.log('start:', startString, ',end:', endString);
    this.request(startString, endString);
  }
  nextSeason(date) {
    console.log('next Season:');
    this.loadSeasonChart(date);
  }
  prevSeason(date) {
    console.log('prev Season:');
    this.loadSeasonChart(date);
  }

  loadYearChart(date) {
    let endString = `${date.getFullYear() + '-12-31'}`;
    console.log('start:', formatDate(date, 'yyyy-MM-dd'), ',end:', endString);

    //用于条件筛选
    this.startDateFilter = date;
    this.endDateFilter = new Date(endString);

    this.request(formatDate(date, 'yyyy-MM-dd'), endString);
  }
  nextYear(date) {
    console.log('next year:', date);
    this.loadYearChart(date);
  }
  prevYear(date) {
    console.log('prev year:');
    this.loadYearChart(date);
  }

  goToAbsentPage() {
    this.navCtrl.push('app-home-absent-list', {
      startDate: formatDate(this.startDateFilter, 'yyyy-MM-dd'),
      endDate: formatDate(this.endDateFilter, 'yyyy-MM-dd'),
    });
  }


}
