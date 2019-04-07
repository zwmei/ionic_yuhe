import { GallaryService } from './../../../../service/gallary.service';
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
  canRevoke = 0;
  csr: any = [];
  spr: any = [];
  picture: any = [];
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    params: NavParams,
    public approvalNetWork: ApprovalNetwork,
    public toast: ToastService,
    public gallaryService: GallaryService,
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
                  item.price = item.goodsItem.price;
                  if (item.goodsItem.goodsUnit) {
                    item.unit = item.goodsItem.goodsUnit.name;
                  }
                }
                return item;
              })
              this.csr = this.addImageToUser(data.csr);
              this.spr = this.addImageToUser(data.spr);
              this.canRevoke = data.canRevoke;
              if (data.path) {
                this.picture = data.path.map(photo => {
                  return HTTP_URL.MAIN + "/images/" + photo;
                });
              }
              console.log(this.spr);
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
                  item.name = item.goodsItem.name;
                  item.model = item.goodsItem.model;
                  item.brand = item.goodsItem.brand;
                }
                return item;
              });
              this.csr = this.addImageToUser(data.csr);
              this.spr = this.addImageToUser(data.spr);
              this.canRevoke = data.canRevoke;
              if (data.path) {
                this.picture = data.path.map(photo => {
                  return HTTP_URL.MAIN + "/images/" + photo;
                });
              }
              console.log(this.spr);
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
              if (data.path) {
                this.picture = data.path.map(photo => {
                  return HTTP_URL.MAIN + "/images/" + photo;
                });
              }
              this.canRevoke = data.canRevoke;
              console.log(this.spr);
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
              if (data.path) {
                this.picture = data.path.map(photo => {
                  return HTTP_URL.MAIN + "/images/" + photo;
                });
              }
              this.canRevoke = data.canRevoke;
              console.log(this.spr);
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
              this.canRevoke = data.canRevoke;
              if (data.path) {
                this.picture = data.path.map(photo => {
                  return HTTP_URL.MAIN + "/images/" + photo;
                });
              }
              console.log(this.spr);
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

  showPhotos(pictures, pictureIndex){
    if(!pictures || pictures.length === 0){
      return;
    }

    let prevPictures = pictures.slice(0, pictureIndex);//截出当前图片之前的图片
    let nextPictures = pictures.slice(pictureIndex, pictures.length);//当前图片应该在第一个
    let newPictures = nextPictures.concat(prevPictures);//重新组合最新的图片序列
    this.gallaryService.photoViews(newPictures);

    // photoData = photoData || 'assets/imgs/img-default.png';
    // this.gallaryService.photoViews(photoData,'');
  }
}
