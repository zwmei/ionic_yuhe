import { EmailNetwork } from './../../../network/email.network';
import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";
import { HTTP_URL } from "../..../../../../network/http";
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
  isRead: string = "false";

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public emailNetwork: EmailNetwork,
    ) {
    this.props = params.data;
    this.emailNetwork.getAllEmailList({
      isRead: 0
    }).subscribe((data: any) => {
      console.log('-----', data);
      if (data) {
        // this.unReadList = data.map((item) => {
        //   item.image = HTTP_URL.MAIN + '/images/' + item.photo;
        //   return item;
        // });
      }
    }, error => {
      console.log(error)
    })

    this.emailNetwork.getAllEmailList({
      isRead: 1
    }).subscribe((data: any) => {
      console.log('-----', data);
      if (data) {
        // this.unReadList = data.map((item) => {
        //   item.image = HTTP_URL.MAIN + '/images/' + item.photo;
        //   return item;
        // });
      }
    }, error => {
      console.log(error)
    })
  }

  clickItem(item) {
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
}
