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
import { HTTP_URL } from "../../../../network/http";

@IonicPage({
  name: "app-home-stationery-apply"
})
@Component({
  templateUrl: "stationeryApply.html",
  selector: "stationeryApply.ts"
})
export class StationeryApply {
  applyData: any = { lymxs: [] };
  approvalPersons: any = [];
  stationGoods: any = [];
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
    this.applyData.lymxs.push({ name: "请选择" });
  }

  addMoreGood() {
    this.applyData.lymxs.push({ name: "请选择" });
  }

  /// 领用类型
  selectGood(i) {
    console.log(i);
    /// 请假类型没有定义
    if (this.stationGoods.length > 0) {
      this.showStationTypeAlert(i);
    } else {
      this.approvalNetWork.getReciveGoodType().subscribe(
        (data: any) => {
          console.log(data);
          this.stationGoods = data;
          this.showStationTypeAlert(i);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /// 领用类型
  showStationTypeAlert(i) {
    var buttons = this.stationGoods.map(item => {
      item.image = HTTP_URL.MAIN + "/images/" + item.photo;
      return {
        text: item.name,
        handler: () => {
          this.applyData.lymxs[i] = item;
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
      item.image = HTTP_URL.MAIN + "/images/" + item.photo;
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

    if (!this.applyData.lysj || !this.applyData.wpyt) {
      this.toast.show("请完善申请内容");
      return;
    }

    for (var i = 0; i < this.applyData.lymxs.length; i++) {
      let item = this.applyData.lymxs[i];
      if (item.name === "请选择" || !item.sl) {
        this.toast.show("请完善物资明细");
        return;
      }

      if (item.sl <= 0) {
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
      this.applyData.lysj,
      "yyyy-MM-dd HH:mm:ss"
    );
    var apply = {
      billType: 2,
      lysj: start,
      wpyt: this.applyData.wpyt
    };
    var items = this.applyData.lymxs.map(item => {
      item.lyid = item.id;
      item.wpmc = item.name;
      item.gg = item.model;
      item.goodsItem = {
        id: item.id,
        name: item.name,
        model: item.model,
        brand: item.brand,
        defaultRepertoryId: item.repertoryId
      };
      return item;
    });

    var params = {
      apply: JSON.stringify(apply),
      spid: spid.join(","),
      csid: csid.join(","),
      items: JSON.stringify(items)
    };
    this.approvalNetWork.applyForGood(params).subscribe(
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
    this.applyData.lymxs.splice(index, 1);
  }
}
