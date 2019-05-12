import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { UserNetwork } from '../../network/user.network';
import { ToastService } from '../../service/toast.service';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { LoadingService } from '../../service/loading.service';
import { HTTP_URL, getServerAddress } from '../../network/http';
import { isEmpty } from 'lodash';
import { TabPage } from '../tab/tab';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  isRememberPassword: Boolean = false;
  username = '';
  password = '';
  serverAddress = '';

  upStyle = { width: '20px', height: '20px' }
  imgSrc = "http://www.yuhe.insighthink.com/yh_YEManager/images/20190112163412478.png";


  constructor(
    // public navCtrl: NavController,
    private userNetwork: UserNetwork,
    private toastService: ToastService,
    private storage: StorageService,
    private app: App,
    private loading: LoadingService
  ) {
    this.serverAddress = this.storage.get(STORAGE_KEY.SERVER_ADDR) || '';
  }

  ionViewDidEnter() {
    WebIMConn && WebIMConn.close(); //退出WebIM

    let loginInfo = this.storage.get(STORAGE_KEY.LOGIN_INFO);
    if (loginInfo && typeof loginInfo === "object") {
      this.username = loginInfo.username;
      this.password = loginInfo.password;
      this.isRememberPassword = true;
    }
  }

  onRememberPassword(): void {
    console.log(this.isRememberPassword);
  }

  onLogin(): void {
    if (!this.username) {
      return this.toastService.show('请输入用户名');
    }
    if (!this.password) {
      return this.toastService.show('请输入密码');
    }

    this.loading.show();
    this.userNetwork.login({
      account: this.username,
      password: this.password
    }).subscribe((data: { status?: string }) => {
      this.loading.hide();
      console.log(data);
      if (data.status) {
        return;
      }
      this.storage.set(STORAGE_KEY.USER_INFO, data);

      if (this.isRememberPassword) {
        this.storage.set(STORAGE_KEY.LOGIN_INFO, { username: this.username, password: this.password });
      }
      else {
        this.storage.set(STORAGE_KEY.LOGIN_INFO, null);
      }

      let activeNav = this.app.getActiveNav();
      let manualLogout = this.storage.get(STORAGE_KEY.MANUAL_LOGOUT);
      if (!manualLogout && activeNav.canGoBack()) {
        activeNav.pop();
      }
      else {
        // this.navCtrl.push('app-tab', { id: 2 });
        activeNav.push('app-tab', { id: 2 });
      }

      this.storage.set(STORAGE_KEY.MANUAL_LOGOUT, false);
      // this.navCtrl.push('app-tab', { id: 2 });
      // this.navCtrl.push(TabPage, { id: 2 });
      // if (this.navCtrl.canGoBack()) {
      //   this.navCtrl.pop();
      // }
      // else {
      //   this.navCtrl.setRoot(TabPage, { id: 2 });
      // }
    }, err => {
      this.loading.hide();
    })
  }
  async onSmsCode() {
  }

  onForgetPassword() {
    this.app.getActiveNav().push('app-forget-password');
  }

  onChangeAddress(event, num) {
    console.log('event===', event, num);
    this.serverAddress = this.serverAddress || '';
    if (this.serverAddress.endsWith('/')) {
      this.serverAddress = this.serverAddress.slice(0, -1);
    }
    this.storage.set(STORAGE_KEY.SERVER_ADDR, this.serverAddress);
    HTTP_URL.MAIN = getServerAddress();

    this.toastService.show('修改成功');
  }

  changeFile(event) {
    console.log('file event1', event);

    let files = event.target.files;
    if (isEmpty(files)) {
      return;
    }
    let file = files[0];
    event.target.value = "";
    this.userNetwork.uploadFile(file).subscribe((a: any) => {
      this.toastService.show(a.result.fileName)
    });

  }
  changeFileName(fileName) {
    this.toastService.show('haha,' + fileName);
    this.imgSrc = 'http://www.yuhe.insighthink.com/yh_YEManager/images/' + fileName;
  }

}
