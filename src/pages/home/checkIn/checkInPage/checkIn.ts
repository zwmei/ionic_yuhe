import { ToastService } from './../../../../service/toast.service';
// import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { setInterval } from "timers";
import { CheckNetwork } from "../../../../network/check.network";
import { HTTP_URL } from "../../../../network/http";
import {
  StorageService,
  STORAGE_KEY
} from "../../../../service/storage.service";
import { formatDate } from "../../../../network/http";


@IonicPage({
  name: "app-home-checkIn"
})
@Component({
  templateUrl: "checkIn.html",
  selector: "checkIn.ts"
})
export class CheckInPage {
  user;
  companyLocation = [];
  userLocation = [];
  today: any = Date.now(); //或者today:any = new Date();
  timer: any;
  isChenckIn: boolean = true;
  checkData: any = {};
  timeData: any = {};

  constructor(
    params: NavParams,
    public nav: NavController,
    public checkNetWork: CheckNetwork,
    private storage: StorageService,
    // public datePipe: DatePipe
    public toast: ToastService,
  ) {
    console.warn(
      "hshdfhashdfhsa======",
      this.storage.get(STORAGE_KEY.USER_INFO)
    );
    let loginInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    console.log(loginInfo);
    this.user = {
      name: loginInfo.zgxm,
      team: "考勤组：技术部",
      image: HTTP_URL.MAIN + '/images/' +  loginInfo.photo,
    };

    let middle = new Date(formatDate(new Date(), "yyyy-MM-dd") + " 12:00:00");
    console.log('middle:', middle);
    let now = new Date();
    if (now.getTime() - middle.getTime() > 0) {
      //pm
      this.isChenckIn = false;
    }

    this.timer = setInterval(() => {
      this.today = Date.now(); // 或者this.today = new Date();
    }, 1000);
  }

  ionViewDidEnter() {
    this.checkNetWork.getCompanyLocation().subscribe(
      (data: any) => {
        console.log(data);
        if (data) {
          this.companyLocation = [data.latitude, data.longitude];
        }
      },
      error => {
        console.log(error);
      }
    );

    this.checkNetWork.getDayReport({
      checkDate: formatDate(new Date(), "yyyy-MM-dd")
      // checkDate: "2019-1-1"
    }).subscribe(
      (data: any) => {
        if (data.length > 0) {
          console.log(data[0]);
          this.checkData = data[0];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  attendanceRecord() {
    this.nav.push("app-home-attendanceReport");
  }
  checkInClick() {
    if (this.companyLocation.length < 2) {
      return;
    }
    if (this.isChenckIn) {
      this.checkNetWork
        .checkIn({
          latitude: this.companyLocation[0],
          longitude: this.companyLocation[1]
        })
        .subscribe(
          (data: any) => {
            console.log(data);
            if (data.status == 0) {
                this.checkData.sbjs = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
                this.toast.show('打卡成功');
            }
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.checkNetWork
        .checkOut({
          latitude: this.companyLocation[0],
          longitude: this.companyLocation[1]
        })
        .subscribe(
          (data: any) => {
            console.log(data);
            if (data.status == 0) {
                this.checkData.xbsj = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
                this.toast.show('打卡成功');
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  reloadLocation() {}
}
