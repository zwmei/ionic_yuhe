import { NgModule } from "@angular/core";
import { ScheduleSettingPageModule } from "./scheduleSetting/scheduleSetting.module";
import { NewSchedulePageModule } from "./newSchedule/newSchedule.module";
import { ScheduleDetailPageModule } from "./scheduleDetail/scheduleDetail.module";

@NgModule({
  declarations:[
  ],
  imports:[
    ScheduleSettingPageModule,
    NewSchedulePageModule,
    ScheduleDetailPageModule
  ],
  entryComponents:[
  ]
})
export class ScheduleManageModule {};