import { IonicPage, NavController, App, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { formatDate } from '../../../../network/http';
import { KindergartenOverviewNetwork } from '../../../../network/kindergartenOverview.network';
import { isArray } from 'lodash';
import { ColorMap } from '../../../../service/utils.service';

@IonicPage({
  name: 'app-home-staffAttendance'
})
@Component({
  templateUrl: 'staffAttendance.html'
})
export class StaffAttendancePage {
  startDate: Date;
  chart1: Chart;
  infos: any;
  attendanceList: any[];
  statistic: object;

  constructor(
    private navCtrl: NavController,
    private app: App,
    private platform: Platform,
    private kindergartenOverviewNetwork: KindergartenOverviewNetwork
  ) {
    this.startDate = new Date(formatDate(new Date(), 'yyyy/MM/dd'));
    this.startDate.setDate(1);
    this.infos = {};
    this.statistic = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad=====', Date.now());
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter=====', Date.now());
  }
  ionViewDidEnter() {
    console.log('bbhhhhh=====', Date.now());
    this.refreshData();
  }

  refreshData() {
    let params = {
      startDate: formatDate(this.startDate, 'yyyy-MM-dd'),
      endDate: formatDate(this.getEndDate(), 'yyyy-MM-dd')
    };
    this.updateChart1(params);
    this.getStaffAttendanceList(params);
  }

  getEndDate() {
    return new Date(new Date(this.startDate).setMonth(this.startDate.getMonth() + 1) - 1000);
  }


  goPrevMonth() {
    this.startDate = new Date(this.startDate.setMonth(this.startDate.getMonth() - 1));
    this.refreshData();
  }
  goNextMonth() {
    this.startDate = new Date(this.startDate.setMonth(this.startDate.getMonth() + 1));
    this.refreshData();
  }

  updateChart1 = (params) => {
    this.kindergartenOverviewNetwork.getAllAttendanceInfo(params)
      .subscribe((data: any) => {
        if (data.status) {
          return;
        }
        this.infos = data;
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
                  y: data.signRate,
                  color: ColorMap.Color1
                },
                {
                  name: '缺勤',
                  y: data.absenceRate,
                  color: ColorMap.Color2
                },
                // {
                //   name: '迟到',
                //   y: data.beingLateRate
                //   color: ColorMap.Color1
                // },
                {
                  name: '请假',
                  y: data.leaveRate,
                  color: ColorMap.Color3
                }
              ]
            }
          ]
        };
        this.chart1 = new Chart(options);
      });
  }

  getStaffAttendanceList(params) {
    this.kindergartenOverviewNetwork.getStaffAttendanceList(params)
      .subscribe((data: any) => {
        if (isArray(data)) {
          this.attendanceList = data.map((item) => {
            return {
              name: item.teacherName,
              rate: (item.signRate || 0) * 10 * 10
            }
          })
        }
      })
  }

  goToListPage() {
    this.navCtrl.push('app-home-attendance-list', {
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
      endDate: formatDate(new Date(), 'yyyy-MM-dd'),
    })
  }
  goToStatusPage(name: string) {
    this.navCtrl.push('app-home-attendance-status-list', {
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
      endDate: formatDate(new Date(), 'yyyy-MM-dd'),
      // startDate: formatDate(this.startDate, 'yyyy-MM-dd'),
      // endDate: formatDate(this.getEndDate(), 'yyyy-MM-dd'),
      name
    })
  }

  goToDetail() {
    this.navCtrl.push('app-home-attendance-chart');
  }

}
