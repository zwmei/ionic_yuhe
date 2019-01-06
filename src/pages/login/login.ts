import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public toast: ToastController
  ) { }

  public getGps() {
    console.warn('start geo --------');
    this.geolocation.getCurrentPosition().then(res => {
      console.log('geo ok', res);

      // if (res && res.coords) {
      //   alert(res.coords.longitude);
      //   alert(res.coords.latitude);
      // }
      this.toast.create({
        position: 'top',
        duration:3000,
        message: `定位成功啦，${res.coords.longitude}，${res.coords.latitude}，`
      }).present();


    },err=>{
      console.log('geo err', err);
    })
  }
}
