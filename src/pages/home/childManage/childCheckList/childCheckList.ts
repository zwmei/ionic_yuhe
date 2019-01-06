import { IonicPage,NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ChildAttendanceNetwork } from "../../../../network/childAttendance.network";
import { ToastService } from "../../../../service/toast.service";
import { formatDate } from '../../../../network/http';

@IonicPage({
  name: 'app-home-childCheckList'
})
@Component({
  templateUrl: 'childCheckList.html'
})
export class ChildCheckList {

  list;
  todayString = formatDate(new Date(), 'yyyy-MM-dd');
  constructor(private navCtrl: NavController, private childAttendanceNetwork: ChildAttendanceNetwork, private toastService: ToastService) {
    this.getClassList();
    // this.list = [
    //   {
    //     name: '大一班',
    //     arriveCount: 54,
    //     actualCount: 54,
    //     leaveCount: 13,
    //     noSignedCount: 0
    //   },{
    
    //     name: '大二班',
    //     arriveCount: 54,
    //     actualCount: 54,
    //     leaveCount: 13,
    //     noSignedCount: 0
    //   },{
    //     name: '大三班',
    //     arriveCount: 54,
    //     actualCount: 54,
    //     leaveCount: 13,
    //     noSignedCount: 0
    //   }
    // ];
  }

  goToPage(pageName, item){
    pageName = pageName || 'app-home-childCheckListItem';
    console.log('item:',item);
    this.navCtrl.push(pageName, { id: item.id, className: item.name });
  }

  getClassList() {
    this.childAttendanceNetwork.getClassAttendanceList({startDate: this.todayString, endDate: this.todayString})
      .subscribe((classList: [{ classId: string, className: string, totalCount: number, signCount: number, leaveCount: number, absenceCount: number }]) => {
        if(Array.isArray(classList) && classList.length > 0){
          this.list = classList.map((classInfo) => {
            return {
              id: classInfo.classId,
              name: classInfo.className,
              totalCount: classInfo.totalCount || 0,
              signCount: classInfo.signCount || 0,
              leaveCount: classInfo.leaveCount || 0,
              absenceCount: classInfo.absenceCount || 0
            };
          });
        }
      }, err => {
        this.toastService.show(err.message || '获取班级出勤列表失败！');
      });
  }

}
