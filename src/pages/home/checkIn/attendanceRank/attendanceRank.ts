import { CheckNetwork } from './../../../../network/check.network';
import { Component } from "@angular/core";
import { NavParams, IonicPage } from "ionic-angular";
import { formatDate } from "../../../../network/http";
import { HTTP_URL } from "../../../../network/http";

@IonicPage({
    name: "app-home-attendance-rank",
})

@Component({
  templateUrl: "attendanceRank.html",
  selector: "attendanceRank.ts"
})

export class AttendanceRank {
    items;
    constructor(params: NavParams, public checkNetwork: CheckNetwork) {
        this.checkNetwork.getRankList({
          startDate: "2019-01-01",
          endDate: formatDate(new Date(), "yyyy-MM-dd"),
        }).subscribe(
          (data: any) => {
            console.log(data);
            if (data) {
                this.items = data.map(item => {
                  item.image = HTTP_URL.MAIN + "/images/" + item.photo;
                  return item;
                })
            }
          },
          error => {
            console.log(error);
          }
        );
    }
}
