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
  getSalaryDetails(data) {
    return this.http.postForm('/app/salary/getSalaryDetail', data);
  }
}
