import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  show(text) {
    const toast = this.toastCtrl.create({
      message: text || 'toast',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}