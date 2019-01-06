import { ApprovalNetwork } from './../../../../network/approval.network';
import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavParams,
  ActionSheetController,
  NavController,
} from "ionic-angular";
import { DatePipe } from '@angular/common';


@IonicPage({
  name: "app-home-workorder-apply",
})
@Component({
  templateUrl: "workOrderApply.html",
  selector: "workOrderApply.ts"
})
export class WorkOrderApply {
  applyData: any = { bxqds: [] };
  approvalPersons: any = [];
  stationTypes: any = [];
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
    this.applyData.bxqds.push({});
  }

  addMoreOrder() {
    this.applyData.bxqds.push({});
  }

  /// 审批人
  getApprovalPerson() {
    if (this.approvalPersons.length > 0) {
      this.showAddApprovalAlert();
    } else {
      this.approvalNetWork.getStaffList().subscribe(
        (data: any) => {
          console.log(data);
          this.approvalPersons = data;
          this.showAddApprovalAlert();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  /// 审批人
  showAddApprovalAlert() {
    var buttons = this.approvalPersons.map(item => {
      return {
        text: item.zgxm,
        handler: () => {
          this.spr.push({
            id: item.id,
            zgName: item.zgxm
          });
        }
      };
    });
    const actionSheet = this.actionSheet.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  /// 抄送人
  getCopyToPerson() {
    if (this.approvalPersons.length > 0) {
      this.showAddCopyToAlert();
    } else {
      this.approvalNetWork.getStaffList().subscribe(
        (data: any) => {
          console.log(data);
          this.approvalPersons = data;
          this.showAddCopyToAlert();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  /// 抄送人
  showAddCopyToAlert() {
    var buttons = this.approvalPersons.map(item => {
      return {
        text: item.zgxm,
        handler: () => {
          this.csr.push({
            id: item.id,
            zgName: item.zgxm
          });
        }
      };
    });
    const actionSheet = this.actionSheet.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  procurementApply() {
    const confirm = this.alertCtrl.create({
      title: "",
      message: "你确定要通过申请吗?",
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
            var start = this.datePipe.transform(this.applyData.bxsj, 'yyyy-MM-dd HH:mm:ss');
            var apply = {
              billType: 5,
              sqly: this.applyData.sqly,
              bxsj: start,
              wxr: this.applyData.wxr,
              bxlx: this.applyData.bxlx,
            }
            var params = {
              apply: JSON.stringify(apply),
              spid: spid.join(','),
              csid: csid.join(','),
              // items: items.join(','),
              items: JSON.stringify(this.applyData.bxqds),
            };
            this.approvalNetWork.applyForOrder(params).subscribe(
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
