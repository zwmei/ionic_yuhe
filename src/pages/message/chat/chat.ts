import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChatNetwork } from '../../../network/chat.network';
import { getTimeStrForChatContent } from '../../../service/utils.service';
import { MessageContent, MessageType, MessageContentType } from '../../tab/tab';
import { HTTP_URL } from '../../../network/http';

interface SendTextInfo {
  msg: string;
  msgContentType: string;
  id: string;
  timeStr: string;
  senderName: string;
  senderId: string;
  image?: string;
}
@IonicPage({
  name: 'app-message-chat'
})
@Component({
  templateUrl: 'chat.html'
})
export class ChatPage {
  subscription: Subscription;
  params: any;
  inputText: string;
  contentList: any[];
  constructor(
    public elRef: ElementRef,
    public navCtrl: NavController,
    private navParams: NavParams,
    public chatNetwork: ChatNetwork,
  ) {
    this.subscription = null;
    this.params = this.navParams.data || {}; //['targetId', 'targetCode', 'targetName','targetImage','type', 'userCode', 'userId', 'userName','userImage']
    this.inputText = '';
    this.contentList = [];
  }
  ionViewDidLoad() {
    this.subscribe();
  }
  ionViewWillUnload() {
    this.subscription && this.subscription.unsubscribe();
    this.subscription = null;
    console.warn('chat.ts unload');
  }
  ionViewWillEnter() {
    this.subscribe();
    this.chatNetwork.getSingleChatHistory({
      currPageNo: 1,
      pageSize: 100,
      targetType: 1,
      targetId: this.params.targetId
    }).subscribe((data: any) => {
      console.log('getSingleChatHistory', data);
      if (!data || data.status || !data.result) {
        return;
      }
      this.contentList = (data.result.MessageHistory || []).reverse().map(
        (item: any, index: any) => this.convertItem(item, index)
      );

      this.scrollToBottom();
    });
  }
  subscribe() {
    if (!this.subscription) {
      this.subscription = (WebIMObserve).subscribe({
        next: (data: MessageContent) => {
          console.log('%%ChatPage.ts on get xiaoxi==', data);
          if (data.targetCode == this.params.userCode
            && data.userCode == this.params.targetCode
          ) { //目标是自己, 发送者是对方
            if (data.msgType == MessageType.Text || data.msgType == MessageType.Image) {
              this.insertMsg({
                id: Date.now().toString(16),
                msg: data.msg,
                msgContentType: data.msgContentType,
                senderId: this.params.targetId,
                senderName: this.params.targetName,
                timeStr: getTimeStrForChatContent(data.timeStr),
                image: this.getImageUrl(this.params.targetImage)
              });
            }
          }
        }
      });
    }
  }
  convertItem(item: any, index: any) {
    return this.createMessage({
      id: item.id,
      msg: item.msgContent,
      msgContentType: item.msgType || MessageContentType.Text,
      senderId: item.userId,
      senderName: item.userName,
      timeStr: getTimeStrForChatContent(item.msgTime),
      image: this.getImageUrl(item.userId == this.params.userId ? this.params.userImage : this.params.targetImage)
    });
  }
  insertMsg(item: SendTextInfo) {
    this.contentList.push(this.createMessage(item));
    this.scrollToBottom();
  }
  createMessage(item: SendTextInfo) {
    return item.msgContentType == MessageContentType.Text ? this.createTextMsg(item) : this.createImageMsg(item);
  }
  createTextMsg(item: SendTextInfo) {
    item.msg = item.msg.replace(/(↵|\r|\n|\r\n)/g, '<br/>');

    if (item.senderId == this.params.userId) {
      return `<div class="chat-info-item right" style="display:flex; justify-content: flex-end; margin-left: auto;">
        <div class="info" style="margin-right:10px;">
          <p class="info-top">
            <span style="margin-right:10px;">${item.senderName}</span>
            <span>${item.timeStr}</span>
          </p>
          <p class="info-bottom">
            <span style="word-break: break-all;">${item.msg}</span>
          </p>          
        </div>
        <img  onerror="this.src='assets/imgs/image-default.png'" src="${item.image || 'assets/imgs/image-default.png'}" style="width:40px;height:40px;" />
      </div>`;
    }
    else {
      return `<div class="chat-info-item left" style="display:flex; justify-content: flex-start; margin-right: auto;">
       <img onerror="this.src='assets/imgs/image-default.png'" src="${item.image || 'assets/imgs/image-default.png'}" style="width:40px;height:40px;margin-right:10px;" />
        
        <div class="info">
          <p class="info-top">
            <span style="margin-right:10px;">${item.senderName}</span>
            <span>${item.timeStr}</span>
          </p>
          <p class="info-bottom">
            <span style="word-break: break-all;">${item.msg}</span>
          </p>          
        </div>
      </div>`;
    }
  }
  createImageMsg(item: SendTextInfo) {
    if (item.senderId == this.params.userId) {
      return `<div class="chat-info-item right" style="display:flex; justify-content: flex-end; margin-left: auto;">
        <div class="info" style="margin-right:10px;">
          <p class="info-top">
            <span style="margin-right:10px;">${item.senderName}</span>
            <span>${item.timeStr}</span>
          </p>
          <p class="info-bottom" style="text-align:center">
            <img src="${HTTP_URL.IMAGE}${item.msg}" alt="加载失败" style="max-height:90px; onclick="alert('dds')"/>
          </p>          
        </div>
        <img  onerror="this.src='assets/imgs/image-default.png'" src="${item.image || 'assets/imgs/image-default.png'}" style="width:40px;height:40px;" />
      </div>`;
    }
    else {
      return `<div class="chat-info-item left" style="display:flex; justify-content: flex-start; margin-right: auto;">
       <img onerror="this.src='assets/imgs/image-default.png'" src="${item.image || 'assets/imgs/image-default.png'}" style="width:40px;height:40px;margin-right:10px;" />
        
        <div class="info">
          <p class="info-top">
            <span style="margin-right:10px;">${item.senderName}</span>
            <span>${item.timeStr}</span>
          </p>
          <p class="info-bottom" style="text-align:center">
            <img src="${HTTP_URL.IMAGE}${item.msg}" alt="加载失败" style="max-height:90px; onclick="alert('dds')"/>
          </p>          
        </div>
      </div>`;
    }
  }
  scrollToBottom() {
    setTimeout(() => {
      let a = document.getElementById('chatContentListId');
      a.scrollTop = a.scrollHeight;
    }, 10);
  }
  showImage(evt){
    console.log(evt);
    if (evt.target && evt.target.nodeName == "IMG") {
      var dom = document.createElement('div');
      dom.className = 'webim-img-expand';
      dom.onclick = function () {
        document.body.removeChild(dom);
      };
      dom.innerHTML = `<img src="${evt.target.src}" />`;
      document.body.appendChild(dom);
    }
  }

