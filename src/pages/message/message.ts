
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ChatNetwork } from '../../network/chat.network';

export interface ChatListItem {
  createTime: string;
  id: number;
  lastTime: string;
  targetCode: string;//对象编号,即第三方平台的userId或groupId
  targetId: number;//对象唯一标识, 用户唯一标识或组唯一标识
  targetName: string;//对象姓名, 用户姓名或group名称
  type: number;//类型（1：单聊，2：群聊）
  userCode: string;//用户编号, 即第三方平台的userId, 本地系统的职工编号
  userId: number;//用户唯一标识
  userName: number;//用户姓名, 即第三方平台的userName
}
export interface MSG {
  data: string;//"11abcdefg"
  delay: string;//"2019-03-13T08:16:51.663Z"
  error: Boolean;//false
  errorCode: string;//""
  errorText: string;//""
  ext: object;//{}
  from: string;//"1001"
  id: string;//"579391997249325072"
  sourceMsg: string;//"11abcdefg"
  to: string;//"1001"
  type: string;//"chat"
}

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  chatList: ChatListItem[];

  constructor(
    public navCtrl: NavController,
    public chatNetwork: ChatNetwork,
  ) {
    this.chatList = [];
  }

  ionViewDidLoad() {
    (WebIMObserve).subscribe({
      next: (data) => {
        console.log('message.ts on get xiaoxi==', data);
      }
    })

    this.chatNetwork.getChatList({
      currPageNo: 1,
      pageSize: 100
    }).subscribe((data: any) => {
      if (!data || !data.result || data.status) {
        return;
      }
      let chatList = data.result.ChatSession || [];



      console.log('getChatList', data);
    });
    this.chatNetwork.getSingleChatHistory({
      currPageNo: 1,
      pageSize: 100,
      targetType: 1,
      targetId: 2
    }).subscribe(data => {
      console.log('getSingleChatHistory', data);
    });

    this.chatNetwork.sendText({
      targetId: 1,
      targetType: 1,
      msg: 'abcdefg'
    }).subscribe(data => {
      console.log('sendText', data);
    });
  }

  ionViewWillEnter() {
    console.log('message.ts ionViewWillEnter');
  }

}