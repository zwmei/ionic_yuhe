import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { KindergartenOverviewNetwork } from '../../../../../network/kindergartenOverview.network';


@IonicPage({
  name: 'app-home-absent-list'
})
@Component({
  templateUrl: 'absentList.html'
})
export class AbsentListPage {
  list: any[];

  constructor(
    private navParams: NavParams,
    private kindNetwork: KindergartenOverviewNetwork
  ) {
    this.list = [];
    console.log(this.navParams);
    this.getList(this.navParams.data);
  }

  getList(params: { name: string, startDate: string, endDate: string }) {
    //1：应到，2：出勤，3：请假，4：缺勤，5：迟到）
    let typeDic = {
      '应到': 1,
      '出勤': 2,
      '请假': 3,
      '缺勤': 4,
      '迟到': 5,
    }

    this.kindNetwork.getStaffAbsentList({
      checkType: typeDic[params.name],
      startDate: params.startDate,
      endDate: params.endDate,
    })
      .subscribe((data: any) => {
        if (data.status) {
          return;
        }
        this.list = (data || []).map(item => {
          return {
            name: item.teacherName
          }
        });
      });
  }


}
