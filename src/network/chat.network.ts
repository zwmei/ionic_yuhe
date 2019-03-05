import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";
/**
 * 消息的网络请求
 *  
 * */

@Injectable()
export class ChatNetwork {

  constructor(private http: HttpNetwork) {
  }
  getChatKey() { //获取huanxin Appkey
    return this.http.get('/app/chat/getAppKey');
  }
  sendTextMessage(data: object) {
    return this.http.postForm('/app/chat/sendTextMsg', data); //targetType聊天对象类型（1：单人，2：群组）,targetId,msg
  }
}
