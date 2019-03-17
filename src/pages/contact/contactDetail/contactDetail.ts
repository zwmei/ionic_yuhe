import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { StorageService, STORAGE_KEY } from '../../../service/storage.service';

@IonicPage({
  name: 'app-contact-contactDetail',
  segment: 'app-contact-contactDetail'
})
@Component({
  selector: 'page-contact-contactDetail',
  templateUrl: 'contactDetail.html'
})
export class ContactDetailPage {


  contact: any = {};


  constructor(
    public params: NavParams,
    public navCtrl: NavController,
    public storage: StorageService
  ) {
    this.contact = params.data.contact || {};
    console.log(params.data.contact);
  }

  sendMessage() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    this.navCtrl.push('app-message-chat',
      {
        targetId: this.contact.id,
        targetCode: this.contact.zggh,
        targetName: this.contact.zgxm,
        targetImage: this.contact.photo,
        type: 1,
        userCode: userInfo.zggh,
        userId: userInfo.id,
        userName: userInfo.zgxm,
        userImage: userInfo.photo
      }
    );
  }

}