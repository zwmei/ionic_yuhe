import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NewSchedulePage } from "./newSchedule";
import { ScheduleNetwork } from "../../../../network/schedule.network";
import { ToastService } from "../../../../service/toast.service";
import { ConfirmService } from "../../../../service/confirm.service";

@NgModule({
  declarations: [
    NewSchedulePage
  ],
  imports: [
    IonicPageModule.forChild(NewSchedulePage)
  ],
  providers: [ToastService, ConfirmService,ScheduleNetwork],
  entryComponents: [
    NewSchedulePage
  ]
})
export class NewSchedulePageModule { };