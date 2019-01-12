import { ComponentsModule } from './../../../../components/components.module';
import { ToastService } from './../../../../service/toast.service';
import { ApprovalNetwork } from './../../../../network/approval.network';
import { RestApply } from "./restApply";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [RestApply],
  imports: [
      IonicPageModule.forChild(RestApply),
      ComponentsModule
    ],
  entryComponents: [RestApply],
  providers: [ApprovalNetwork, DatePipe, ToastService],
})
export class RestApplyPageModule {}
