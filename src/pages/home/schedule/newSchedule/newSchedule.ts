import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ConfirmService } from '../../../../service/confirm.service';
import { formatDate } from '../../../../network/http';
import { ToastService } from "../../../../service/toast.service";
import { ScheduleNetwork } from "../../../../network/schedule.network";
import { LoadingService } from '../../../../service/loading.service';

@IonicPage({
  name: 'app-home-newSchedule'
})
@Component({
  templateUrl: 'newSchedule.html'
})
export class NewSchedulePage {

  schedule: any;
  isRemind: boolean = false;
  isRemindFrequency: boolean = false;
  
  selectedRemindTime: string='-1';
  inputRemindTime: string = '';
  
  selectedRemindFrequency: string='-1';
  inputRemindFrequency: string = '';

  constructor(
    private navCtrl: NavController,
    private confirmService: ConfirmService,
    private toastService: ToastService,
    private scheduleNetwork: ScheduleNetwork,
    private loading: LoadingService
  ) {

    let now = new Date();
    this.schedule = {
      startDateString: formatDate(now, 'yyyy-MM-dd'),
      startTimeString: formatDate(now, 'HH:mm'),
      title: '',
      content: '',
      remark: '',
      
      isRemindAdvanceObj: {
        isRemind: false,
        selectNumber: false,
        inputNumber: false,
        method: 'select',
        minutes: 0
      },
      remindFrequency: {
        isRemind: false,
        minutes: 0,
        selectMinutes: 0,
        inputMinutes: 0
      }
    };
  }

  save(): void {
    if (!this.schedule.title) {
      return this.toastService.show('标题必填');
    }

    if(this.schedule.title.length > 50){
      return this.toastService.show('标题限制在50个字符以内');
    }

    if (!this.schedule.content) {
      return this.toastService.show('描述必填');
    }

    if(this.schedule.content.length > 400){
      return this.toastService.show('内容限制在400个字符以内');
    }

    if(this.schedule.remindTime && this.schedule.remindTime <= 0){
      return this.toastService.show('提醒时间必须大于0分钟');
    }

    if(this.schedule.remindFrequency && this.schedule.remindFrequency <= 0){
      return this.toastService.show('提醒频次必须大于0分钟');
    }

    if(this.schedule.remark && this.schedule.remark.length > 150){
      return this.toastService.show('备注限制在150个字符以内');
    }
    

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
    this.loading.show();

    let obj : any = {
      title: this.schedule.title,
      content: this.schedule.content,
      summary: this.schedule.remark,
      scheduleDate: this.schedule.startDateString,
      beginTime: this.schedule.startTimeString + ':00'
    };
    if(this.schedule.remindTime && this.schedule.remindTime > 0){
      obj.remindTime = this.schedule.remindTime;
    }
    if(this.schedule.remindFrequency && this.schedule.remindFrequency > 0){
      obj.remindFrequency = this.schedule.remindFrequency;
    }

    this.scheduleNetwork.saveSchedule(obj)
      .subscribe((result: { status: number }) => {
        this.loading.hide();
        if (result.status === 0) {
          if(this.navCtrl.canGoBack()){
            console.log('can go back');
            this.navCtrl.pop();
          }else{
            console.log('can not go back');
            this.navCtrl.push('app-home-scheduleSetting');
          }
        } else {
          this.toastService.show('保存失败！');
        }
      }, err => {
        this.loading.hide();
        this.toastService.show('保存出错！');
      });





  }

  sureRemindTime(){
    if(this.selectedRemindTime === '-1'){
      delete this.schedule.remindTime;
    }else if(this.selectedRemindTime === '0'){
      if(!this.inputRemindTime){
        this.toastService.show('请输入自定义分钟');
        return;
      }
      this.schedule.remindTime = this.inputRemindTime;
    }else{
      this.schedule.remindTime = parseInt(this.selectedRemindTime);
    }
    this.isRemind = false;
  }

  sureRemindFrequency(){
    if(this.selectedRemindFrequency === '-1'){
      delete this.schedule.remindFrequency;
    }else if(this.selectedRemindFrequency === '0'){
      if(!this.inputRemindFrequency){
        this.toastService.show('请输入自定义分钟');
        return;
      }
      this.schedule.remindFrequency = this.inputRemindFrequency;
    }else{
      this.schedule.remindFrequency = parseInt(this.selectedRemindFrequency);
    }
    this.isRemindFrequency = false;
  }
}
