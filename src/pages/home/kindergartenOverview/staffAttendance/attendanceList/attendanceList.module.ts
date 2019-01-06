import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AttendanceListPage } from "./attendanceList";
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AttendanceListPage
  ],
  imports: [
    IonicPageModule.forChild(AttendanceListPage),
    ChartModule
  ],
  entryComponents: [
    AttendanceListPage
  ]
})
export class AttendanceListPageModule { };