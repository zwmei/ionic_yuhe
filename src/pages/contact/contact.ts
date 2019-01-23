import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP_URL } from '../../network/http';
import { STORAGE_KEY, StorageService } from '../../service/storage.service';
import { ContactNetwork } from '../../network/contact.network';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts = [];
  user : any = {};
  searchText: string = '';
  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private toastService: ToastService,
    private contactNetwork: ContactNetwork) {
      this.loadUserInfo();
      this.loadContacts();
    }

  loadUserInfo() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    if (userInfo && typeof userInfo === "object") {
      this.user.mobile = userInfo.lxdh;
    }
  }

  loadContacts(){
    this.contactNetwork.getAllContacts({})
    .subscribe((list: {xgxm: string, photo: string, lxdh: string, id: string})=>{
      if(Array.isArray(list) && list.length > 0){
        this.contacts = list.map(item=>{
          return {
            name: item.zgxm,
            image: HTTP_URL.MAIN + '/images/' + item.photo,
            id: item.id,
            mobileNumber: item.lxdh
          };
        });
      }

    }, err=>{
      console.error(err);
      this.toastService.show('获取联系人失败！');
    });
  }
 
  onSearch(e): void {
    console.log(e, this.searchText);
  }
  onClearSearchText(e): void {
    console.log('cancel', e, this.searchText);
  }
  
}