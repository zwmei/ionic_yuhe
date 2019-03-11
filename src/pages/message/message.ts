
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ChatNetwork } from '../../network/chat.network';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  constructor(
    public navCtrl: NavController,
    public chatNetwork: ChatNetwork,
    public storageService: StorageService
  ) {


  }

  ionViewDidLoad() {
    console.log('message.ts ionViewDidLoad WebIMObserve', WebIMObserve);

    (WebIMObserve).subscribe({
      next: (data) => {
        console.log('message.ts on get xiaoxi==', data);
      }
    })

  }

}