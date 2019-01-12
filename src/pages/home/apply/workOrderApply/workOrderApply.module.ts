import { ComponentsModule } from './../../../../components/components.module';
import { ToastService } from './../../../../service/toast.service';
import { DatePipe } from '@angular/common';
import { ApprovalNetwork } from './../../../../network/approval.network';
import { WorkOrderApply } from "./workOrderApply";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";


@NgModule({
  declarations: [WorkOrderApply],
  imports: [
      IonicPageModule.forChild(WorkOrderApply),
      ComponentsModule,
    ],
  entryComponents: [WorkOrderApply],
  providers: [ApprovalNetwork, DatePipe, ToastService],
})
export class WorkOrderApplyPageModule {

}
