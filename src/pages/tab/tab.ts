import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { DynamicPage } from '../dynamic/dynamic';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { MePage } from '../me/me';


@IonicPage({
  name: 'app-tab',
  segment: 'tab/:id',
  defaultHistory: ['app-tab']
})
@Component({
  templateUrl: 'tab.html'
})
export class TabPage {
  tabIndex = -1;
  tab1 = MessagePage;
  tab2 = DynamicPage;
  tab3 = HomePage;
  tab4 = ContactPage;
  tab5 = MePage;
  @ViewChild('mainTabs') tabRef: Tabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad', this.navParams);
    let tabIndex = parseInt(this.navParams.data.id);
    if (tabIndex !== this.tabIndex) {
      this.tabRef.select(tabIndex);
    }

  }
  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter', this.navParams);
  //   this.tabIndex = parseInt(this.navParams.data.id);
  //   this.tabRef.select(this.tabIndex);
  // }
}
