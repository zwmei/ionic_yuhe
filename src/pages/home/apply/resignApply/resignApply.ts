import { ToastService } from "./../../../../service/toast.service";
import { DatePipe } from "@angular/common";
import { ApprovalNetwork } from "./../../../../network/approval.network";
import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavParams,
  ActionSheetController,
  NavController
} from "ionic-angular";

@IonicPage({
  name: "app-home-resign-apply"
})
@Component({
  templateUrl: "resignApply.html",
  selector: "resignApply.ts"
})
export class ResignApply {
  applyData: any = {};
  approvalPersons: any = [];
  spr: any = [];
  csr: any = [];

  constructor(
    public alertCtrl: AlertController,
    params: NavParams,
    public actionSheet: ActionSheetController,
    public approvalNetWork: ApprovalNetwork,
    public navCtrl: NavController,
    private datePipe: DatePipe,
    public toast: ToastService
  ) {}

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

  resetApply() {

    if (!this.applyData.sqsj || !this.applyData.yjlzsj || !this.applyData.lzyy) {
      this.toast.show("请完善申请内容");
      return;
    }
    if (this.spr.length < 1) {
      this.toast.show("请选择审批人");
      return;
    }


    var spid = this.spr.map(item => {
      return item.id;
    });
    var csid = this.csr.map(item => {
      return item.id;
    });
    var start = this.datePipe.transform(
      this.applyData.sqsj,
      "yyyy-MM-dd HH:mm:ss"
    );
    var end = this.datePipe.transform(
      this.applyData.yjlzsj,
      "yyyy-MM-dd HH:mm:ss"
    );
    var apply = {
      billType: 4,
      sqsj: start,
      yjlzsj: end,
      lzyy: this.applyData.lzyy
    };
    var params = {
      apply: JSON.stringify(apply),
      spid: spid.join(","),
      csid: csid.join(",")
    };
    this.approvalNetWork.applyForLeave(params).subscribe(
      (data: any) => {
        console.log(data);
        this.toast.show("申请成功");
        this.navCtrl.pop();
      },
      error => {
        console.log(error);
      }
    );
  }
}
