import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { LoadingService } from '../../service/loading.service';
import { ToastService } from '../../service/toast.service';
import { UserNetwork } from '../../network/user.network';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';

@IonicPage({
  name: 'app-forget-password',
  segment: 'app-forget-password'
})
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forgetPassword.html'
})
export class ForgetPasswordPage {
  timer = null;
  codeTime: number = 0; //读秒
  username: string = '';
  validCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isOnHttp = false;

  constructor(
    private loadingService: LoadingService,
    private toastService: ToastService,
    private userNetwork: UserNetwork,
    private storage: StorageService
  ) {
    this.codeTime = 0;
  }

  ionViewDidEnter() {
    // 获取本地数据
    this.codeTime = 0;
    let time = this.storage.get(STORAGE_KEY.GET_VALID_CODE_TIME);

    if (time > 0) {
      console.log(time, 2);
      time = Date.now() - time;
      if (time >= 0 && time <= (60 * 1000)) {
        this.codeTime = 60 - Math.ceil(time / 1000);
      }
    }
    if (this.codeTime > 0) {
      this.startTimer();
    }
  }

  ionViewWillLeave() {
    if (this.codeTime > 0) {
      this.storage.set(STORAGE_KEY.GET_VALID_CODE_TIME, Date.now() - (60 - this.codeTime) * 1000);
    }
    this.clearTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.codeTime--;
      if (this.codeTime === 0) {
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
    this.codeTime = 0;
  }
  onGetCode() {
      if (!this.username) {
      return this.toastService.show('请输入手机号');
    }
    if (this.codeTime) {
      return;
    }
    if (this.isOnHttp) {
      return;
    }
    this.isOnHttp = true;
    this.loadingService.show();
    this.userNetwork.getSMSCode({
      mobileNo: this.username
    }).subscribe((data: any) => {
      this.loadingService.hide();
      this.isOnHttp = false;
      if (data.status) {
        return this.toastService.show(data.message || '获取验证码失败');
      }
      this.validCode = data.result.code;
      this.toastService.show('获取验证码成功');
    }, err => {
      this.loadingService.hide();
      this.isOnHttp = false;
      this.toastService.show(err.message || '获取验证码失败');
    });

    this.codeTime = 60;
    this.startTimer();
  }

  onSure(): void {
    console.log(this.username, this.validCode, this.newPassword, this.confirmPassword);

    if (!this.username) {
      return this.toastService.show('请输入手机号');
    }
    if (!this.validCode) {
      return this.toastService.show('请输入验证码');
    }
    if (!this.newPassword) {
      return this.toastService.show('请输入新密码');
    }
    if (!this.confirmPassword) {
      return this.toastService.show('请确认新密码');
    }
    if (this.newPassword !== this.confirmPassword) {
      return this.toastService.show('密码不一致，请重新输入');
    }
    if (this.isOnHttp) {
      return;
    }
    this.isOnHttp = true;

    this.loadingService.show({ content: '请稍后' });
    this.userNetwork.resetPassword({
      mobileNo: this.username,
      identifyingCode: this.validCode,
      newPassword: this.newPassword
    }).subscribe((data: any) => {
      this.isOnHttp = false;
      this.loadingService.hide();
      console.log(data);

      if (data.status == '0') {
        return this.toastService.show('操作成功');
      }
      return this.toastService.show(data.message || '操作失败');

    }, err => {
      this.isOnHttp = false;
      this.loadingService.hide();
      this.toastService.show(err.message || '操作失败');
    });

  }

}