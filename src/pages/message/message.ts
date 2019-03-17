
import { NavController, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { ChatNetwork } from '../../network/chat.network';
import { Subscription } from 'rxjs/Subscription';
import { extend, pick } from 'lodash';
import { getTimeStrForChatList } from '../../service/utils.service';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { HTTP_URL } from '../../network/http';

export interface ChatListItem {
  createTime: string;
  id: number;
  lastTime: string;
  lastTimeStr: string;//转化的时间
  targetCode: string;//对象编号,即第三方平台的userId或groupId
  targetId: number;//对象唯一标识, 用户唯一标识或组唯一标识
  targetName: string;//对象姓名, 用户姓名或group名称
  photo: string;
  type: number;//类型（1：单聊，2：群聊）
  userCode: string;//用户编号, 即第三方平台的userId, 本地系统的职工编号
  userId: number;//用户唯一标识
  userName: number;//用户姓名, 即第三方平台的userName
}
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  subscription: Subscription;
  chatList: ChatListItem[];

  constructor(
    public navCtrl: NavController,
    public chatNetwork: ChatNetwork,
    public storage: StorageService
  ) {
    this.chatList = [];
    this.subscription = null;
  }

  ionViewDidLoad() {
    this.subscription = (WebIMObserve).subscribe({
      next: (data) => {
        console.log('message.ts on get xiaoxi==', data);
      }
    });
  }

  ionViewWillEnter() {
    console.log('message.ts ionViewWillEnter');

    this.chatNetwork.getChatList({
      currPageNo: 1,
      pageSize: 100
    }).subscribe((data: any) => {
      if (!data || !data.result || data.status) {
        return;
      }
      let chatList = data.result.ChatSession || [];
      this.chatList = chatList.map(item => {
        return extend({}, item, { lastTimeStr: getTimeStrForChatList(item.lastTime), photoItem: (item.photo ? `${HTTP_URL.IMAGE}/${item.photo}` : 'assets/imgs/image-default.png') });
      });
      console.log(this.chatList);

    });
  }

  ionViewWillUnload() {
    this.subscription && this.subscription.unsubscribe();
    this.subscription = null;
  }

  goToChat(chatItem: ChatListItem) {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);

    let info = pick(
      chatItem,
      ['targetId', 'targetCode', 'targetName', 'type', 'userCode', 'userId', 'userName']
    );
    info.targetImage = chatItem.photo;
    info.userImage = userInfo.photo;

    this.navCtrl.push('app-message-chat', info);
  }

  showImage = (src?: string) => {
    src = src || 'assets/imgs/image-default.png';
    var dom = document.createElement('div');
    dom.className = 'webim-img-expand';
    dom.onclick = function () {
      document.body.removeChild(dom);
    };
    dom.innerHTML = `<img src="${src}" />`;
    document.body.appendChild(dom);
  }
}