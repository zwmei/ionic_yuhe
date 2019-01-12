import { ToastService } from "./../../../../service/toast.service";
import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavParams,
  NavController
} from "ionic-angular";
import { ApprovalNetwork } from "./../../../../network/approval.network";
import { HTTP_URL } from "../../../../network/http";

@IonicPage({
  name: "app-home-approval-details"
})
@Component({
  templateUrl: "approvalDetails.html",
  selector: "approvalDetails.ts"
})
export class ApprovalDetails {
  params: any = {};
  type = 1;
  buyDetail: any = { csxq: {}, cgqds: [], cgsq: {} };
  restDetail: any = { qjsq: {} };
  levelDetail: any = { lzsq: {} };
  goodDetail: any = { lymxs: [], lysqb: {} };
  orderDetail: any = { bxqds: [], gdsq: {} };

  csr: any = [];
  spr: any = [];
  picture: any = [];
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    params: NavParams,
    public approvalNetWork: ApprovalNetwork,
    public toast: ToastService
  ) {
    this.params = params.data.params;
    this.type = params.data.type;

    switch (this.params.billType) {
      case 1:
        this.approvalNetWork
          .applyBuyDetail({
            id: this.params.id
          })
          .subscribe(
            (data: any) => {
              console.log(data);
              this.buyDetail = data;
              this.goodDetail.lymxs = this.buyDetail.cgqds.map(item => {
                if (item.goodsItem) {
                  item.name = item.goodsItem.name;
                  item.brand = item.goodsItem.brand;
                  item.model = item.goodsItem.model;
                  item.price = item.goodsItem.price;
                  if (item.goodsItem.goodsUnit) {
                    item.unit = item.goodsItem.goodsUnit.name;
                  }
                }
                return item;
              })
              this.csr = this.addImageToUser(data.csr);
              this.spr = this.addImageToUser(data.spr);
              console.log(this.spr);
              this.picture = data.path;
            },
            error => {
              console.log(error);
            }
          );
        break;
      case 2:
        this.approvalNetWork
          .applyGoodDetail({
            id: this.params.id
          })
          .subscribe(
            (data: any) => {
              console.log(data);
              this.goodDetail = data;
              this.goodDetail.lymxs = this.goodDetail.lymxs.map(item => {
                if (item.goodsItem) {
                  item.model = item.goodsItem.model;
                  item.brand = item.goodsItem.brand;
                }
                return item;
              })
              this.csr = this.addImageToUser(data.csr);
              this.spr = this.addImageToUser(data.spr);
              this.picture = data.path;
            },
            error => {
              console.log(error);
            }
          );
        break;
      case 3:
        this.approvalNetWork
          .applyRestDetail({
            id: this.params.id
          })
          .subscribe(
            (data: any) => {
              console.log(data);
              if (!data.qjsq) {
                data.qjsq = {};
              }
              this.restDetail = data;
              this.csr = this.addImageToUser(data.csr);
              this.spr = this.addImageToUser(data.spr);
              this.picture = data.path;
            },
            error => {
              console.log(error);
            }
          );
        break;
      case 4:
        this.approvalNetWork
          .applyLeaveDetail({
            id: this.params.id
          })
          .subscribe(
            (data: any) => {
              console.log(data);
              if (!data.lzsq) {
                data.lzsq = {};
              }
              this.levelDetail = data;
              this.csr = this.addImageToUser(data.csr);
              this.spr = this.addImageToUser(data.spr);
              this.picture = data.path;
            },
            error => {
              console.log(error);
            }
          );
        break;
      case 5:
        this.approvalNetWork
          .applyOrderDetail({
            id: this.params.id
          })
          .subscribe(
            (data: any) => {
              console.log(data);
              this.orderDetail = data;
              this.csr = this.addImageToUser(data.csr);
              this.spr = this.addImageToUser(data.spr);
              this.picture = data.path;
            },
            error => {
              console.log(error);
            }
          );
        break;
      default:
        break;
    }
  }

  addImageToUser(users: Array<any>) {
    return users.map(item => {
      if (item.staffInformations) {
        item.image = HTTP_URL.MAIN + "/images/" + item.staffInformations.photo;
      }
      if (item.zt == 1) {
        item.ztName = "待审批";
      } else if (item.zt == 2) {
        item.ztName = "审批通过";
        this.orderDetail.isUsed = true;
      } else if (item.zt == 3) {
        item.ztName = "审批不通过";
        this.orderDetail.isUsed = true;
      } else if (item.zt == 4) {
        item.ztName = "转让审批";
        this.orderDetail.isUsed = true;
      }
      return item;
    });
  }

  approvalClick() {
    this.approvalNetWork
      .approvalSucceed({
        billType: this.params.billType,
        id: this.params.id
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 0) {
            this.toast.show("审批通过");
            this.navCtrl.pop();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  disApprovalClick() {
    this.approvalNetWork
      .approvalFaild({
        billType: this.params.billType,
        id: this.params.id
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 0) {
            this.toast.show("审批不通过");
            this.navCtrl.pop();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  withDrow() {
    this.approvalNetWork
      .withdrowApplay({
        billType: this.params.billType,
        id: this.params.id
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 0) {
            this.navCtrl.pop();
            this.toast.show("撤回成功");
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
