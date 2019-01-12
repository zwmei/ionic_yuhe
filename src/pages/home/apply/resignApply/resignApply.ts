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

  /// 删除审批人
  deleteSpr(index) {
    this.spr.splice(index, 1);
  }
  /// 删除抄送人
  deleteCsr(index) {
    this.csr.splice(index, 1);
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
