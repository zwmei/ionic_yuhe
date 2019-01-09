import { ToastService } from './../../../../service/toast.service';
import { ApprovalNetwork } from './../../../../network/approval.network';
import { StationeryApply } from "./stationeryApply";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [StationeryApply],
  imports: [
      IonicPageModule.forChild(StationeryApply),
    ],
  entryComponents: [StationeryApply],
  providers: [ApprovalNetwork, DatePipe, ToastService],
})
export class StationeryApplyPageModule {

}
