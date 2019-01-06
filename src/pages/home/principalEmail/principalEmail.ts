import { Component } from "@angular/core";
import { NavParams, NavController, IonicPage } from "ionic-angular";

@IonicPage({
  name: "app-home-principal-email"
})
@Component({
  templateUrl: "principalEmail.html",
  selector: "principalEmail.ts"
})
export class PrincipalEmail {
  props;
  items;
  isRead: string = "false";

  constructor(public navCtrl: NavController, params: NavParams) {
    this.props = params.data;
    this.items = [
      {
        picture: "assets/imgs/image-default.png",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-3.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-4.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-4.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/imgs/image-default.png",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-3.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-4.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-4.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/imgs/image-default.png",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-3.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-4.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      },
      {
        picture: "assets/icon/thumbnail-puppy-4.jpg",
        title: "肥仔美",
        subTitle:
          "你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!你好院长我是肥仔美的妈妈!",
        badage: 10
      }
    ];
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
