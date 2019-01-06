import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ScheduleSettingPage } from "./scheduleSetting";
import { ScheduleNetwork } from "../../../../network/schedule.network";
import { ConfirmService } from "../../../../service/confirm.service";
import { ToastService } from "../../../../service/toast.service";

@NgModule({
  declarations: [
    ScheduleSettingPage
  ],
  imports: [
    IonicPageModule.forChild(ScheduleSettingPage)
  ],
  providers: [ToastService, ConfirmService,ScheduleNetwork],
  entryComponents: [
    ScheduleSettingPage
  ]
})
export class ScheduleSettingPageModule { };