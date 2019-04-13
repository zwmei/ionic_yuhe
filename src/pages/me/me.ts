import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetService } from '../../service/actionSheet.service';
import { UserNetwork } from "../../network/user.network";
import { ToastService } from "../../service/toast.service";
import { LoginPage } from "../../pages/login/login";
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { HTTP_URL } from "../../network/http";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  constructor(
    private navCtrl: NavController,
    private actionSheetService: ActionSheetService,
    private userNetwork: UserNetwork,
    private toastService: ToastService,
    private auth: AuthService,
    private storage: StorageService) {
    this.loadUserInfo()
  }

  showActionSheet(): void {
    this.actionSheetService.show({
      title: '退出后，您不再收到来自雨荷的消息',
      buttons: [{
        text: '退出登录',
        role: 'destructive',
        handler: () => {
          //todo 跳转到登录
          this.logOut();
          // this.navCtrl.push('page-login');
        },
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    })
  }

  user: any = {};

  loadUserInfo() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    if (userInfo && typeof userInfo === "object") {
      console.log(userInfo);
      this.user.number = userInfo.zggh;
      this.user.name = userInfo.zgxm;
      this.user.photo = HTTP_URL.MAIN + '/images/' + userInfo.photo;
    }
  }

  logOut(): void {
    this.userNetwork.logout().subscribe((data: { status: number, message?: string }) => {
      console.log(data);
      if (data.status === 0) {
        this.auth.clear();
        this.navCtrl.setRoot(LoginPage);
        WebIMConn && WebIMConn.close(); //退出WebIM
      }
    }, err => {
      this.toastService.show(err.message || '登出失败');
    })
  }

  goToPage(pageName, id): void {
    pageName = pageName || 'app-me-changePassword';
    this.navCtrl.push(pageName, { id: id });
  }
}