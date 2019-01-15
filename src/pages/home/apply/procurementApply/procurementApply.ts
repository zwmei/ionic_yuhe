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
import { ToastService } from "../../../../service/toast.service";
import { HTTP_URL } from "../../../../network/http";

@IonicPage({
  name: "app-home-procurement-apply"
})
@Component({
  templateUrl: "ProcurementApply.html",
  selector: "ProcurementApply.ts"
})
export class ProcurementApply {
  applyData: any = { cgqds: [] };
  approvalPersons: any = [];
  purseGoods: any = [];
  spr: any = [];
  csr: any = [];
  images = [];
  photos= [];

  constructor(
    public alertCtrl: AlertController,
    params: NavParams,
    public actionSheet: ActionSheetController,
    public approvalNetWork: ApprovalNetwork,
    public navCtrl: NavController,
    private datePipe: DatePipe,
    public toast: ToastService
  ) {
    this.applyData.cgqds.push({ name: "请选择" });
  }

  addMoreGood() {
    this.applyData.cgqds.push({ name: "请选择" });
  }

  /// 领用类型
  selectGood(i) {
    console.log(i);
    /// 请假类型没有定义
    if (this.purseGoods.length > 0) {
      this.showStationTypeAlert(i);
    } else {
      this.approvalNetWork.getPurchaseGoodType().subscribe(
        (data: any) => {
          console.log(data);
          this.purseGoods = data;
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
    var buttons = this.purseGoods.map(item => {
      return {
        text: item.name,
        handler: () => {
          this.applyData.cgqds[i] = item;
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
      item.image = HTTP_URL.MAIN + "/images/" + item.photo;
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

  /// 删除审批人
  deleteSpr(index) {
    this.spr.splice(index, 1);
  }
  /// 删除抄送人
  deleteCsr(index) {
    this.csr.splice(index, 1);
  }
  deleteGood(index) {
    this.applyData.cgqds.splice(index, 1);
  }
  procurementApply() {
    if (!this.applyData.cgsj || !this.applyData.sqsy) {
      this.toast.show("请完善申请内容");
      return;
    }

    if (this.applyData.cgqds.length == 0) {
      this.toast.show("至少添加一条明细");
      return;
    }

    for (var i = 0; i < this.applyData.cgqds.length; i++) {
      let item = this.applyData.cgqds[i];
      if (item.name === "请选择" || !item.sl || !item.zj) {
        this.toast.show("请完善物资明细");
        return;
      }

      if (item.sl <= 0 || item.zj <= 0) {
        this.toast.show("数字大于0");
        return;
      }
    }
    if (this.spr.length < 1) {
      this.toast.show("请选择审批人");
      return;
    }

    // if (this.csr.length < 1) {
    //   this.toast.show("请选择抄送人");
    //   return;
    // }

    var spid = this.spr.map(item => {
      return item.id;
    });
    var csid = this.csr.map(item => {
      return item.id;
    });
    var start = this.datePipe.transform(
      this.applyData.cgsj,
      "yyyy-MM-dd HH:mm:ss"
    );
    var apply = {
      billType: 1,
      cgsj: start,
      sqsy: this.applyData.sqsy
      // cglx: this.applyData.cglx
    };
    var items = this.applyData.cgqds.map(item => {
      item.lyid = item.id;
      item.xmmx = item.name;
      item.dj = item.price;
      item.gg = item.model;
      item.pp = item.pp;
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
      items: JSON.stringify(items),
      fileNames: this.images.join(","),
    };
    this.approvalNetWork.applyForBuy(params).subscribe(
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

  // selectProceType() {
  //   if (this.stationTypes.length > 0) {
  //     this.showSelectTypeAlert()
  //   } else {
  //     this.approvalNetWork.getRestApplayType().subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         this.stationTypes = data;
  //         this.showSelectTypeAlert()
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //    }
  // }

  // /// 请假类型
  // showSelectTypeAlert() {
  //   var buttons = this.stationTypes.map((item) => {
  //     return {
  //       text: item.qjyy,
  //       handler: () => {
  //         this.applyData.qjlx = item.id;
  //         this.applyData.qjyy = item.brand + item.model + item.name + item.nums + item.price;
  //       }
  //     }
  //   })
  //   const actionSheet = this.actionSheet.create({
  //     buttons: buttons,
  //   });
  //   actionSheet.present();
  // }

  deletePhoto(index) {
    this.photos.splice(index, 1);
    this.images.splice(index, 1);
  }

  changeFileName(fileName) {
    this.images.push(fileName);
    this.photos.push(HTTP_URL.MAIN + "/images/" + fileName);
  }
}
