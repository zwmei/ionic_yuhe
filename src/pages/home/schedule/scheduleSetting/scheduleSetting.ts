import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { formatDate } from '../../../../network/http';
import { ConfirmService } from '../../../../service/confirm.service';
import { ToastService } from '../../../../service/toast.service';
import { ScheduleNetwork } from '../../../../network/schedule.network';

@IonicPage({
  name: 'app-home-scheduleSetting'
})
@Component({
  templateUrl: 'scheduleSetting.html'
})
export class ScheduleSettingPage {
  list = {
    today: [],
    tomorrow: []
  };
  currentMonthString: string;
  weekDay;

  constructor(
    private navCtrl: NavController,
    private confirmService: ConfirmService,
    private toastService: ToastService,
    private scheduleNetwork: ScheduleNetwork
    ) {
    
    let now = new Date();
    this.currentMonthString = formatDate(now, 'yyyy-MM');
    this.weekDay = [{name: '日'}, {name: '一'}, {name: '二'},{name: '三'},{name: '四'},{name: '五'},{name: '六'}];
    let nowWeekIndex = now.getDay();

    for(let i = 0; i < 7; i++){
      if(i < nowWeekIndex){
        this.weekDay[i].date = new Date(new Date().setDate(now.getDate() - (nowWeekIndex - i)));
      }else if(i > nowWeekIndex){
        this.weekDay[i].date = new Date(new Date().setDate(now.getDate() + (i - nowWeekIndex)));
      }else{
        this.weekDay[i].date = new Date(formatDate(now, 'yyyy-MM-dd'));
        this.weekDay[i].today = true;
      }

      this.weekDay[i].dateNumber = formatDate(this.weekDay[i].date, 'd');
    }

    this.loadSchedule(now, (list)=>{
      this.list.today = list;
    });
    this.loadSchedule(new Date(new Date().getDate() + 1), (list)=>{
      this.list.tomorrow = list;
    });
  }

  changeDate(){}

  goToPage(pageName, id) {
    pageName = pageName || 'app-home-scheduleDetail';
    console.log('id:', id);
    this.navCtrl.push(pageName, { id: id });
  }

  loadSchedule(date, callback){
    this.scheduleNetwork.getScheduleList({
      queryDate: formatDate(date, 'yyyy-MM-dd')
    })
      .subscribe((scheduleList) => {
        if (Array.isArray(scheduleList) && scheduleList.length > 0) {
          let newList = scheduleList.map(item=>{
            return {
              id: item.id,
              scheduleTitle: item.title,
              time: formatDate(new Date(item.scheduleDate + ' ' + item.beginTime), 'HH:mm')
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


}
