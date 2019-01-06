import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ChildCheckChartDetail } from "./childCheckChartDetail";
import { ChartModule } from 'angular-highcharts';

import { ToastService } from "../../../../service/toast.service";
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  declarations: [
    ChildCheckChartDetail
  ],
  imports: [
    IonicPageModule.forChild(ChildCheckChartDetail),
    ChartModule,
    ComponentsModule
  ],
  providers: [ToastService],
  entryComponents: [
    ChildCheckChartDetail
  ]
})
export class ChildCheckChartDetailPageModule { };