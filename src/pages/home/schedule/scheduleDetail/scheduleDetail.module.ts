import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ScheduleDetailPage } from "./scheduleDetail";
import { ToastService } from "../../../../service/toast.service";
import { ConfirmService } from "../../../../service/confirm.service";
import { ScheduleNetwork } from "../../../../network/schedule.network";

@NgModule({
  declarations: [
    ScheduleDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ScheduleDetailPage)
  ],
  providers: [ToastService, ConfirmService,ScheduleNetwork],
  entryComponents: [
    ScheduleDetailPage
  ]
})
export class ScheduleDetailPageModule { };