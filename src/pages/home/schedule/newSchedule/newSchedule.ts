import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ConfirmService } from '../../../../service/confirm.service';
import { formatDate } from '../../../../network/http';
import { ToastService } from "../../../../service/toast.service";
import { ScheduleNetwork } from "../../../../network/schedule.network";

@IonicPage({
  name: 'app-home-newSchedule'
})
@Component({
  templateUrl: 'newSchedule.html'
})
export class NewSchedulePage {

  schedule: any;
  constructor(
    private navCtrl: NavController,
    private confirmService: ConfirmService,
    private toastService: ToastService,
    private scheduleNetwork: ScheduleNetwork
  ) {

    let now = new Date();
    this.schedule = {
      startDateString: formatDate(now, 'yyyy-MM-dd'),
      startTimeString: formatDate(now, 'HH:mm'),
      title: '',
      content: '',
      remark: ''
    };
  }

  save(): void {
    this.confirmService.show({
      title: '新建日程',
      subTitle: '确认要保存新日程吗？',
      buttons: [
        {
          handler: () => {
          }
        },
        {
          handler: () => {
            this.saveSchedule();
            // this.navCtrl.push('app-home-scheduleSetting');
          }
        }
      ]
    })
  }


  saveSchedule() {
    if (!this.schedule.title) {
      return this.toastService.show('标题必填');
    }

    if (!this.schedule.content) {
      return this.toastService.show('描述必填');
    }

    this.scheduleNetwork.saveSchedule({
      title: this.schedule.title,
      content: this.schedule.content,
      summary: this.schedule.remark,
      scheduleDate: this.schedule.startDateString,
      beginTime: this.schedule.startTimeString + ':00'
    })
      .subscribe((result: { status: number }) => {
        if (result.status === 0) {
          this.navCtrl.push('app-home-scheduleSetting');
        } else {
          this.toastService.show('保存失败！');
        }
      }, err => {
        this.toastService.show('保存出错！');
      });





  }
}
