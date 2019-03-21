import { uniq } from 'lodash';
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { StorageService, STORAGE_KEY } from '../../../service/storage.service';
import { ChatNetwork } from '../../../network/chat.network';

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
    public storage: StorageService,
    public chatNetwork: ChatNetwork
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
  sendGroupMessage() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    let memberIds = [2, 63, 64, 65];
    memberIds.push(userInfo.id);
    this.chatNetwork.createGroup({
      groupName: '五人组',
      desc: '这是一个最好的时代，也是最坏的时代。',
      memberIds: uniq(memberIds)
    }).subscribe(data => {
      console.log(data);
    });
  }
}