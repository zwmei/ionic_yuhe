import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StatusDetailList } from "./statusDetailList";
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    StatusDetailList
  ],
  imports: [
    IonicPageModule.forChild(StatusDetailList),
    ChartModule
  ],
  entryComponents: [
    StatusDetailList
  ]
})
export class StatusDetailListPageModule { };