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
import { AnyNaptrRecord } from 'dns';


const _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
    }
  } return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps); return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
};

const ChangingTitle = function () {
  function ChangingTitle(a: any) {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, ChangingTitle);
    this.node = x;
    this.letterfy(this.node.querySelector('h1'));
  }
  _createClass(ChangingTitle,
    [
      {
        key: 'letterfy',
        value: function letterfy(node) {
          var text = node.innerText;
          node.innerText = '';
          node.classList.add('current');
          // let c:number=0;
          for (let c in text) {
            var span = document.createElement('span');
            span.innerText = text[c];
            span.classList.add('letter', 'in');
            span.style.animationDelay = parseInt(c) * 1 + 's';
            node.appendChild(span);
          }
        }
      },
      {
        key: 'changeText',
        value: function changeText(newText) {
          newText=newText||'';
          if (newText.length>20) {
            newText = newText.slice(0,20)+'...';
          }

          var oldTitle = this.node.querySelector('.current');
          var i = 0; var _iteratorNormalCompletion = true; var _didIteratorError = false; var _iteratorError = undefined; try {
            for (var _iterator = oldTitle.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var letter = _step.value;
              letter.style.animationDelay = i++ * 0.1 + 's';
              letter.classList.remove('in');
              letter.classList.add('out');
            }
          }
          catch (err) { _didIteratorError = true; _iteratorError = err; }
          finally {
            try { if (!_iteratorNormalCompletion && _iterator.return) { _iterator.return(); } }
            finally { if (_didIteratorError) { throw _iteratorError; } }
          }
          oldTitle.classList.remove('current');
          var newTitle = document.createElement('h1');
          newTitle.classList.add('current');
          for (var c in newText) {
            var span = document.createElement('span');
            span.innerText = newText[c];
            span.classList.add('letter', 'in');
            span.style.animationDelay = parseInt(c) * 0.1 + 1.2 + 's';
            newTitle.appendChild(span);
          }
          this.node.appendChild(newTitle);
          setTimeout(this.removeNode(oldTitle), 2000);
        }
      },
      {
        key: 'removeNode',
        value: function removeNode(x) {
          return function () {
            x.remove();
          };
        }
      }
    ],
    undefined
  );
  return ChangingTitle;
}();

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
  messageTimer:any;

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
            color: '#5ab204'
          },
          {
            name: '支出',
            y: (data[1].result || {}).sum || 0,
            color: '#03ccc6'
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

      let texts = data.slice(0, 8).map(item => item.ggbt);
      if (texts.length>0) {
        var ct = new ChangingTitle(document.querySelector('.changing-title'));
  
        var count = 0;
        ct.changeText(texts[count++ % texts.length]);
        this.messageTimer = setInterval(function () {
          console.log('interval',count,texts);
          ct.changeText(texts[count++ % texts.length]);
        }, 7000);
      }
      // this.messageText = data.slice(0, 8).map(item => item.ggbt).join('  ');
    });
    this.onSelectChart('chart1');
  }
  ionViewDidLeave() {
    console.warn('clear timer');
    if (this.messageTimer) {
      clearInterval(this.messageTimer);
    }
  }

  ionViewDidLoad() {
    
  }

}
