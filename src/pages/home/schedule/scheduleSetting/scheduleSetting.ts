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
    // this.dateChange(new Date());
  }

  ionViewDidLoad() {
    console.log('ion view did load');
    // this.dateChange(new Date());
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.dateChange(new Date());
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    // this.dateChange(new Date());
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  loadTodayData() {
    let now = new Date();
    let tomorrow = new Date(new Date().setDate(now.getDate() + 1));
    console.log('now:', formatDate(now, 'yyyy-MM-dd'));
    console.log('tomorrow', formatDate(tomorrow, 'yyyy-MM-dd'));
  
    this.loadSchedule(now, (list) => {
      let todayTime = now.getTime();
      this.list.today = list.map(item=>{
        if(item.isComplete === 1){
          item.status = '已完成';
        }else{
          let future = (new Date(formatDate(now, 'yyyy/MM/dd ') + item.time).getTime() - todayTime) > 0;
          item.status = future ? '即将开始': '未完成';
        }
        return item;
      });
    });
    this.loadSchedule(tomorrow, (list) => {
      console.log('list:', list);
      this.list.tomorrow = list.map(item=>{
        item.status = item.isComplete === 1 ? '已完成' : '未开始';
        return item;
      });
      console.log('tomorrow list:', this.list.tomorrow);
    });
    this.isToday = true;
  }


  dateChange(newDate) {
    this.currentLoadDate = newDate;
    this.list.today = [];
    this.list.tomorrow = [];
    this.list.other = [];
    if (formatDate(newDate, 'yyyy-MM-dd') === this.todayString) {
      this.loadTodayData();
    } else {
      this.isToday = false;
      let future = newDate.getTime() - new Date().getTime()> 0;
      this.loadSchedule(newDate, (list) => {
        this.list.other = list.map(item=>{
          if(item.isComplete === 1){
            item.status = '已完成';
          }else{
            item.status = future ? '未开始' : '未完成';
          }
          return item;
        });
      });
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
            let timeArray = item.beginTime.split(':');
            let time = '未知'
            if(timeArray.length === 3){
              time = [timeArray[0],timeArray[1]].join(':');
            }
            
            return {
              id: item.id,
              scheduleTitle: item.title,
              time: time,
              isComplete: item.isComplete,
              status: '未开始'
            }
          });
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
    event.stopPropagation();
  }

}
