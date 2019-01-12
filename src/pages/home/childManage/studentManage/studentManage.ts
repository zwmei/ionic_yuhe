import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ClassNetwork } from "../../../../network/class.network";
import { ToastService } from "../../../../service/toast.service";
import { HTTP_URL } from "../../../../network/http";
import { LoadingService } from '../../../../service/loading.service';

@IonicPage({
  name: 'app-home-studentManage'
})
@Component({
  templateUrl: 'studentManage.html'
})

export class StudentManagePage {
  classId;
  className;
  list: any = [];
  constructor(private navCtrl: NavController, params: NavParams, private classNetwork: ClassNetwork, private toastService: ToastService, private loadingService:LoadingService) {
    // params.data = params.data || {};
    console.log(params.data);
    this.classId = params.data.id;
    this.className = params.data.className;
    // this.list = [
    //   {name: '章三', image:'',statusString: '在校', statusDescription:'正常', score: 95, status:'in-school'},
    //   {name: '里斯', image:'',statusString: '请假', statusDescription:'正常', score: 95, status:'leave'},
    //   {name: '王麻子', image:'',statusString: '旷课', statusDescription:'不正常', score: 95, status: 'absent'}
    // ];
    this.getClassStudentList();
  }

  getClassStudentList(onSuccess?: any) {
    this.loadingService.show();
    this.classNetwork.getClassStudents({classId: this.classId})
      .subscribe((studentList: [{ id: number, xm: string, zp: string, normal: number, statusValue: string }]) => {
        console.log(studentList);
        this.loadingService.hide();
        if(Array.isArray(studentList) && studentList.length > 0){
          this.list = studentList.map((student) => {
            return {
              id: student.id,
              name: student.xm,
              image: student.zp ? HTTP_URL.MAIN + '/images/' + student.zp:'',
              statusDescription: student.normal === 1 ? '正常' : '不正常',
              status: student.normal === 1 ? 'normal' :'unnormal',
              statusString: student.statusValue,
              score: 95
            };
          });
        }
        if (onSuccess) {
          onSuccess();
        }
      }, err => {
        this.loadingService.hide();
        this.toastService.show(err.message || '获取班级列表失败！');
      });
  }

  doRefresh(event){
    this.getClassStudentList(()=>{
      event.complete();
    });
  }

  goToStudentDetail(id){
    console.log('id:',id);
    this.navCtrl.push('app-home-studentDetail', { id: id , className: this.className});
  }

}
