import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ChildCheckOn } from "./childCheckOn";
import { ChartModule } from 'angular-highcharts';
import { ChildAttendanceNetwork } from "../../../../network/childAttendance.network";
import { ToastService } from "../../../../service/toast.service";
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  declarations: [
    ChildCheckOn
  ],
  imports: [
    IonicPageModule.forChild(ChildCheckOn),
    ChartModule,
    ComponentsModule
  ],
  providers: [ChildAttendanceNetwork, ToastService],
  entryComponents: [
    ChildCheckOn
  ]
})
export class ChildCheckOnPageModule { };