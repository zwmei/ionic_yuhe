import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class EmailNetwork {
  constructor(private http: HttpNetwork) {
  }
  // 保存
  saveAndSendEmail(data) {
    return this.http.postForm('/app/leadermail/sendLeaderMail', data);
  }
  // 查看
  getEmailDetails(data) {
    return this.http.get('/app/leadermail/readLeaderMail', data);
  }

  // 获取人员列表
  getEmailPersonList() {
    return this.http.get('/app/leadermail/getYzYhJzgjbxxList');
  }

  // 获取邮件
  getAllEmailList(data) {
    return this.http.get('/app/leadermail/getLeaderMailList', data);
  }

  // 获取邮件
  feedbackEmail(data) {
    return this.http.postForm('/app/leadermail/replyLeaderMail', data);
  }
}
