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
import { HTTP_URL } from "../../../../network/http";

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
  images = [];
  photos= [];
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

  procurementApply() {

    if (!this.applyData.sqly || !this.applyData.bxsj || !this.applyData.wxr || !this.applyData.bxlx) {
      this.toast.show("请完善申请内容");
      return;
    }

    if (this.applyData.bxlx.length > 20) {
      this.toast.show("保修超长，请保持在20个字符以内");
      return;
    }

    if (this.applyData.sqly.length > 300) {
      this.toast.show("申请理由超长，请保持在300个字符以内");
      return;
    }

    if (this.applyData.wxr.length > 15) {
      this.toast.show("维修人名称超长，请保持在15个字符以内");
      return;
    }

    if (this.applyData.bxqds.length == 0) {
      this.toast.show("至少添加一条明细");
      return;
    }

    for (var i = 0; i < this.applyData.bxqds.length; i++) {
      let item = this.applyData.bxqds[i];
      if (!item.xmmx || !item.xxms || !item.gys || !item.lxdh || !item.yjje) {
        this.toast.show("请完善物资明细");
        return;
      }

      if (item.yjje <= 0) {
        this.toast.show("金额大于0");
        return;
      }

      if (item.yjje > 9999999.99) {
        this.toast.show("金额应小于9999999.99");
        return;
      }

      if (item.xmmx.length > 50) {
        this.toast.show("项目名称超长，请保持在50个字符以内");
        return;
      }

      if (item.xxms.length > 90) {
        this.toast.show("项目明细超长，请保持在90个字符以内");
        return;
      }

      if (item.gys.length > 90) {
        this.toast.show("供应商超长，请保持在90个字符以内");
        return;
      }

      if (item.lxdh.length > 15) {
        this.toast.show("联系电话超长，请保持在15个字符以内");
        return;
      }

      let number = item.yjje.toString().split(".")[1];
      if (number && number.length > 2) {
        this.toast.show("金额超出精度限制，小数点后最多2位");
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
      items: JSON.stringify(this.applyData.bxqds),
      fileNames: this.images.join(","),
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

  deletePhoto(index) {
    this.photos.splice(index, 1);
    this.images.splice(index, 1);
  }

  changeFileName(fileName) {
    this.images.push(fileName);
    this.photos.push(HTTP_URL.MAIN + "/images/" + fileName);
  }
}
