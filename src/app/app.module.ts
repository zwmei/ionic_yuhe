import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app';
import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPageModule } from '../pages/forgetPassword/forgetPassword.module';
import { TabPageModule } from '../pages/tab/tab.module';
import { ComponentsModule } from '../components/components.module';
import { UserNetwork } from '../network/user.network';
import { ClassNetwork } from '../network/class.network';
import { HttpNetwork } from '../network/http';
import { ToastService } from '../service/toast.service';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// import { Chooser } from '@ionic-native/chooser/ngx';

import { StorageService } from '../service/storage.service';
import { GallaryService } from '../service/gallary.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    }),
    TabPageModule,
    ForgetPasswordPageModule,
    ComponentsModule,
    HttpClientModule,
    ionicGalleryModal.GalleryModalModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ComponentsModule,
    Geolocation,
    HttpNetwork,
    UserNetwork,
    ClassNetwork,
    ToastService,
    StorageService,
    GallaryService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    }
  ]
})
export class AppModule { }
