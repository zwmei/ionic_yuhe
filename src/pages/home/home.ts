import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MessageService } from '../../service/message.service';
import { ConfirmService } from '../../service/confirm.service';
import { ActionSheetService } from '../../service/actionSheet.service';
import { Platform, NavController } from 'ionic-angular';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { KindergartenOverviewNetwork } from '../../network/kindergartenOverview.network';
import { formatDate } from '../../network/http';
import { ToastService } from '../../service/toast.service';
import { AuthService } from '../../service/auth.service';
import { NoticeNetWork } from '../../network/notice.network';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
    private messageService: MessageService,
    private toastService: ToastService,
    private confirmService: ConfirmService,
    private actionSheetService: ActionSheetService,
    private platform: Platform,
    private storage: StorageService,
    private auth: AuthService,
    private kindergartenOverviewNetwork: KindergartenOverviewNetwork,
    private notiNetWork: NoticeNetWork
  ) {

    let user = this.storage.get(STORAGE_KEY.USER_INFO);
    console.log(user);
  }

  messageText:string="";
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
          labelFormat: '{name}<br/>{y}人'
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
            events: {
              click: (e) => {
                this.goToPage('app-home-staffAttendance');
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
                name: '应到',
                y: data.totalCount
              },
              {
                name: '实到',
                y: data.signCount
              },
              {
                name: '缺勤',
                y: data.leaveCount
              },
              {
                name: '其他',
                y: data.absenceCount
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
              format: '{point.y}'
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
    this.kindergartenOverviewNetwork.getAllFinancialSourceInfo({
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
      endDate: formatDate(new Date(), 'yyyy-MM-dd'),
    }).subscribe((data: any) => {
      if (data.status) {
        return;
      }

      let seriesData = []; let total = 0;
      data.forEach(item => {
        seriesData.push({
          name: item.name,
          y: item.chargeSum
        });
        total += item.chargeSum;
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
              format: '{point.y}'
            }
          }
        },
        series: [{
          name: '',
          data: seriesData
        }]
      }
      this.chart3 = new Chart(options);
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
  showAlert(): void {
    this.messageService.show({
      subTitle: '新年快乐!!!'
    });
  }
  showConfirm(): void {
    this.confirmService.show({
      subTitle: '确认删除吗？',
      buttons: [
        {
          handler: () => {
            alert('取消了');
          }
        },
        {
          handler: () => {
            alert('已删除');
          }
        }
      ]
    })
  }
  showActionSheet(): void {
    this.actionSheetService.show({
      title: 'Albums',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          // icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          // icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          // icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          // icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
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
    this.messageText="";
    this.notiNetWork.getunReadNoticeList().subscribe((data: any) => {
      console.log(data);
      data = data ||[];
      if (data.status){
        return;
      }
      this.messageText = data.slice(0,8).map(item=> item.nr).join('  ');
    });
    this.onSelectChart('chart1');
  }


}
