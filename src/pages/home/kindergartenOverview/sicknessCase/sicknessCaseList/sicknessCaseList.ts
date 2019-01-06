import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { KindergartenOverviewNetwork } from '../../../../../network/kindergartenOverview.network';

@IonicPage({
  name: 'app-home-sickness-case-list'
})
@Component({
  templateUrl: 'sicknessCaseList.html'
})
export class SicknessCaseListPage {
  list: any[];
  totalCount: number;
  constructor(
    public navParams: NavParams,
    public kindergartenOverviewNetwork: KindergartenOverviewNetwork
  ) {

    console.log(this.navParams);
    this.totalCount = 0;
    this.list = [];
    this.getCategoryList(this.navParams.data);
  }

  getCategoryList = (params: any) => {
    this.kindergartenOverviewNetwork.getOneSicknessCaseList(params)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status) {
          return;
        }
        let infos = {};
        data.forEach((item: any) => {
          if (!infos[item.className]) {
            infos[item.className] = [];
          }
          infos[item.className].push({
            name: item.xm
          });
        });

        this.totalCount=data.length;
        this.list = Object.keys(infos).map(key => {
          return {
            className: key,
            students: infos[key],
            count: infos[key].length
          }
        });
      });
  }

}
