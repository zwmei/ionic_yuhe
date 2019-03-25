import { uniq } from 'lodash';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP_URL } from '../../network/http';
import { STORAGE_KEY, StorageService } from '../../service/storage.service';
import { ContactNetwork } from '../../network/contact.network';
import { ToastService } from '../../service/toast.service';
import { ChatNetwork } from '../../network/chat.network';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  showSelectUserModal: Boolean;
  groupName: String;

  contacts = [];
  user: any = {};
  searchText: string = '';
  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private toastService: ToastService,
    private chatNetwork: ChatNetwork,
    private contactNetwork: ContactNetwork) {
    this.loadUserInfo();
    this.loadContacts();
    this.showSelectUserModal = false;
    this.groupName = "";
  }

  loadUserInfo() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    if (userInfo && typeof userInfo === "object") {
      this.user.mobile = userInfo.lxdh;
    }
  }

  loadContacts() {
    this.contactNetwork.getAllContacts({ searchName: this.searchText || '' })
      .subscribe((list: { xgxm: string, photo: string, lxdh: string, id: string }) => {
        if (Array.isArray(list) && list.length > 0) {
          this.contacts = list.map(item => {
            return {
              name: item.zgxm,
              image: HTTP_URL.MAIN + '/images/' + item.photo,
              id: item.id,
              mobile: item.lxdh,
              zggh: item.zggh,
              zgxm: item.zgxm,
              photo: item.photo,
            };
          });
        } else {
          this.contacts = [];
        }

      }, err => {
        console.error(err);
        this.toastService.show('获取联系人失败！');
      });
  }

  onSearch(e): void {
    console.log('search');
    console.log(e, this.searchText);
    this.loadContacts();
  }
  onClearSearchText(e): void {
    console.log('cancel', e, this.searchText);
  }

  goToDetailPage(item): void {
    this.navCtrl.push('app-contact-contactDetail', { contact: item });
  }

  startGroupChat() {
    (this.contacts || []).forEach(c => c.selected = false);
    this.showSelectUserModal = true;
  }
  selectUser(user) {
    user.selected = !user.selected;
  }
  goGroupChat(isTrue: Boolean) {
    if (!isTrue) {
      return this.showSelectUserModal = false;
    }
    let users = this.contacts.filter(c => c.selected).map(c => ({
      id: c.id,
      code: c.zggh,
      name: c.zgxm,
      image: c.photo
    }));
    let userIds = users.map(c => c.id);
    if (userIds.length === 0) {
      return this.toastService.show('请选择人员');
    }
    if (!this.groupName) {
      return this.toastService.show('请输入群聊名称');
    }
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    userIds.push(userInfo.id);
    userIds = uniq(userIds);

    if (userIds.length === 1) {
      return this.toastService.show('请选择其他人员');
    }
    this.showSelectUserModal = false;

    this.chatNetwork.createGroup({
      groupName: this.groupName,
      desc: '',
      memberIds: userIds.join(',')
    }).subscribe((data: any) => {
      console.warn(data);
      this.groupName = "";
      if (!data || data.status || !data.result) return;

      this.navCtrl.push('app-message-chat',
        {
          members: users,
          targetId: data.result.ChatGroup.id,
          targetCode: data.result.ChatGroup.groupCode,
          targetName: data.result.ChatGroup.groupName,
          type: 2,
          userCode: userInfo.zggh,
          userId: userInfo.id,
          userName: userInfo.zgxm,
          userImage: userInfo.photo
        }
      );
    });
  }

  ionViewWillEnter() {
    this.showSelectUserModal = false;
    this.groupName = "";
  }
}