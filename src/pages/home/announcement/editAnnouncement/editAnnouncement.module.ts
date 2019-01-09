import { ToastService } from './../../../../service/toast.service';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EditAnnouncement } from "./editAnnouncement";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NoticeNetWork } from "./../../../../network/notice.network";
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [EditAnnouncement],
  imports: [
      IonicPageModule.forChild(EditAnnouncement),
    ],
  entryComponents: [EditAnnouncement],
  providers: [
    // Geolocation,
    NoticeNetWork,
    DatePipe,
    ToastService,
  ]
})
export class EditAnnouncementPageModule {}
