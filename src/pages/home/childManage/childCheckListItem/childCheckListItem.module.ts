import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ChildCheckListItem } from "./childCheckListItem";
import { ChartModule } from 'angular-highcharts';
import { ChildAttendanceNetwork } from "../../../../network/childAttendance.network";
import { ToastService } from "../../../../service/toast.service";

@NgModule({
  declarations: [
    ChildCheckListItem
  ],
  imports: [
    IonicPageModule.forChild(ChildCheckListItem),
    ChartModule
  ],
  providers: [ChildAttendanceNetwork, ToastService],
  entryComponents: [
    ChildCheckListItem
  ]
})
export class ChildCheckListItemPageModule { };