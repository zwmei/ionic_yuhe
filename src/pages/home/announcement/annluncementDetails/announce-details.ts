import { NoticeNetWork } from './../../../../network/notice.network';
import { Component } from "@angular/core";
import { NavParams, IonicPage, AlertController, NavController } from "ionic-angular";
import { HTTP_URL } from "../../../../network/http";

@IonicPage({
    name: "app-home-announce-details",
})


@Component({
  templateUrl: "announce-details.html",
  selector: "announce-details.ts"
})

export class AnnounceDetails {
  item;
  isReadOpen = false;
  unReadOpen = false;

  unReadUsers: any = [];
  readUsers: any = [];
  noticeDetails = {};
  
  constructor(
    public alertController: AlertController, 
    params: NavParams,
    private notiNetWork: NoticeNetWork,
    private navCtr: NavController,
    ) {
    this.item = params.data;
    if (this.item.isRead === 'true') {
      this.notiNetWork.getReadNoticeDetails({id: this.item.id}).subscribe((data) => {
        console.log(data)
        this.noticeDetails = data;
      }, error => {
        console.log(error)
      })
    } else {
      this.notiNetWork.getUnReadNoticeDetails({id: this.item.id}).subscribe((data) => {
        console.log(data)
        this.noticeDetails = data;
      }, error => {
        console.log(error)
      })
    }

    this.notiNetWork.getReadPersonList({id: this.item.id}).subscribe((data: Array<any>) => {
      console.log(data)
      this.readUsers = data.map((user) => {
        user.image = HTTP_URL.MAIN + '/images/' + user.photo;
        return user;
      });
    }, error => {
      console.log(error)
    })

    this.notiNetWork.getUnReadPersonList({id: this.item.id}).subscribe((data: Array<any>) => {
      console.log(data)
      this.unReadUsers = data.map((user) => {
        user.image = HTTP_URL.MAIN + '/images/' + user.photo;
        return user;
      });;
    }, error => {
      console.log(error)
    })
  }

  //TODO: 接口不通
  presentAlertConfirm() {
    const alert =  this.alertController.create({
      message: '确定提醒所有用户',
      buttons: [
        {
          text: '取消',
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
            this.notiNetWork.postNoticeForAllUsers({id: this.item.id}).subscribe((data: any) => {
              console.log(data)
              if (data.status == 0) {
                this.navCtr.pop();
              }
            }, error => {
              console.log(error)
            })
          }
        }
      ]
    });
   alert.present();
  }

  readOpenClick() {
    this.isReadOpen = !this.isReadOpen;
  }

  unReadOpenClick() {
    this.unReadOpen = !this.unReadOpen;
  }
}
