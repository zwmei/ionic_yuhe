import { HTTP_URL } from './../../../../network/http';
import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { ApprovalNetwork } from "./../../../../network/approval.network";

@IonicPage({
  name: "app-home-my-approval"
})
@Component({
  templateUrl: "myApproval.html",
  selector: "myApproval.ts"
})
export class MyApproval {
  approavlList: any = [];
  unApprovalList: any = [];
  isApproval: string = "false";
  approavPagination: any = {
    currentPage: 1,
    size: 10,
    completed: false
  };
  unapproavPagination: any = {
    currentPage: 1,
    size: 10,
    completed: false
  };

  ionViewDidEnter() {
    this.getApprovalList();
    this.getUnApprovalList();
  }
  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public approavlNetWork: ApprovalNetwork
  ) {}
  clickItem(item) {
    this.navCtrl.push("app-home-approval-details", { params: item, type: 1 });
  }

  doRefresh(event) {
    if (this.isApproval == "true") {
      this.approavPagination.currentPage = 1;
      this.approavlList = [];
      this.approavPagination.completed = false;
      this.getApprovalList(() => {
        event.complete();
      });
    } else {
      this.unapproavPagination.currentPage = 1;
      this.unApprovalList = [];
      this.unapproavPagination.completed = false;
      this.getUnApprovalList(() => {
        event.complete();
      });
    }
  }

  loadData(event) {
    if (this.isApproval == "true") {
      if (this.approavPagination.completed) {
        event.complete();
        return;
      }
      this.approavPagination.currentPage += 1;
      this.approavPagination.completed = false;
      this.getApprovalList((count) => {
        if (count === 0) {
          this.approavPagination.completed = true;
        }
        event.complete();
      });
    } else {
      if (this.unapproavPagination.completed) {
        event.complete();
        return;
      }
      this.unapproavPagination.currentPage += 1;
      this.unapproavPagination.completed = false;
      this.getUnApprovalList((count) => {
        if (count === 0) {
          this.unapproavPagination.completed = true;
        }
        event.complete();
      });
    }
  }

  getApprovalList(callback?: any) {
    this.approavlNetWork
      .getApprovalList({
        size: this.approavPagination.size,
        pageNo: this.approavPagination.currentPage
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.message) {
            return;
          }
          data.forEach(element => {
            if (element.initiatorInformations) {
              element.image = HTTP_URL.MAIN + "/images/" + element.initiatorInformations.photo;
            }
            this.approavlList.push(element);
          });
          if (callback) {
            return callback(Array.isArray(data) && data.length || 0);
          }
        },
        error => {
          console.log(error);
        }
      );

  }
  getUnApprovalList(callback?: any) {
    this.approavlNetWork
      .getUnApprovalList({
        size: this.unapproavPagination.size,
        pageNo: this.unapproavPagination.currentPage
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.message) {
            return;
          }
          data.forEach(element => {
            if (element.initiatorInformations) {
              element.image = HTTP_URL.MAIN + "/images/" + element.initiatorInformations.photo;
            }
            this.unApprovalList.push(element);
          });
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
