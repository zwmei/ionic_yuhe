import { EmailNetwork } from './../../../network/email.network';
import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";
import { HTTP_URL } from "../..../../../../network/http";
import {
  StorageService,
  STORAGE_KEY
} from "../../../service/storage.service";

@IonicPage({
  name: "app-home-principal-email"
})
@Component({
  templateUrl: "principalEmail.html",
  selector: "principalEmail.ts"
})
export class PrincipalEmail {
  props;
  unReadList = [];
  readList = [];
  allList = [];
  isRead: string = "false";
  isLeader = 0;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public emailNetwork: EmailNetwork,
    private storage: StorageService,
    ) {
    let loginInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    console.log(loginInfo);
    this.isLeader = loginInfo.isLeader | 0;
    this.props = params.data;
  }

  ionViewDidEnter() {
    this.getMoreData();
  }

  clickItem(item) {
    item.isLeader = this.isLeader;
    this.navCtrl.push("app-home-feedbak-email", item);
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

  editEmail() {
    this.navCtrl.push("app-home-edit-email");
  }


  getMoreData() {
    if (this.isLeader == 0) {
      this.emailNetwork.getAllEmailList({
        pageNo: 0,
        size: 10000,
      }).subscribe((data: any) => {
        console.log('-----', data);
        if (data) {
          this.allList = data.map((item) => {
            item.image = HTTP_URL.MAIN + '/images/' + item.senderPicturePath;
            if (item.sendTime && item.sendTime.split(" ").length > 0) {
              item.sendDate = item.sendTime.split(" ")[0];
            }
            return item;
          });
        }
      }, error => {
        console.log(error)
      })
      return;
    }

    this.emailNetwork.getAllEmailList({
      isRead: 1,
      pageNo: 0,
      size: 10000,
    }).subscribe((data: any) => {
      console.log('-----', data);
      if (data) {
        this.readList = data.map((item) => {
          item.image = HTTP_URL.MAIN + '/images/' + item.senderPicturePath;
          if (item.sendTime && item.sendTime.split(" ").length > 0) {
            item.sendDate = item.sendTime.split(" ")[0];
          }
          return item;
        });
      }
    }, error => {
      console.log(error)
    })

    this.emailNetwork.getAllEmailList({
      isRead: 0,
      pageNo: 0,
      size: 20
    }).subscribe((data: any) => {
      console.log('-----', data);
      if (data) {
        this.unReadList = data.map((item) => {
          item.image = HTTP_URL.MAIN + '/images/' + item.senderPicturePath;
          if (item.sendTime && item.sendTime.split(" ").length > 0) {
            item.sendDate = item.sendTime.split(" ")[0];
          }
          return item;
        });
      }
    }, error => {
      console.log(error)
    });
  }
}
