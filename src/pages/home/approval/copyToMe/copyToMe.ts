import { HTTP_URL } from './../../../../network/http';
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

  readPagination: any = {
    currentPage: 1,
    size: 10,
    completed: false
  };
  unreadPagination: any = {
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
    this.getReadList();
    this.getUnReadList();
  }

  clickItem(item) {
    this.navCtrl.push("app-home-approval-details", { params: item, type: 3 });
  }

  doRefresh(event) {
    if (this.isRead == "true") {
      this.readPagination.currentPage = 1;
      this.readList = [];
      this.readPagination.completed = false;
      this.getReadList(() => {
        event.complete();
      });
    } else {
      this.unreadPagination.currentPage = 1;
      this.unReadList = [];
      this.unreadPagination.completed = false;
      this.getUnReadList(() => {
        event.complete();
      });
    }
  }

  loadData(event) {
    if (this.isRead == "true") {
      if (this.readPagination.completed) {
        event.complete();
        return;
      }
      this.readPagination.currentPage = this.readPagination.currentPage + 1;
      this.readPagination.completed = false;
      console.log(this.readPagination);
      this.getReadList((count) => {
        if (count === 0) {
          this.readPagination.completed = true;
        }
        event.complete();
      });
    } else {
      if (this.unreadPagination.completed) {
        event.complete();
        return;
      }
      this.unreadPagination.currentPage = this.unreadPagination.currentPage + 1;
      this.unreadPagination.completed = false;
      console.log(this.unreadPagination);
      this.getUnReadList((count) => {
        if (count === 0) {
          this.unreadPagination.completed = true;
        }
        event.complete();
      });
    }
  }

  getReadList(callback?: any) {
    this.approvalNetWork.getReadCopyList({
      size: this.readPagination.size,
      pageNo: this.readPagination.currentPage
    }).subscribe(
      (data: any) => {
        console.log(data);
        data.forEach(element => {
          if (element.initiatorInformations) {
            element.image = HTTP_URL.MAIN + "/images/" + element.initiatorInformations.photo;
          }
          this.readList.push(element);
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

  getUnReadList(callback?: any) {
    this.approvalNetWork.getUnReadCopyList({
      size: this.unreadPagination.size,
      pageNo: this.unreadPagination.currentPage
    }).subscribe(
      (data: any) => {
        console.log(data);
        data.forEach(element => {
          if (element.initiatorInformations) {
            element.image = HTTP_URL.MAIN + "/images/" + element.initiatorInformations.photo;
          }
          this.unReadList.push(element);
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
