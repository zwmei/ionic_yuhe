import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { ClassNetwork } from "../../../../network/class.network";
import { ToastService } from "../../../../service/toast.service";
import { HTTP_URL } from "../../../../network/http";


@IonicPage({
  name: 'app-home-studentDetail'
})
@Component({
  templateUrl: 'studentDetail.html'
})

export class StudentDetailPage {
  studentId;
  className;
  student;
  constructor(params: NavParams, private classNetwork: ClassNetwork, private toastService: ToastService) {
    this.studentId = params.data.id;
    console.log(params);
    this.className = params.data.className;

    this.student = {};
    this.getStudentDetail();
  }

  getStudentDetail() {
    this.classNetwork.getStudentDetail({ childId: this.studentId })
      .subscribe((detail: {
        xh: string, csrq: string, age: number, jg: string,
        xm: string, zp: string, jskh: string, ryrq: string, statusValue: string,
        familyRels: [{ roleName: string, zbmc: string, zblxdh: string }]
      }) => {
        console.log(detail);
        if(detail){
          this.student.code = detail.xh;
          this.student.name = detail.xm;
          this.student.family = detail.familyRels && detail.familyRels.map((rel) => {
            return { name: rel.zbmc, relation: rel.roleName, mobile: rel.zblxdh };
          });
          this.student.birthday = detail.csrq;
          this.student.address = detail.jg;
          this.student.schoolDate = detail.ryrq;
          this.student.cardNumber = detail.jskh;
          this.student.age = detail.age;
          this.student.photo = detail.zp ? HTTP_URL.MAIN + '/images/' + detail.zp : '';
          this.student.statusValue = detail.statusValue;
        }
      }, err => {
        this.toastService.show(err.message || '获取学生信息失败！');
      });
  }

}
