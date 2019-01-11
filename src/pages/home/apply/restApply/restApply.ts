import { ToastService } from "./../../../../service/toast.service";
import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavParams,
  ActionSheetController,
  NavController
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
  approvalPersons: any = [];
  applyTypes: any = [];
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
  ) {
    this.applyData.qjyy = "请选择";
  }

  /// 请假类型
  selectRestType() {
    /// 请假类型没有定义
    if (this.applyTypes.length > 0) {
      this.showSelectTypeAlert();
    } else {
      this.approvalNetWork.getRestApplayType().subscribe(
        (data: any) => {
          console.log(data);
          this.applyTypes = data;
          this.showSelectTypeAlert();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /// 请假类型
  showSelectTypeAlert() {
    var buttons = this.applyTypes.map(item => {
      return {
        text: item.qjyy,
        handler: () => {
          this.applyData.qjlx = item.id;
          this.applyData.qjyy = item.qjyy;
        }
      };
    });
    const actionSheet = this.actionSheet.create({
      buttons: buttons
    });
    actionSheet.present();
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
          if (this.isContainId(item.id)) {
            this.toast.show("已存在，请重新选择");
            return;
          }
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
          if (this.isContainId(item.id)) {
            this.toast.show("已存在，请重新选择");
            return;
          }
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
  isContainId(id: any) {
    for(var i = 0; i < this.spr.length; i ++) {
      if (id === this.spr[i].id) {
        return true;
      }
    }
    for(var j = 0; j < this.csr.length; j ++) {
      if (id === this.csr[j].id) {
        return true;
      }
    }
    return false;
  }

  resetApply() {
    if (!this.applyData.qssj || !this.applyData.jssj) {
      this.toast.show("请选择请假时间");
      return;
    }

    if (
      new Date(this.applyData.qssj).getTime() >
      new Date(this.applyData.jssj).getTime()
    ) {
      this.toast.show("请选择正确的时间");
      return;
    }

    if (!this.applyData.qjsc || !this.applyData.qjsy || !this.applyData.qjlx) {
      this.toast.show("请完善申请内容");
      return;
    }

    if (this.applyData.qjsc <= 0) {
      this.toast.show("数字大于0");
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
      this.applyData.qssj,
      "yyyy-MM-dd HH:mm:ss"
    );
    var end = this.datePipe.transform(
      this.applyData.jssj,
      "yyyy-MM-dd HH:mm:ss"
    );
    var apply = {
      billType: 3,
      qssj: start,
      jssj: end,
      qjsc: this.applyData.qjsc,
      qjsy: this.applyData.qjsy,
      qjlx: this.applyData.qjlx
    };
    var params = {
      apply: JSON.stringify(apply),
      spid: spid.join(","),
      csid: csid.join(",")
    };
    this.approvalNetWork.applyForReset(params).subscribe(
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

  /// 删除审批人
  deleteSpr(index) {
    this.spr.splice(index, 1);
  }
  /// 删除抄送人
  deleteCsr(index) {
    this.csr.splice(index, 1);
  }
}