  goToParent() {
    this.navCtrl.push('app-tab', { id: 0 });
  }
  clickImage() {
    console.log('clickImage');
    document.getElementById('chat-image-input').click();
  }
  onChangeImage(e) {
    let file = e.target.files[0];
    e.target.value = '';

    console.log(file);

    this.sendImage(file);
  }
  sendText() {
    let inputText = (this.inputText || '').trim();
    if (!inputText) {
      return;
    }
    console.warn('sendText', inputText);
    this.inputText = '';
    document.getElementById('chat-textarea-input').focus();

    this.chatNetwork.sendText({
      targetId: this.params.targetId,
      targetType: this.params.type,
      msg: inputText
    }).subscribe((data: any) => {
      console.log('chat text', data);
      //插入数据啦
      if (!data || !data.result || data.status) {
        return;
      }
      this.insertMsg({
        id: data.result.messageId,
        timeStr: getTimeStrForChatContent(data.result.messageTime),
        msg: inputText,
        msgContentType: MessageContentType.Text,
        senderName: this.params.userName,
        senderId: this.params.userId,
        image: this.getImageUrl(this.params.userImage)
      });
    });
  }
  sendImage(file: File) {
    this.chatNetwork.uploadImage({
      targetId: this.params.targetId,
      targetType: 1,
      msg: file
    }).subscribe((data: any) => {
      console.log('chat image', data);
      //插入数据啦
      if (!data || !data.result || data.status) {
        return;
      }
      this.insertMsg({
        id: data.result.messageId,
        timeStr: getTimeStrForChatContent(data.result.messageTime),
        msg: data.result.message,
        msgContentType: MessageContentType.Image,
        senderName: this.params.userName,
        senderId: this.params.userId,
        image: this.getImageUrl(this.params.userImage)
      });
    });
  }
  getImageUrl(imageKey) {
    if (!imageKey) {
      return 'assets/imgs/image-default.png';
    }
    return `${HTTP_URL.IMAGE}/${imageKey}`;
  }
}
