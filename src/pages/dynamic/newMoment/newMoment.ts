import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HTTP_URL } from '../../../network/http';
import { ToastService } from '../../../service/toast.service';
import { DynamicNetwork } from '../../../network/dynamic.network';
import { LoadingService } from '../../../service/loading.service';

@IonicPage({
  name: 'app-contact-newMoment',
  segment: 'app-contact-newMoment'
})
@Component({
  selector: 'page-contact-newMoment',
  templateUrl: 'newMoment.html'
})
export class NewMomentPage {


  newMoment: any = {};
  images: any = [];
  photos: any = [];

  constructor(
    params: NavParams,
    private navCtrl: NavController, 
    private toastService: ToastService,
    private dynamicNetwork: DynamicNetwork,
    private loading: LoadingService) {
      

  }


  changeFileName(fileName) {
    this.images.push(fileName);
    this.photos.push(HTTP_URL.MAIN + "/images/" + fileName);
  }

  deletePhoto(index) {
    this.photos.splice(index, 1);
    this.images.splice(index, 1);
  }

  save(){
    if(!this.newMoment.content){
      this.toastService.show('说说你此刻的想法...');
    }
    
    this.newMoment.filePaths = this.images.join(',');
    console.log('new moment:', this.newMoment);

    this.loading.show();
    this.dynamicNetwork.saveMoment(this.newMoment)
    .subscribe(
      (data: any) => {
        console.log("-----", data);
        this.loading.hide();

        if (data) {
          this.toastService.show("保存成功");
          this.navCtrl.pop();
        }
      },
      error => {
        this.loading.hide();
        console.log(error);
        this.toastService.show('保存失败');
      }
    );

  }
}