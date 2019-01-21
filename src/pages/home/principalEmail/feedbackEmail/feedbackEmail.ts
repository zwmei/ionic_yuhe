import { isDate } from 'lodash';
import { EmailNetwork } from "./../../../../network/email.network";
import { Component } from "@angular/core";
import { NavParams, IonicPage } from "ionic-angular";

@IonicPage({
  name: "app-home-feedbak-email"
})
@Component({
  templateUrl: "feedbackEmail.html",
  selector: "feedbackEmail.ts"
})
export class FeedbackEmail {
  item;
  emailData: any = {};
  constructor(params: NavParams, public emailNetwork: EmailNetwork) {
    this.item = params.data;
    this.emailNetwork.getEmailDetails({
      mailId: this.item.id,
    }).subscribe((data: any) => {
      console.log('-----', data);
      if (data) {
        this.emailData = data;
      }
    }, error => {
      console.log(error)
    })
  }
  sendFeedback() {}
}
