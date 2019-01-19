import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MessageService } from '../../service/message.service';
import { ConfirmService } from '../../service/confirm.service';
import { ActionSheetService } from '../../service/actionSheet.service';
import { Platform, NavController } from 'ionic-angular';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { KindergartenOverviewNetwork } from '../../network/kindergartenOverview.network';
import { formatDate } from '../../network/http';
import { AuthService } from '../../service/auth.service';
import { NoticeNetWork } from '../../network/notice.network';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
    private messageService: MessageService,
    private confirmService: ConfirmService,
    private actionSheetService: ActionSheetService,
    private platform: Platform,
    private storage: StorageService,
    private auth: AuthService,
    private kindergartenOverviewNetwork: KindergartenOverviewNetwork,
    private notiNetWork: NoticeNetWork
  ) {

    let user = this.storage.get(STORAGE_KEY.USER_INFO);
    this.chartName = "";
    console.log(user);
  }

  messageText: string = "";
  searchText: string = '';
  chartName = '';
  chart1 = null;
  chart2 = null;
  chart3: Chart = new Chart();

  updateChart1 = (data: any) => {
    this.kindergartenOverviewNetwork.getAllAttendanceInfo({
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
      endDate: formatDate(new Date(), 'yyyy-MM-dd'),
    }).subscribe((data: any) => {
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
              format: '{percentage:.1f}%',
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
                y: data.signCount
              },
              {
                name: '缺勤',
                y: data.absenceCount
              },
              {
                name: '迟到',
                y: data.beingLateCount
              },
              {
                name: '请假',
                y: data.leaveCount
              }
            ]
          }
        ]
      };
      this.chart1 = new Chart(options);
    });
  }
  updateChart2 = (data: any) => {
    this.kindergartenOverviewNetwork.getAllSicknessCaseInfo({
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
      endDate: formatDate(new Date(), 'yyyy-MM-dd'),
    }).subscribe((data: any) => {
      if (data.status) {
        return;
      }
      let seriesData = []; let total = 0;
      data.forEach(item => {
        seriesData.push({
          name: item.bzm,
          y: item.bzs
        });
        total += item.bzs;
      })

      let options = {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          min: 0,
          title: {
            text: `总数：${total}`
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.y:.0f}'
            }
          }
        },
        series: [{
          name: '',
          data: seriesData
        }]
      }

      this.chart2 = new Chart(options);

    });

  }
  updateChart3 = (data: any) => {

    Promise.all([
      this.kindergartenOverviewNetwork.getAllFinancialSourceSum({
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: formatDate(new Date(), 'yyyy-MM-dd'),
      }).toPromise(),
      this.kindergartenOverviewNetwork.getAllFinancialOutputSum({
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: formatDate(new Date(), 'yyyy-MM-dd'),
      }).toPromise()
    ]).then((data: any) => {
      console.warn('promise.all', data);
      if (data && Array.isArray(data) && data.length === 2) {
        if (data[0].status || data[1].status) {
          return;
        }

        let seriesData = [
          {
            name: '收入',
            y: (data[0].result || {}).sum || 0,
            color:'#5ab204'
          },
          {
            name: '支出',
            y: (data[1].result || {}).sum || 0,
            color:'#03ccc6'
          }
        ];


        let options = {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          credits: {
            enabled: false
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            min: 0,
            title: {
              text: ''
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '{point.y:.2f}'
              }
            }
          },
          series: [{
            name: '',
            data: seriesData
          }]
        }
        this.chart3 = new Chart(options);
      }

    });
  }

  onSelectChart(chartName) {
    if (chartName === this.chartName) return;
    console.log('onclick', chartName);
    let info = {
      chart1: this.updateChart1,
      chart2: this.updateChart2,
      chart3: this.updateChart3,
    };
    info[chartName]();
    this.chartName = chartName;
  }

  onSearch(e): void {
    console.log(e, this.searchText);
  }
  onClearSearchText(e): void {
    console.log('cancel', e, this.searchText);
  }

  hasPermission(key: string) {
    return this.auth.hasPermission(key);
  }

  goToPage(pageName): void {
    pageName = pageName || 'app-home-classManage';
    this.navCtrl.push(pageName);
    return;
  }

  ionViewDidEnter() {
    // this.messageText="";
    this.notiNetWork.getunReadNoticeList().subscribe((data: any) => {
      console.log(data);
      data = data || [];
      if (data.status) {
        return;
      }
      this.messageText = data.slice(0, 8).map(item => item.ggbt).join('  ');
    });
    this.onSelectChart('chart1');
  }


}
