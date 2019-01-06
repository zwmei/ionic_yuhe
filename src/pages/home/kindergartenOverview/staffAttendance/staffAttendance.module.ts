import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StaffAttendancePage } from "./staffAttendance";
import { ChartModule } from 'angular-highcharts';
import { AttendanceListPageModule } from "./attendanceList/attendanceList.module";
import { AttendanceChartPageModule } from "./attendanceChart/attendanceChart.module";

@NgModule({
  declarations: [
    StaffAttendancePage
  ],
  imports: [
    IonicPageModule.forChild(StaffAttendancePage),
    ChartModule,
    AttendanceListPageModule,
    AttendanceChartPageModule
  ],
  entryComponents: [
    StaffAttendancePage
  ]
})
export class StaffAttendancePageModule { };