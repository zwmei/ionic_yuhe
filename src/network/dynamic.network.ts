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

}
