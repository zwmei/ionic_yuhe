import { ToastService } from './../../../../service/toast.service';
import { DatePipe } from '@angular/common';
import { ApprovalNetwork } from './../../../../network/approval.network';
import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavParams,
  ActionSheetController,
  NavController,
} from "ionic-angular";


@IonicPage({
  name: "app-home-stationery-apply",
})
@Component({
  templateUrl: "stationeryApply.html",
  selector: "stationeryApply.ts"
})
export class StationeryApply {
  applyData: any = {lymxs: []};
  approvalPersons: any= [];
  stationGoods: any= [];
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
      this.applyData.lymxs.push({name: "请选择"});
  }

  addMoreGood() {
    this.applyData.lymxs.push({name: "请选择"});
  }

  /// 领用类型
  selectGood(i) {
    console.log(i);
    /// 请假类型没有定义
    if (this.stationGoods.length > 0) {
      this.showStationTypeAlert(i)
    } else {
      this.approvalNetWork.getReciveGoodType().subscribe(
        (data: any) => {
          console.log(data);
          this.stationGoods = data;
          this.showStationTypeAlert(i)
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /// 领用类型
  showStationTypeAlert(i) {
    var buttons = this.stationGoods.map((item) => {
      return {
        text: item.name,
        handler: () => {
          this.applyData.lymxs[i] = item;
        }
      }
    })
    const actionSheet = this.actionSheet.create({
      buttons: buttons,
    });
    actionSheet.present();
  }

  /// 审批人
  getApprovalPerson() {
    if (this.approvalPersons.length> 0)  {
      this.showAddApprovalAlert()
    } else {
      this.approvalNetWork.getStaffList().subscribe(
        (data: any) => {
          console.log(data);
          this.approvalPersons = data;
          this.showAddApprovalAlert()
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  /// 审批人
  showAddApprovalAlert() {
    var buttons = this.approvalPersons.map((item) => {
      return {
        text: item.zgxm,
        handler: () => {
          this.spr.push({
            id: item.id,
            zgName: item.zgxm,
          })
        }
      }
    })
    const actionSheet = this.actionSheet.create({
      buttons: buttons,
    });
    actionSheet.present();
  }

  /// 抄送人
  getCopyToPerson() {
    if (this.approvalPersons.length> 0)  {
      this.showAddCopyToAlert()
    } else {
      this.approvalNetWork.getStaffList().subscribe(
        (data: any) => {
          console.log(data);
          this.approvalPersons = data;
          this.showAddCopyToAlert()
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  /// 抄送人
  showAddCopyToAlert() {
    var buttons = this.approvalPersons.map((item) => {
      return {
        text: item.zgxm,
        handler: () => {
          this.csr.push({
            id: item.id,
            zgName: item.zgxm,
          })
        }
      }
    })
    const actionSheet = this.actionSheet.create({
      buttons: buttons,
    });
    actionSheet.present();
  }

  procurementApply() {
    const confirm = this.alertCtrl.create({
      title: "",
      message: "你确定要申请吗?",
      buttons: [
        {
          text: "取消",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "确定",
          handler: () => {
            console.log("Agree clicked");
            var spid = this.spr.map((item) => { return item.id });
            var csid = this.csr.map((item) => { return item.id });
            var start = this.datePipe.transform(this.applyData.lysj, 'yyyy-MM-dd HH:mm:ss');
            var apply =  {
              billType: 2,
              lysj: start,
              wpyt: this.applyData.wpyt,
            };
            var items = this.applyData.lymxs.map((item) => {
              item.lyid = item.id;
              item.wpmc = item.name;
              item.gg = item.model;
              item.goodsItem = {
                id: item.id,
                name: item.name,
                model: item.model,
                brand: item.brand,
                defaultRepertoryId: item.repertoryId,
              };
              return item;
            })

            var params = {
              apply: JSON.stringify(apply),
              spid: spid.join(','),
              csid: csid.join(','),
              items: JSON.stringify(items),
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
        }
      ]
    });
    confirm.present();
  }
}
