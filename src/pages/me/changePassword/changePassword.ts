import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoadingService } from '../../../service/loading.service';
import { ToastService } from "../../../service/toast.service";
import { ConfirmService } from "../../../service/confirm.service";
import { UserNetwork } from "../../../network/user.network";

@IonicPage({
  name: 'app-me-changePassword',
  segment: 'app-me-changePassword'
})
@Component({
  selector: 'page-me-changePassword',
  templateUrl: 'changePassword.html'
})
export class ChangePasswordPage {



  pageData: { oldPassword: string, newPassword: string, confirmNewPassword: string } =
    { oldPassword: '', newPassword: '', confirmNewPassword: '' };


  constructor(private navCtrl: NavController,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private confirmService: ConfirmService,
    private userNetwork: UserNetwork) {

  }

  validPassword(password){
    // var reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,12}$/;
    // if(!reg.test(password)){
    //   return this.toastService.show('密码必须由6-12位数字或者字母组成');
    // }
    if(password.length < 6){
      return this.toastService.show('密码必须至少6位');
    }
  }

  validNewPassword() {
    if (this.pageData.oldPassword === this.pageData.newPassword) {
      return this.toastService.show('请输入不同于旧密码的新密码');
    }
    this.validPassword(this.pageData.newPassword);
  }

  validConfirmNewPassword() {
    if (this.pageData.oldPassword === this.pageData.newPassword) {
      return this.toastService.show('请输入不同于旧密码的新密码');
    }

    if (this.pageData.newPassword !== this.pageData.confirmNewPassword) {
      this.toastService.show('新密码两次输入不一致');
      return false;
    }
    return true;
  }

  modifyPassword() {
    if (!this.pageData.oldPassword) {
      return this.toastService.show('请输入旧密码');
    }

    if (!this.validConfirmNewPassword()) {
      return;
    }

    this.confirmService.show({
      title: '警示',
      subTitle: '您确认要修改您的密码吗？',
      buttons: [
        {
          handler: () => { }
        },
        {
          handler: () => {
            console.log('old:', this.pageData.oldPassword);
            console.log('new:', this.pageData.newPassword);
            console.log('confirm:', this.pageData.confirmNewPassword);

            this.loadingService.show({ content: '请稍后' });
            this.userNetwork.modifyPassword({ oldPassword: this.pageData.oldPassword, newPassword: this.pageData.newPassword })
            .subscribe((data:{status?:number, message?:string}) => {
              console.log(data);
              this.loadingService.hide();
              if (data.status === 0) {
                this.toastService.show('密码修改成功！');
                this.navCtrl.push('app-tab', { id: 4 });
              }else{
                this.toastService.show(data.message || '密码修改失败！');
              }
            }, err => {
              this.toastService.show(err.message || '密码修改失败！');
            });
          }
        }
      ]
    })


  }

  onForgetPassword(): void {
    this.navCtrl.push('app-forget-password');
  }
}