import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";
import { ApprovalNetwork } from "./../../../../network/approval.network";

@IonicPage({
  name: "app-home-copyTome"
})
@Component({
  templateUrl: "copyToMe.html",
  selector: "copyToMe.ts"
})
export class CopyToMe {
  props;
  readList: any = [];
  unReadList: any = [];
  isRead: string = "false";

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public approvalNetWork: ApprovalNetwork
  ) {
    this.props = params.data;
  }
  ionViewDidEnter() {
    this.approvalNetWork.getReadCopyList().subscribe(
      (data: any) => {
        console.log(data);
        this.readList = data;
      },
      error => {
        console.log(error);
      }
    );

    this.approvalNetWork.getUnReadCopyList().subscribe(
      (data: any) => {
        console.log(data);
        this.unReadList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clickItem(item) {
    this.navCtrl.push("app-home-approval-details", { params: item, type: 3 });
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
