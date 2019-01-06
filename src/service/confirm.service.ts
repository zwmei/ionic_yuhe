import { Injectable } from "@angular/core";
import { AlertController, Alert } from "ionic-angular";
import {extend} from "lodash";


@Injectable()
export class ConfirmService {
  constructor(public alertCtrl: AlertController) {

  }
  alert: Alert = null;

  show(opt?: any): void {
    let buttons = [
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '确定',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ];

    extend(buttons[0], opt.buttons[0]);
    extend(buttons[1], opt.buttons[1]);

    this.alert = this.alertCtrl.create({
      title: opt.title || '消息',
      message: opt.subTitle || '消息提示',
      buttons: buttons
    });
    this.alert.present();
  }
  hide(): void {
    if (this.alert)
      this.alert.dismiss();
  }
}