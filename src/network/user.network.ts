import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserNetwork {

  constructor(private http: HttpNetwork) {
  }
  login(data) {
    return this.http.postForm('/app/login/signIn', data);
  }
  getSMSCode(data) {
    return this.http.postForm('/app/login/getSMSCode', data);
  }
  logout() {
    return this.http.postForm('/app/login/signOut');
  }
  modifyPassword(data) {
    return this.http.postForm('/app/login/modifyPassword', data);
  }
  resetPassword(data) {
    return this.http.postForm('/app/login/resetPassword', data);
  }
  getSalaryDetails(data) {
    return this.http.get('/app/salary/getSalaryDetail', data);
  }

  postData() {
    return this.http.postForm('/app/approval/application/postResignation', {
      "apply": JSON.stringify({ "billType": 4, "sqsj": "2018-12-31 00:00:00", "yjlzsj": "2018-12-31 00:00:00", "lzyy": "对对对" }),
      "spid": [21,22].join(','),
      "csid": [42,41].join(',')
    });
  }
}
