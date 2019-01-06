import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ChartDetailList } from "./chartDetailList";
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    ChartDetailList
  ],
  imports: [
    IonicPageModule.forChild(ChartDetailList),
    ChartModule
  ],
  entryComponents: [
    ChartDetailList
  ]
})
export class ChartDetailListPageModule { };