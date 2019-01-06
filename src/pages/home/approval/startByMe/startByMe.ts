import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";
import { ApprovalNetwork } from "./../../../../network/approval.network";
@IonicPage({
  name: "start-byMe-page"
})
@Component({
  templateUrl: "startByMe.html",
  selector: "startByMe.ts"
})
export class StartByMe {
  props;
  list: any = [];

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public approvalNetWork: ApprovalNetwork
  ) {
    this.props = params.data;
  }
  ionViewDidEnter() {
    this.approvalNetWork.getApplayApprovalList().subscribe(
      (data: any) => {
        console.log(data);
        this.list = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clickItem(item) {
    this.navCtrl.push("app-home-approval-details", { params: item, type: 2 });
  }

  doRefresh(event) {
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      console.log("Done");
      event.complete();
    }, 500);
  }
}
