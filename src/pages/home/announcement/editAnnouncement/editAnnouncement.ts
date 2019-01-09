import { ToastService } from './../../../../service/toast.service';
import { DatePipe } from '@angular/common';
import { NoticeNetWork } from "./../../../../network/notice.network";
import { Component } from "@angular/core";
import { IonicPage, AlertController, NavController } from "ionic-angular";
// import { Geolocation } from "@ionic-native/geolocation/ngx";

@IonicPage({
  name: "app-home-edit-announcement"
})
@Component({
  templateUrl: "editAnnouncement.html",
  selector: "editAnnouncement.ts"
})

// todo 复用
export class EditAnnouncement {
  title: String = "";
  content: String = "";
  reciverList = [];
  constructor(
    public alert: AlertController,
    public navCtr: NavController,
    // private geolocation: Geolocation,
    private notiNetWork: NoticeNetWork,
    private datePipe: DatePipe,
    public toast: ToastService,
  ) {

  }

  addNewReciver() {
    const prompt = this.alert.create({
      title: "收件人",
      message: "",
      inputs: [
        {
          name: "user",
          type: "user",
          placeholder: "请输入用户名称"
        }
      ],
      buttons: [
        {
          text: "取消",
        },
        {
          text: "保存",
          handler: data => {
            this.reciverList.push(data.user);
          }
        }
      ]
    });
    prompt.present();
  }

  addPicture() {
    // this.geolocation
    //   .getCurrentPosition()
    //   .then(resp => {
    //     resp.coords.latitude;
    //     resp.coords.longitude;

    //     const prompt = this.alert.create({
    //       title: "请求成功",
    //       message: resp.coords.latitude + ", " + resp.coords.longitude
    //     });

    //     prompt.present();
    //   })
    //   .catch(error => {
    //     const prompt = this.alert.create({
    //       title: "请求失败",
    //       message: error
    //     });

    //     prompt.present();
    //     console.log("Error getting location", error);
    //   });
  }

  sendAnnounceMent() {
    if (this.title.length < 1 && this.content.length < 1) {
      this.toast.show("请完善内容");
      return;
    }
    this.notiNetWork.saveNewNotice({
      "ggbt": this.title,
      "nr": this.content
    }).subscribe((data: any) => {
      console.log(data)
      if (data.status == 0) {
        this.toast.show("发布成功");
        this.navCtr.pop()
      }
    }, error => {
      console.log(error)
    })
  }
}
