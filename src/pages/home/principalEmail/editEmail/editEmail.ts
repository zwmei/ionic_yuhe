import { Component } from "@angular/core";
import { NavParams, IonicPage, AlertController } from "ionic-angular";

@IonicPage({
  name: "app-home-edit-email"
})
@Component({
  templateUrl: "editEmail.html",
  selector: "editEmail.ts"
})

// todo 复用
export class EditEmail {
  // 0 通知， 1 邮件
  type;
  title;
  content;
  reciverList = [];
  constructor(params: NavParams, public alert: AlertController) {
    this.type = params.data.type;
  }

  addNewReciver() {

    const prompt = this.alert.create({
      title: "收件人",
      message: "",
      inputs: [
        {
          name: "email",
          type: "email",
          placeholder: "请输入邮箱"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            this.reciverList.push(data.email);
          }
        }
      ]
    });
    prompt.present();
  }

  addPicture() {

  }

  sendAnnounceMent() {
      
  }
}
