import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AttendanceChartPage } from "./attendanceChart";
import { ChartModule } from 'angular-highcharts';
import { ComponentsModule } from "../../../../../components/components.module";

@NgModule({
  declarations: [
    AttendanceChartPage
  ],
  imports: [
    IonicPageModule.forChild(AttendanceChartPage),
    ChartModule,
    ComponentsModule
  ],
  entryComponents: [
    AttendanceChartPage
  ]
})
export class AttendanceChartPageModule { };