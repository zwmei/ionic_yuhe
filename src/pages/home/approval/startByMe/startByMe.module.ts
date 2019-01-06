import { ApprovalNetwork } from './../../../../network/approval.network';
import { StartByMe } from "./startByMe";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [StartByMe],
  imports: [
      IonicPageModule.forChild(StartByMe),
    ],
  entryComponents: [StartByMe],
  providers: [ApprovalNetwork],
})
export class StartByMePageModule {}