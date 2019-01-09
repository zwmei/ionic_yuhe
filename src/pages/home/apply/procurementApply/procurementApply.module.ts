import { ToastService } from './../../../../service/toast.service';
import { ApprovalNetwork } from './../../../../network/approval.network';
import { ProcurementApply } from "./procurementApply";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [ProcurementApply],
  imports: [
      IonicPageModule.forChild(ProcurementApply),
    ],
  entryComponents: [ProcurementApply],
  providers: [ApprovalNetwork, DatePipe, ToastService],
})
export class ProcurementApplyPageModule {

}
