import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { ChildAttendanceNetwork } from "../../../../network/childAttendance.network";
import { ToastService } from "../../../../service/toast.service";
import { formatDate, HTTP_URL } from '../../../../network/http';

@IonicPage({
  name: 'app-home-StatusDetailList'
})
@Component({
  templateUrl: 'StatusDetailList.html'
})
export class StatusDetailList {


  title: string;
  statusId: number;
  startDate: any;
  endDate: any;

  statusDic = {
    '出勤': 1,
    '请假': 2,
    '缺勤': 3,
    // '应到': 4,
  };
  constructor(params: NavParams, private childAttendanceNetwork: ChildAttendanceNetwork, private toastService: ToastService) {
    this.title = '缺勤';
    if (params && params.data && params.data.id) {
      this.title = params.data.id;
    }

    this.startDate = formatDate(new Date(), 'yyyy-MM-dd');
    this.endDate = formatDate(new Date(), 'yyyy-MM-dd');
    console.log(params);
    console.log('title:', this.title);
    console.log(this.statusDic);
    this.statusId = this.statusDic[this.title];
    if (!this.statusId) {
      this.list = [];
      return;
    }

    this.loadData();
  }

  list;

  loadData() {
    this.childAttendanceNetwork.getStudentsOfClassGroupByStatus({ type: this.statusId, checkDate: this.startDate })
      .subscribe((classList) => {
        if (Array.isArray(classList) && classList.length > 0) {
          console.log(classList);
          this.list = classList.map(item => {
            return {
              className: item.className,
              studentCount: item.attendanceRecords.length,
              students: item.attendanceRecords.map(record => {
                return {
                  name: record.xm,
                  photo: HTTP_URL.MAIN + '/images/' + (record.studentInformations && record.studentInformations.zp),
                  time: formatDate(record.rysksj, 'HH:mm')//入院刷卡时间
                };
              })
            }
          });
        }


      }, err => {
        this.toastService.show('获取数据失败！');
      });
  }


}
