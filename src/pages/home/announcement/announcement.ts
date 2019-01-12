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
  ionViewDidEnter () {
    this.notiNetWork.getReadNoticeList().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.readNotiList = data.map(item => {
          item.image = HTTP_URL.MAIN + "/images/" + item.photo;
          return item;
        });
      }
    }, err => {
      console.log(err)
    });

    this.notiNetWork.getunReadNoticeList().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.unReadNotiList = data.map(item => {
          item.image = HTTP_URL.MAIN + "/images/" + item.photo;
          return item;
        });
      }
    }, err => {
      console.log(err)
    });
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

  editAnnouncemnetClick() {
    this.navCtrl.push("app-home-edit-announcement");
  }
}
