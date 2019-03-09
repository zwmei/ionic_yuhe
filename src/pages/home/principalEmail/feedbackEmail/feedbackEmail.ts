import { ToastService } from "./../../../../service/toast.service";
import { isDate } from "lodash";
import { EmailNetwork } from "./../../../../network/email.network";
import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { HTTP_URL } from "../../../../network/http";

@IonicPage({
  name: "app-home-feedbak-email"
})
@Component({
  templateUrl: "feedbackEmail.html",
  selector: "feedbackEmail.ts"
})
export class FeedbackEmail {
  params: any = {};
  emailData: any = {};
  feedbackData: any = {};
  constructor(
    params: NavParams,
    public emailNetwork: EmailNetwork,
    public toast: ToastService,
    public navCtrl: NavController
  ) {
    this.params = params.data;
    this.emailNetwork
      .getEmailDetails({
        mailId: this.params.id
      })
      .subscribe(
        (data: any) => {
          console.log("-----", data);
          if (data) {
            if (data.senderPicturePath) {
              data.image = HTTP_URL.MAIN + "/images/" + data.senderPicturePath;
            }
            if (data.replyMails) {
              data.replyMails = data.replyMails.map(item => {
                item.image = HTTP_URL.MAIN + '/images/' + item.senderPicturePath;
                data.replyTime = item.sendTime;
                return item;
              })
            }
            if (data.leaderMailFiles) {
              data.images = data.leaderMailFiles.map(item => {
                return HTTP_URL.MAIN + '/images/' + item.filePath
              })
            }
            console.log("-----", data);
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
        replyMailId: this.params.id,
        title: "院长回复",
        content: this.feedbackData.content
      })
      .subscribe(
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

  goToBigPicture(url) {
    this.navCtrl.push('app-home-big-picture', url);
    return;
  }
}
