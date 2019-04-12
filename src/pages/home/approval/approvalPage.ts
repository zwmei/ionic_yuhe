import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { ApprovalNetwork } from "./../../../network/approval.network";

@IonicPage({
  name: "app-home-approval-page"
})
@Component({
  templateUrl: "approvalPage.html",
  selector: "approvalPage.ts"
})
export class ApprovalPage {

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public approavlNetWork: ApprovalNetwork
  ) {

  }

  goToPage(pageName): void {
    pageName = pageName || "app-home-classManage";
    this.navCtrl.push(pageName);
  }
}
