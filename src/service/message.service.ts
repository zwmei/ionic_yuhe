import { Injectable } from "@angular/core";
import { AlertController, Alert } from "ionic-angular";

@Injectable()
export class MessageService {
  constructor(public alertCtrl: AlertController) {

  }
  alert: Alert = null;

  show(opt?: any): void {
    this.alert = this.alertCtrl.create({
      title: opt.title || '消息',
      subTitle: opt.subTitle || '消息提示',
      buttons: [opt.okText || '好的']
    });
    this.alert.present();
  }
  hide(): void {
    if (this.alert)
      this.alert.dismiss();
  }
}