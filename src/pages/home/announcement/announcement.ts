import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";
import { NoticeNetWork } from './../../../network/notice.network';
import { HTTP_URL } from "../../../network/http";

@IonicPage({
  name: "app-home-announcement"
})
@Component({
  templateUrl: "announcement.html",
  selector: "announcement.ts"
})
export class Announcement {
  props;
  readNotiList: any = [];
  unReadNotiList: any = [];
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

  ionViewDidEnter () {
    this.readNotiList = [];
    this.unReadNotiList = [];
    this.getReadList();
    this.getUnReadList();
  }

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    private notiNetWork: NoticeNetWork
    ) {
    this.props = params.data;
  }

  clickItem(item) {
    /// 是否阅读
    item.isRead = this.isRead;
    this.navCtrl.push("app-home-announce-details", item,);
  }

  doRefresh(event) {
    if (this.isRead == "true") {
      this.readPagination.currentPage = 1;
      this.readNotiList = [];
      this.readPagination.completed = false;
      this.getReadList(() => {
        event.complete();
      });
    } else {
      this.unreadPagination.currentPage = 1;
      this.unReadNotiList = [];
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
    this.notiNetWork.getReadNoticeList({
        size: this.readPagination.size,
        pageNo: this.readPagination.currentPage
      }
    ).subscribe((data: any) => {
      console.log(data);
      if (data) {
        data.map(item => {
          item.image = HTTP_URL.MAIN + "/images/" + item.photoUrl;
          this.readNotiList.push(item);
          return item;
        });
      }
      if (callback) {
        return callback(Array.isArray(data) && data.length || 0);
      }
    }, err => {
      console.log(err)
    });
  }

  getUnReadList(callback?: any) {
    this.notiNetWork.getunReadNoticeList({
      size: this.unreadPagination.size,
      pageNo: this.unreadPagination.currentPage
    }).subscribe((data: any) => {
      console.log(data);
      if (data) {
        data.map(item => {
          item.image = HTTP_URL.MAIN + "/images/" + item.photoUrl;
          this.unReadNotiList.push(item);
          return item;
        })
      }
      if (callback) {
        return callback(Array.isArray(data) && data.length || 0);
      }
    }, err => {
        console.log(err)
    });
  }

  editAnnouncemnetClick() {
    this.navCtrl.push("app-home-edit-announcement");
  }
}
