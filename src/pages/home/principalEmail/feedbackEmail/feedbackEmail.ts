import { ToastService } from "./../../../../service/toast.service";
import { isDate } from "lodash";
import { EmailNetwork } from "./../../../../network/email.network";
import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";

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
  feedbackData: any = {};
  constructor(
    params: NavParams,
    public emailNetwork: EmailNetwork,
    public toast: ToastService,
    public navCtrl: NavController
  ) {
    this.item = params.data;
    this.emailNetwork
      .getEmailDetails({
        mailId: this.item.id
      })
      .subscribe(
        (data: any) => {
          console.log("-----", data);
          if (data) {
            this.emailData = data;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  sendFeedback() {
    if (!this.feedbackData.content) {
      this.toast.show("请完善申请内容");
      return;
    }

    if (this.feedbackData.content.length > 100) {
      this.toast.show("事由超长，请保持在100个字符以内");
      return;
    }

    this.emailNetwork
      .feedbackEmail({
        replyMailId: this.item.id,
        title: '回复',
        content: this.feedbackData.content
      }).subscribe(
        (data: any) => {
          console.log("-----", data);
          if (data) {
            this.toast.show("发送成功");
            this.navCtrl.pop();
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
