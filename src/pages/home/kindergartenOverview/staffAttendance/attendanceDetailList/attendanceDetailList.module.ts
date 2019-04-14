import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AttendanceDetailList } from "./attendanceDetailList";
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AttendanceDetailList
  ],
  imports: [
    IonicPageModule.forChild(AttendanceDetailList),
    ChartModule
  ],
  entryComponents: [
    AttendanceDetailList
  ]
})
export class AttendanceDetailListPageModule { };