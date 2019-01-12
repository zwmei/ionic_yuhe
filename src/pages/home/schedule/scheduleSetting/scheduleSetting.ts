import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { formatDate } from '../../../../network/http';
import { ToastService } from '../../../../service/toast.service';
import { ScheduleNetwork } from '../../../../network/schedule.network';
import { ConfirmService } from '../../../../service/confirm.service';

@IonicPage({
  name: 'app-home-scheduleSetting'
})
@Component({
  templateUrl: 'scheduleSetting.html'
})
export class ScheduleSettingPage {
  list = {
    today: [],
    tomorrow: [],
    other: []
  };
  todayString = formatDate(new Date(), 'yyyy-MM-dd');
  isToday = false;
  currentLoadDate: Date;

  constructor(
    private navCtrl: NavController,
    private toastService: ToastService,
    private scheduleNetwork: ScheduleNetwork,
    private confirmService: ConfirmService
  ) {
    this.dateChange(new Date());
  }

  loadTodayData() {
    let now = new Date();
    this.loadSchedule(now, (list) => {
      this.list.today = list;
    });
    let tomorrow = new Date(new Date().setDate(now.getDate() + 1));
    console.log('now:', formatDate(now, 'yyyy-MM-dd'));
    console.log('tomorrow', formatDate(tomorrow, 'yyyy-MM-dd'));
    this.loadSchedule(tomorrow, (list) => {
      this.list.tomorrow = list;
    });
    this.isToday = true;
  }


  dateChange(newDate) {
    this.currentLoadDate = newDate;

    console.log('caller');
    console.log(newDate);
    this.list.today = [];
    this.list.tomorrow = [];
    this.list.other = [];
    if (formatDate(newDate, 'yyyy-MM-dd') === this.todayString) {
      this.loadTodayData();
    } else {
      this.isToday = false;
      this.loadSchedule(newDate, (list) => {
        this.list.other = list;
      })
    }

  }

  goToPage(pageName, id) {
    pageName = pageName || 'app-home-scheduleDetail';
    console.log('id:', id);
    this.navCtrl.push(pageName, { id: id });
  }

  loadSchedule(date, callback) {
    this.scheduleNetwork.getScheduleList({
      queryDate: formatDate(date, 'yyyy-MM-dd')
    })
      .subscribe((scheduleList) => {
        if (Array.isArray(scheduleList) && scheduleList.length > 0) {
          let newList = scheduleList.map(item => {
            return {
              id: item.id,
              scheduleTitle: item.title,
              time: formatDate(new Date(item.scheduleDate + ' ' + item.beginTime), 'HH:mm')
            }
          });
          console.log(newList);
          return callback(newList);
        } else {
          return callback([]);
        }
      }, err => {
        this.toastService.show('获取安排信息失败！');
        return callback([]);
      });

  }

  removeSchedule(event, schedule) {
    console.log('event:',event);
    this.confirmService.show({
      title: '删除日程',
      subTitle: '确认删除该日程吗？',
      buttons: [
        {
          handler: () => {
          }
        },
        {
          handler: () => {
            this.scheduleNetwork.deleteSchedule({ id: schedule.id })
              .subscribe((result: any) => {
                if (result.status === 0) {
                  this.toastService.show('删除成功');
                  this.dateChange(this.currentLoadDate);//刷新当前加载的日期
                }
              }, err => {
                this.toastService.show('删除失败');
              });
          }
        }
      ]
    });
    // event.stopPropagation();
  }

}
