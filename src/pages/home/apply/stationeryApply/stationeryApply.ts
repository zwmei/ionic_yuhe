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
  images = [];
  photos= [];
  applyTypes: any = [];
  constructor(
    public alertCtrl: AlertController,
    params: NavParams,
    public actionSheet: ActionSheetController,
    public approvalNetWork: ApprovalNetwork,
    public navCtrl: NavController,
    private datePipe: DatePipe,
    public toast: ToastService
  ) {
    this.applyData.lylx_name = "领用";
    this.applyData.lylx = 1;
    this.applyData.lymxs.push({ name: "请选择" });
  }

  addMoreGood() {
    this.applyData.lymxs.push({ name: "请选择" });
  }


  /// 领用类型
  selectReveiveType() {
    /// 请假类型没有定义
    if (this.applyTypes.length > 0) {
      this.showSelectTypeAlert();
    } else {
      this.approvalNetWork.getReciveApplayType().subscribe(
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

  /// 领用类型
  showSelectTypeAlert() {
    var buttons = this.applyTypes.map(item => {
      return {
        text: item.name,
        handler: () => {
          this.applyData.lylx_name = item.name;
          this.applyData.lylx = item.value;
        }
      };
    });
    const actionSheet = this.actionSheet.create({
      buttons: buttons
    });
    actionSheet.present();
  }



  /// 领用物品
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

    if (this.applyData.lylx == 2 && !this.applyData.ghsj) {
      this.toast.show("请完善申请内容");
      return;
    }

    if (this.applyData.wpyt.length > 300) {
      this.toast.show("用途超长，请保持在300个字符以内");
      return;
    }

    if (this.applyData.lymxs.length == 0) {
      this.toast.show("至少添加一条明细");
      return;
    }

    for (var i = 0; i < this.applyData.lymxs.length; i++) {
      let item = this.applyData.lymxs[i];
      if (item.name === "请选择" || !item.sl) {
        this.toast.show("请完善物资明细");
        return;
      }

      if (item.sl <= 0) {
        this.toast.show("数量大于0");
        return;
      }

      if (item.sl > 99999999.99) {
        this.toast.show("数量应小于99999999.99");
        return;
      }


      let number = item.sl.toString().split(".")[1];
      if (item.unit > 0 && number && number.length > item.unit) {
        this.toast.show( item.name + "数量超出精度限制，小数点后最多" + item.unit + "位");
        return;
      }

      if (item.sl > item.nums) {
        this.toast.show("大于库存数量");
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
      "yyyy-MM-dd"
    );
    var end = this.datePipe.transform(
      this.applyData.ghsj,
      "yyyy-MM-dd"
    );
    var apply = {
      billType: 2,
      receiveDate: start,
      lysj: start,
      returnDate: end,
      wpyt: this.applyData.wpyt,
      lylx: this.applyData.lylx,
    };
    var items = this.applyData.lymxs.map(item => {
      item.goodsItem = {
        id: item.id,
      };
      return item;
    });

    var params = {
      apply: JSON.stringify(apply),
      spid: spid.join(","),
      csid: csid.join(","),
      items: JSON.stringify(items),
      fileNames: this.images.join(","),
    };

    console.log(params);

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

  deletePhoto(index) {
    this.photos.splice(index, 1);
    this.images.splice(index, 1);
  }

  changeFileName(fileName) {
    this.images.push(fileName);
    this.photos.push(HTTP_URL.MAIN + "/images/" + fileName);
  }
}
