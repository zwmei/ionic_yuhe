import { NoticeNetWork } from './../../../network/notice.network';
import { Announcement } from "./announcement";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";


@NgModule({
  declarations: [Announcement],
  imports: [
      IonicPageModule.forChild(Announcement),
    ],
  entryComponents: [Announcement],
  providers: [NoticeNetWork], 
})
export class AnnouncementPageModule {}
