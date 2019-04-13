import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { NavController, App, IonicPage } from 'ionic-angular';
import { KindergartenOverviewNetwork } from '../../network/kindergartenOverview.network';
import { formatDate } from '../../network/http';
import { AuthService } from '../../service/auth.service';
import { NoticeNetWork } from '../../network/notice.network';
import { UtilsService, ColorMap, ColorSet } from '../../service/utils.service';
import { Subscription } from 'rxjs/Subscription';

@IonicPage({
  name: 'home',
  segment: 'home-page'
})
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  subscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private utils: UtilsService,
    private auth: AuthService,
    private app: App,
    private kindergartenOverviewNetwork: KindergartenOverviewNetwork,
    private notiNetWork: NoticeNetWork
  ) {
    this.chartName = "";
    this.subscription = null;
  }

  messageText: string = "";
  searchText: string = '';
  chartName = '';
  chart1 = null;
  chart2 = null;
  chart3: Chart = new Chart();
  messageTimer: any;

  updateChart1 = (data: any) => {
    this.kindergartenOverviewNetwork.getAllAttendanceInfo({
      startDate: formatDate(this.utils.getBeginOfMonth(), 'yyyy-MM-dd'),
      endDate: formatDate(this.utils.getEndOfMonth(), 'yyyy-MM-dd'),
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
                y: data.signCount,
                color: ColorMap.Color1
              },
              {
                name: '缺勤',
                y: data.absenceCount,
                color: ColorMap.Color2
              },
              // {
              //   name: '迟到',
              //   y: data.beingLateCount,
              //   color:'#F7BB5A'
              // },
              {
                name: '请假',
                y: data.leaveCount,
                color: ColorMap.Color3
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
      startDate: formatDate(this.utils.getBeginOfMonth(), 'yyyy-MM-dd'),
      endDate: formatDate(this.utils.getEndOfMonth(), 'yyyy-MM-dd'),
    }).subscribe((data: any) => {
      if (data.status) {
        return;
      }
      let seriesData = []; let total = 0;
      data.forEach((item, index) => {
        seriesData.push({
          name: item.bzm,
          y: item.bzs,
          color: ColorSet[index % ColorSet.length]
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
        startDate: formatDate(this.utils.getBeginOfYear(), 'yyyy-MM-dd'),
        endDate: formatDate(this.utils.getEndOfYear(), 'yyyy-MM-dd'),
      }).toPromise(),
      this.kindergartenOverviewNetwork.getAllFinancialOutputSum({
        startDate: formatDate(this.utils.getBeginOfYear(), 'yyyy-MM-dd'),
        endDate: formatDate(this.utils.getEndOfYear(), 'yyyy-MM-dd'),
      }).toPromise()
    ]).then((data: any) => {
      if (data && Array.isArray(data) && data.length === 2) {
        if (data[0].status || data[1].status) {
          return;
        }

        let seriesData = [
          {
            name: '收入',
            y: (data[0].result || {}).sum || 0,
            color: ColorMap.Color1
          },
          {
            name: '支出',
            y: (data[1].result || {}).sum || 0,
            color: ColorMap.Color2
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

  onInitChat() {
    let arr = ['employee', 'sick', 'finance'];
    arr.some((key: string, index: number) => {
      if (this.hasPermission(`home/info/${key}`)) {
        this.onSelectChart(`chart${index + 1}`);
        return true;
      }
      return false;
    });
  }

  goToPage(pageName): void {
    pageName = pageName || 'app-home-classManage';
    this.navCtrl.push(pageName);
    return;
  }

  ionViewDidEnter() {
    console.warn('---home did enter');
    this.chartName = '';
    this.messageText = "";
    this.notiNetWork.getunReadNoticeList({}).subscribe((data: any) => {

    });
    this.notiNetWork.getunReadNoticeList({}).subscribe((data: any) => {
      data = data || [];
      if (data.status) {
        return;
      }

      let texts = data.slice(0, 8).map(item => item.ggbt);
      if (texts.length > 0) {
        // var ct = new ChangingTitle(document.querySelector('.changing-title'));
        var count = 0;
        this.messageText = texts[count++ % texts.length];
        // ct.changeText(texts[count++ % texts.length]);
        this.messageTimer = setInterval(() => {
          this.messageText = texts[count++ % texts.length];
          // ct.changeText(texts[count++ % texts.length]);
        }, 5000);
      }
      // this.messageText = data.slice(0, 8).map(item => item.ggbt).join('  ');
    });
    this.onInitChat();
  }
  ionViewDidLeave() {
    if (this.messageTimer) {
      clearInterval(this.messageTimer);
    }
  }

  // ionViewDidLoad() {

  //   // this.subscription = (WebIMObserve).subscribe({
  //   //   next: (data) => {
  //   //     console.log('home.ts on get xiaoxi==', data);
  //   //   }
  //   // });
  // }

  // ionViewWillUnload() {
  //   console.warn('home did out unload=======');

  //   this.subscription && this.subscription.unsubscribe();
  //   this.subscription = null;
  // }
}
