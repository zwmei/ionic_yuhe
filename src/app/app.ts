import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ToastService } from '../service/toast.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  public backButtonPressed: boolean = false;
  public toastService: ToastService;

  // @ViewChild('rootNav') nav: Nav;//声明根组件(<ion-nav #myNav [root]="rootPage">)

  constructor(platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.show();

      if (platform.platforms().indexOf('ios') >= 0) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.styleDefault();
      }

      return;

      // platform.registerBackButtonAction(() => {

      //   return console.warn('按下退出键');


      //   // let activeVC = this.nav.getActive();
      //   // let page = activeVC.instance;
      //   // if (page.tabRef) {
      //   //   let activeNav = page.tabs.getSelected();
      //   //   if (!activeNav.canGoBack()) {
      //   //     return this.showExit(platform);
      //   //   }
      //   // }
      //   // if (page instanceof LoginPage) {//查看当前页面是否是登陆页面
      //   //   this.showExit(platform);
      //   //   return;
      //   // }
      // });
    });
  }

  showExit(platform: Platform) {
    return console.warn('马上要退出了');


    // if (this.backButtonPressed) {
    //   platform.exitApp();
    // } else {
    //   this.toastService.show('再按一次退出应用');
    //   this.backButtonPressed = true;
    //   setTimeout(() => {
    //     this.backButtonPressed = false;
    //   }, 2000);
    // }
  }
}

