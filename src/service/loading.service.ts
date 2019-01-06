import { Injectable } from "@angular/core";
import { LoadingController, Loading } from "ionic-angular";

@Injectable()
export class LoadingService {
  constructor(public loadingCtrl: LoadingController) {

  }
  loading: Loading = null;

  show(opt?: any): void {
    opt = opt || {};
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: opt.content || 'Waiting',
      dismissOnPageChange: true,
      enableBackdropDismiss: true
    });
    this.loading.present();
  }
  hide(): void {
    if (this.loading)
      this.loading.dismiss();
  }


}