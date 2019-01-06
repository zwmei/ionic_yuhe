import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ChildCheckList } from "./childCheckList";
import { ChartModule } from 'angular-highcharts';
import { ChildAttendanceNetwork } from "../../../../network/childAttendance.network";

@NgModule({
  declarations: [
    ChildCheckList
  ],
  imports: [
    IonicPageModule.forChild(ChildCheckList),
    ChartModule
  ],
  providers: [ChildAttendanceNetwork],
  entryComponents: [
    ChildCheckList
  ]
})
export class ChildCheckListPageModule { };