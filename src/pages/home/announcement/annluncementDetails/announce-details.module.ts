import { AnnounceDetails } from "./announce-details";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NoticeNetWork } from './../../../../network/notice.network';

@NgModule({
  declarations: [AnnounceDetails],
  imports: [
      IonicPageModule.forChild(AnnounceDetails),
    ],
  entryComponents: [AnnounceDetails],
  providers: [NoticeNetWork]
})
export class AnnounceDetailsPageModule {}