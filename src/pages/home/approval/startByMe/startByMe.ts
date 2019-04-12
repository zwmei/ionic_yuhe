import { HTTP_URL } from './../../../../network/http';
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

  pagination: any = {
    currentPage: 1,
    size: 10,
    completed: false
  };

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public approvalNetWork: ApprovalNetwork
  ) {
    this.props = params.data;
  }
  ionViewDidEnter() {
    this.list = [];
    this.getDataList()
  }

  clickItem(item) {
    this.navCtrl.push("app-home-approval-details", { params: item, type: 2 });
  }

  doRefresh(event) {
    this.pagination.currentPage = 1;
      this.list = [];
      this.pagination.completed = false;
      this.getDataList(() => {
        event.complete();
      });
  }

  loadData(event) {
    if (this.pagination.completed) {
      event.complete();
      return;
    }
    this.pagination.currentPage = this.pagination.currentPage + 1;
    this.pagination.completed = false;
    console.log(this.pagination);
    this.getDataList((count) => {
      if (count === 0) {
        this.pagination.completed = true;
      }
      event.complete();
    });
  }

  getDataList(callback?: any) {
    this.approvalNetWork.getApplayApprovalList({
      size: this.pagination.size,
      pageNo: this.pagination.currentPage
    }).subscribe(
      (data: any) => {
        console.log(data);
        data.forEach(element => {
            element.image = HTTP_URL.MAIN + "/images/" + element.photoUrl;
            this.list.push(element);
        });;
        if (callback) {
          return callback(Array.isArray(data) && data.length || 0);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
