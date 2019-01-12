import { ToastService } from './../../../../service/toast.service';
import { ApprovalNetwork } from './../../../../network/approval.network';
import { ResignApply } from "./resignApply";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DatePipe } from '@angular/common';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [ResignApply],
  imports: [
      IonicPageModule.forChild(ResignApply),
      ComponentsModule
    ],
  entryComponents: [ResignApply],
  providers: [ApprovalNetwork, DatePipe, ToastService]
})
export class ResignApplyPageModule {}
