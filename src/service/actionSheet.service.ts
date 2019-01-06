import { Injectable } from "@angular/core";
import { ActionSheetController, ActionSheet } from "ionic-angular";


@Injectable()
export class ActionSheetService {
  constructor(public actionSheetCtrl: ActionSheetController) {

  }
  actionSheet: ActionSheet = null;

  show(opt?: any): void {
    let buttons = [
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];

    this.actionSheet = this.actionSheetCtrl.create({
      title: opt.title || '消息',
      buttons: opt.buttons||buttons
    });
    this.actionSheet.present();
  }
  hide(): void {
    if (this.actionSheet)
      this.actionSheet.dismiss();
  }
}