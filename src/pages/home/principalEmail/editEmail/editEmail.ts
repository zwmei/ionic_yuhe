import { ToastService } from "./../../../../service/toast.service";
import { EmailNetwork } from "./../../../../network/email.network";
import { Component } from "@angular/core";
import { HTTP_URL } from "../../../../network/http";

import {
  IonicPage,
  AlertController,
  ActionSheetController,
  NavController
} from "ionic-angular";

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
  emailData: any = {};
  reciverList = [];
  emailsPersons: any = [];
  selectedPerson: any = {};
  images = [];
  photos= [];
  constructor(
    public alert: AlertController,
    public emailNetwork: EmailNetwork,
    public actionSheet: ActionSheetController,
    public toast: ToastService,
    public navCtrl: NavController,
  ) {}

  addNewReciver() {
    if (this.emailsPersons.length > 0) {
      this.showSelectPersonAlert();
    } else {
      this.emailNetwork.getEmailPersonList().subscribe(
        (data: any) => {
          console.log(data);
          this.emailsPersons = data;
          this.showSelectPersonAlert();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /// 审批人
  showSelectPersonAlert() {
    var buttons = this.emailsPersons.map(item => {
      return {
        text: item.zgxm,
        handler: () => {
          this.selectedPerson.zgxm = item.zgxm;
          this.selectedPerson.id = item.id;
        }
      };
    });
    const actionSheet = this.actionSheet.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  sendAnnounceMent() {
    if (!this.emailData.title || !this.emailData.content) {
      this.toast.show("请完善标题和内容");
      return;
    }
    if (this.emailData.title.length > 25) {
      this.toast.show("主题超长，请保持在25个字符以内");
      return;
    }

    if (this.emailData.content.length > 125) {
      this.toast.show("内容超长，请保持在125个字符以内");
      return;
    }

    if (!this.selectedPerson.id) {
      this.toast.show("请选择通知人");
      return;
    }

    this.emailData.readerId = this.selectedPerson.id;
    this.emailData.fileNames = this.images.join(',');

    this.emailNetwork.saveAndSendEmail(this.emailData).subscribe(
      (data: any) => {
        console.log("-----", data);
        if (data) {
          this.toast.show("发送成功");
          this.navCtrl.pop();
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  deletePhoto(index) {
    this.photos.splice(index, 1);
    this.images.splice(index, 1);
  }
  changeFileName(fileName) {
    this.images.push(fileName);
    this.photos.push(HTTP_URL.MAIN + "/images/" + fileName);
  }
}
