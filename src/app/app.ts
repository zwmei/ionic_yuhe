import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ToastService } from '../service/toast.service';
import { isEmpty } from 'lodash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  public backButtonPressed: boolean = false;
  public toastService: ToastService;

  // @ViewChild('rootNav') nav: Nav;//声明根组件(<ion-nav #myNav [root]="rootPage">)

  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    private app: App,
    splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.show();

      if (platform.platforms().indexOf('ios') >= 0) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.styleDefault();
      }

      platform.registerBackButtonAction(() => {
        let navs = this.app.getActiveNavs();
        if (isEmpty(navs)) return;

        let activeVC = navs[0].getActive();
        if (activeVC) {
          if (['TabPage', 'LoginPage', 'HomePage',
            'DynamicPage', 'ContactPage',
            'MePage', 'MessagePage'].indexOf(activeVC.name) >= 0) {
            return this.showExit(platform);
          }
        }
        if (navs[0].canGoBack()) {
          navs[0].pop();
        }
        else {
          this.showExit(platform);
        }
      });
    });
  }

  showExit(platform: Platform) {
    if (this.backButtonPressed) {
      platform.exitApp();
    } else {
      this.toastService.show('再按一次退出应用');
      this.backButtonPressed = true;
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000);
    }
  }
}

