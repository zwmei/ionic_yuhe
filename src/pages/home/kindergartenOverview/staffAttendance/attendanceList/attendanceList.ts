import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { KindergartenOverviewNetwork } from '../../../../../network/kindergartenOverview.network';


@IonicPage({
  name: 'app-home-attendance-list'
})
@Component({
  templateUrl: 'attendanceList.html'
})
export class AttendanceListPage {
  list: any[];

  constructor(
    private navParams: NavParams,
    private kindNetwork: KindergartenOverviewNetwork
  ) {
    this.list = [];
    console.log(this.navParams);
    this.getList(this.navParams.data);
  }


  getList(params: object) {
    this.kindNetwork.getStaffAttendanceList(params)
      .subscribe((data: any) => {
        if (data.status) {
          return;
        }
        this.list = (data || []).map(item => {
          return {
            name:item.teacherName,
            signCount:item.signCount,
            noSignedCount:item.absenceCount,
            leaveCount:item.leaveCount,
            statusString:item.statusValue
          }
        });
      });
  }


}
