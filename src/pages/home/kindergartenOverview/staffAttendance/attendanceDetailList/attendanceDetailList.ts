import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { ToastService } from '../../../../../service/toast.service';
import { KindergartenOverviewNetwork } from '../../../../../network/kindergartenOverview.network';
import { isEmpty } from 'lodash';
import { HTTP_URL } from '../../../../../network/http';


@IonicPage({
  name: 'app-home-attendance-status-list'
})
@Component({
  templateUrl: 'attendanceDetailList.html'
})
export class AttendanceDetailList {
  list;
  constructor(
    private navParams: NavParams,
    private toastService: ToastService,
    private kindNetwork: KindergartenOverviewNetwork
  ) {
    this.list = [];
    this.loadData(this.navParams.data);
  }

  getImageUrl(imageKey) {
    if (!imageKey) {
      return 'assets/imgs/image-default.png';
    }
    return `${HTTP_URL.IMAGE}/${imageKey}`;
  }
  loadData(params: { name: string, startDate: string, endDate: string }) {

    // 查询类型（1：应到，2：出勤，3：请假，4：缺勤，5：迟到）
    let typeDic = {
      '应到': 1,
      '出勤': 2,
      '请假': 3,
      '缺勤': 4,
      '迟到': 5,
    };
    this.kindNetwork.getStaffAttendanceListByType({
      checkType: typeDic[params.name],
      startDate: params.startDate,
      endDate: params.endDate,
    })
      .subscribe((dataList: any) => {
        console.log(dataList);
        if (isEmpty(dataList) || dataList.status) {
          return;
        }
        this.list = dataList.map((item: any) => {
          return {
            name: item.staffName,
            photo: this.getImageUrl(item.staffPhoto)
          }
        });

        // if (Array.isArray(classList) && classList.length > 0) {
        //   console.log(classList);
        //   this.list = classList.map(item => {
        //     return {
        //       className: item.className,
        //       studentCount: item.attendanceRecords.length,
        //       students: item.attendanceRecords.map(record => {
        //         return {
        //           name: record.xm,
        //           photo: HTTP_URL.MAIN + '/images/' + (record.studentInformations && record.studentInformations.zp),
        //           time: formatDate(record.rysksj, 'HH:mm')//入院刷卡时间
        //         };
        //       })
        //     }
        //   });
        // }
      }, err => {
        this.toastService.show('获取数据失败！');
      });
  }


}
