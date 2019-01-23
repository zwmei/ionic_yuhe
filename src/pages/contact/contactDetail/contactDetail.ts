import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'app-contact-contactDetail',
  segment: 'app-contact-contactDetail'
})
@Component({
  selector: 'page-contact-contactDetail',
  templateUrl: 'contactDetail.html'
})
export class ContactDetailPage {


  contact: any = {};


  constructor(
    params: NavParams) {
      this.contact = params.data.contact || {};
      console.log(params.data.contact);

  }

}