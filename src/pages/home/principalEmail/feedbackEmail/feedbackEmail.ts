import { GallaryService } from './../../../../service/gallary.service';
import { ToastService } from "./../../../../service/toast.service";
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
    public navCtrl: NavController,
    public gallaryService: GallaryService,
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

    if (this.feedbackData.content.length > 900) {
      this.toast.show("事由超长，请保持在900个字符以内");
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

  showPhotos(pictures, pictureIndex){
    if(!pictures || pictures.length === 0){
      return;
    }

    let prevPictures = pictures.slice(0, pictureIndex);//截出当前图片之前的图片
    let nextPictures = pictures.slice(pictureIndex, pictures.length);//当前图片应该在第一个
    let newPictures = nextPictures.concat(prevPictures);//重新组合最新的图片序列
    this.gallaryService.photoViews(newPictures);

    // photoData = photoData || 'assets/imgs/img-default.png';
    // this.gallaryService.photoViews(photoData,'');
  }
}
