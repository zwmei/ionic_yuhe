import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class ContactNetwork {
  constructor(private http: HttpNetwork) {
  }
  getAllContacts(data) {
    return this.http.get('/app/addresslist/getAddressListData', data);
  }
}
