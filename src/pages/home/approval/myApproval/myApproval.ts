import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { ApprovalNetwork } from './../../../../network/approval.network';

@IonicPage({
  name: "app-home-my-approval"
})
@Component({
  templateUrl: "myApproval.html",
  selector: "myApproval.ts"
})
export class MyApproval {
  approavlList:any = [];
  unApprovalList:any = [];
  isApproval: string = "false";

  ionViewDidEnter() {
    this.approavlNetWork.getApprovalList().subscribe((data:any) => {
      console.log(data)
      if(data.message) {
        return;
      }
      this.approavlList = data;
    }, error => {
      console.log(error)
    })
    this.approavlNetWork.getUnApprovalList().subscribe((data: any) => {
      console.log(data)
      if (data.message) {
        return;
      }
      this.unApprovalList = data;
    }, error => {
      console.log(error)
    })
  }
  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public approavlNetWork: ApprovalNetwork
    ) {
  }
  clickItem(item) {
    this.navCtrl.push('app-home-approval-details', {params: item, type: 1});
  }
}
