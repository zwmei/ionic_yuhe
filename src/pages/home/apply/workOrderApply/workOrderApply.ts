import { ToastService } from './../../../../service/toast.service';
import { ApprovalNetwork } from "./../../../../network/approval.network";
import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavParams,
  ActionSheetController,
  NavController
} from "ionic-angular";
import { DatePipe } from "@angular/common";


@IonicPage({
  name: "app-home-workorder-apply"
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
    public toast: ToastService,
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

  procurementApply() {

    if (!this.applyData.sqly || !this.applyData.bxsj || !this.applyData.wxr || !this.applyData.bxlx) {
      this.toast.show("请完善申请内容");
      return;
    }

    for (var i = 0; i < this.applyData.bxqds.length; i++) {
      let item = this.applyData.bxqds[i];
      if (!item.xmmx || !item.xxms || !item.gys || !item.lxdh || !item.yjje) {
        this.toast.show("请完善物资明细");
        return;
      }

      if (item.yjje <= 0) {
        this.toast.show("数字大于0");
        return;
      }
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
      this.applyData.bxsj,
      "yyyy-MM-dd HH:mm:ss"
    );
    var apply = {
      billType: 5,
      sqly: this.applyData.sqly,
      bxsj: start,
      wxr: this.applyData.wxr,
      bxlx: this.applyData.bxlx
    };
    var params = {
      apply: JSON.stringify(apply),
      spid: spid.join(","),
      csid: csid.join(","),
      // items: items.join(','),
      items: JSON.stringify(this.applyData.bxqds)
    };
    this.approvalNetWork.applyForOrder(params).subscribe(
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

  deleteGood(index) {
    this.applyData.bxqds.splice(index, 1);
  }
}
