import { IonicPage, NavController,NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { ScheduleNetwork } from '../../../../network/schedule.network';
import { ToastService } from '../../../../service/toast.service';
import { LoadingService } from '../../../../service/loading.service';

@IonicPage({
  name: 'app-home-scheduleDetail'
})
@Component({
  templateUrl: 'scheduleDetail.html'
})
export class ScheduleDetailPage {
  schedule: any = {};
  scheduleId;
  constructor(params: NavParams, private navCtrl: NavController, private scheduleNetwork: ScheduleNetwork, private toastService: ToastService,
    private loading: LoadingService) {
    this.scheduleId = params.data.id;

    if(this.scheduleId){
      this.loadSchedule();
    }
  }
  goToPage(pageName, id) {
    pageName = pageName || 'app-home-childCheckList';
    console.log('id:', id);
    this.navCtrl.push(pageName, { id: id });
  }


  loadSchedule(){
    this.loading.show();
    this.scheduleNetwork.getScheduleDetail({
      id: this.scheduleId
    })
      .subscribe((result:any) => {
        this.loading.hide();
        console.log(result);
        if(result){
          this.schedule = {
            title: result.title,
            content: result.content,
            startDateString: result.scheduleDate,
            startTimeString: result.beginTime,
            remark: result.summary,
            remindTime: result.remindTime,
            remindFrequency: result.remindFrequency,
            isComplete: result.isComplete
          }
        }
      }, err => {
        this.loading.hide();
        this.toastService.show('获取安排信息失败！');
      });

  }

  completeSchedule(){
    if(this.schedule.isComplete === 0){
      this.scheduleNetwork.completeSchedule({id:this.scheduleId, status: 1})
      .subscribe((result:any)=>{
        console.log(result);
        console.log(result.status);
        if(result.status === 0){
          this.toastService.show('标记成功！');
          this.schedule.isComplete = 1;
        }else{
          this.toastService.show('标记失败！');
        }
      },err=>{
        this.toastService.show('标记完成失败！');
      });
      
    }else{
      return;
    }
  }
}
