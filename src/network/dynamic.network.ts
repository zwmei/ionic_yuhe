import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class DynamicNetwork {
  constructor(private http: HttpNetwork) {
  }
  saveMoment(data) {
    return this.http.postForm('/app/share/createShareContent', data);
  }

  getMoments(data) {
    return this.http.get('/app/share/getShareContentList', data);
  }

  likeMoment(data){
    return this.http.postForm('/app/share/createShareLikeComment', data);
  }

  cancelLikeMoment(data){
    return this.http.postForm('/app/share/removeShareLikeComment', data);
  }

  removeMoment(data){
    return this.http.postForm('/app/share/removeShareContent', data);
  }

  removeMomentComment(data){
    return this.http.postForm('/app/share/removeShareWordComment', data);
  }

  sendComment(data){
    return this.http.postForm('/app/share/createShareWordComment', data);
  }
}
