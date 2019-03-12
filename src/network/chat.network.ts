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
  sendText(data: object) {
    return this.http.postForm('/app/chat/sendTextMsg', data); //targetType聊天对象类型（1：单人，2：群组）,targetId,msg:string
  }
  sendImage(data: object) {
    return this.http.postForm('/app/chat/sendPictureMsg', data); //targetType聊天对象类型（1：单人，2：群组）,targetId,msg:file
  }
  getChatList(data:object) { //获取聊天列表 {currPageNo,pageSize}
    return this.http.get('/app/chat/loadChatSessionListData',data);
  }
  getSingleChatHistory(data:object) { //获取某个聊天历史记录 {currPageNo,pageSize,targetType,targetId}
    return this.http.get('/app/chat/loadChatHistory',data);
  }
  createGroup(data: object) {
    return this.http.postForm('/app/chat/createGroup', data); //{groupName,desc,memberIds:int[]}
  }
  deleteGroup(data: object) {
    return this.http.postForm('/app/chat/deleteGroup', data); //{groupId}
  }
  addGroupMembers(data: object) {
    return this.http.postForm('/app/chat/addGroupMembers', data); //{groupId,newMemberIds:int[]}
  }
  deleteGroupMembers(data: object) {
    return this.http.postForm('/app/chat/deleteGroupMembers', data); //{groupId,delMemberIds:int[]}
  }
}
