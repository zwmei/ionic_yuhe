import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { UserNetwork } from '../../network/user.network';
import { ToastService } from '../../service/toast.service';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { LoadingService } from '../../service/loading.service';
import { Geolocation } from '@ionic-native/geolocation';
import { Chooser } from '@ionic-native/chooser';
import { HTTP_URL, getServerAddress } from '../../network/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  isRememberPassword: Boolean = false;
  username = '';
  password = '';
  serverAddress = '';

  constructor(
    public geolocation: Geolocation,
    public chooser: Chooser,
    public navCtrl: NavController,
    private userNetwork: UserNetwork,
    private toastService: ToastService,
    private storage: StorageService,
    private loading: LoadingService,
    private app: App
  ) {
    this.serverAddress = this.storage.get(STORAGE_KEY.SERVER_ADDR) || '';
  }

  ionViewDidEnter() {
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
      if (this.isRememberPassword) {
        this.storage.set(STORAGE_KEY.LOGIN_INFO, { username: this.username, password: this.password });
      }
      else {
        this.storage.set(STORAGE_KEY.LOGIN_INFO, null);
      }

      this.storage.set(STORAGE_KEY.USER_INFO, data);

      this.navCtrl.push('app-tab', { id: 2 });
      // let nav = this.app.getRootNav();
      // if (nav.canGoBack()) {
      //   nav.pop();
      // }
      // else {
      //   nav.push('app-tab', { id: 2 });
      // }
    }, err => {
      this.loading.hide();
    })

  }
  async onSmsCode() {
    // this.geolocation.getCurrentPosition().then(res => {
    //   this.toastService.show(`成功定位,${res.coords.longitude},${res.coords.latitude}`);
    // }, err => {
    //   console.log(err);
    //   this.toastService.show('定位失败');
    // });
    // this.chooser.getFile('image/*')
    //   .then(file => {
    //     console.log('file', file);
    //     this.toastService.show(`file ok`);
    //   })
    //   .catch(err => {
    //     console.log('error', err);
    //     this.toastService.show('file error');
    //   })

    const file = await (<any>window).chooser.getFile();
    if (file.name) {
      console.log(file);
    }
    console.log('err', file);
  }

  onForgetPassword() {
    // this.userNetwork.postData().subscribe(data=>{console.log(data)}); //测试代码
    this.navCtrl.push('app-forget-password');
  }

  onChangeAddress() {
    this.serverAddress = this.serverAddress || '';
    if (this.serverAddress.endsWith('/')) {
      this.serverAddress = this.serverAddress.slice(0, -1);
    }
    this.storage.set(STORAGE_KEY.SERVER_ADDR, this.serverAddress);
    HTTP_URL.MAIN = getServerAddress();

    this.toastService.show('修改成功');
  }

}
