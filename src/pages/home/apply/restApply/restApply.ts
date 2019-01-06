import { DatePipe } from '@angular/common';
import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavParams,
  ActionSheetController,
  NavController,
} from "ionic-angular";
import { ApprovalNetwork } from "./../../../../network/approval.network";

@IonicPage({
  name: "app-home-rest-apply"
})
@Component({
  templateUrl: "RestApply.html",
  selector: "RestApply.ts"
})
export class RestApply {
  applyData: any = {};
  approvalPersons: any= [];
  applyTypes: any= [];
  spr: any = [];
  csr: any = [];
  constructor(
    public alertCtrl: AlertController,
    params: NavParams,
    public actionSheet: ActionSheetController,
    public approvalNetWork: ApprovalNetwork,
    public navCtrl: NavController,
    private datePipe: DatePipe,
  ) {
    this.applyData.qjyy = "请选择";
  }

  /// 请假类型
  selectRestType() {
    /// 请假类型没有定义
    if (this.applyTypes.length > 0) {
      this.showSelectTypeAlert()
    } else {
      this.approvalNetWork.getRestApplayType().subscribe(
        (data: any) => {
          console.log(data);
          this.applyTypes = data;
          this.showSelectTypeAlert()
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /// 请假类型
  showSelectTypeAlert() {
    var buttons = this.applyTypes.map((item) => {
      return {
        text: item.qjyy,
        handler: () => {
          this.applyData.qjlx = item.id;
          this.applyData.qjyy = item.qjyy;
        }
      }
    })
    const actionSheet = this.actionSheet.create({
      buttons: buttons,
    });
    actionSheet.present();
  }

  /// 审批人
  getApprovalPerson() {
    if (this.approvalPersons.length> 0)  {
      this.showAddApprovalAlert()
    } else {
      this.approvalNetWork.getStaffList().subscribe(
        (data: any) => {
          console.log(data);
          this.approvalPersons = data;
          this.showAddApprovalAlert()
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  /// 审批人
  showAddApprovalAlert() {
    var buttons = this.approvalPersons.map((item) => {
      return {
        text: item.zgxm,
        handler: () => {
          this.spr.push({
            id: item.id,
            zgName: item.zgxm,
          })
        }
      }
    })
    const actionSheet = this.actionSheet.create({
      buttons: buttons,
    });
    actionSheet.present();
  }

  /// 抄送人
  getCopyToPerson() {
    if (this.approvalPersons.length> 0)  {
      this.showAddCopyToAlert()
    } else {
      this.approvalNetWork.getStaffList().subscribe(
        (data: any) => {
          console.log(data);
          this.approvalPersons = data;
          this.showAddCopyToAlert()
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  /// 抄送人
  showAddCopyToAlert() {
    var buttons = this.approvalPersons.map((item) => {
      return {
        text: item.zgxm,
        handler: () => {
          this.csr.push({
            id: item.id,
            zgName: item.zgxm,
          })
        }
      }
    })
    const actionSheet = this.actionSheet.create({
      buttons: buttons,
    });
    actionSheet.present();
  }

  resetApply() {
    const confirm = this.alertCtrl.create({
      title: "",
      message: "你确定要申请吗?",
      buttons: [
        {
          text: "取消",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "确定",
          handler: () => {
            console.log("Agree clicked");
            var spid = this.spr.map((item) => { return item.id });
            var csid = this.csr.map((item) => { return item.id });
            var start = this.datePipe.transform(this.applyData.qssj, 'yyyy-MM-dd HH:mm:ss');
            var end = this.datePipe.transform(this.applyData.jssj, 'yyyy-MM-dd HH:mm:ss');
            var apply =  {
              billType: 3,
              qssj: start,
              jssj: end,
              qjsc: this.applyData.qjsc,
              qjsy: this.applyData.qjsy,
              qjlx: this.applyData.qjlx,
            };
            var params = {
              apply: JSON.stringify(apply),
              spid: spid.join(','),
              csid: csid.join(','),
            };
            this.approvalNetWork.applyForReset(params).subscribe(
              (data: any) => {
                console.log(data);
                this.navCtrl.pop();
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
