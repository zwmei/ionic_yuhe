import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SicknessCasePage } from "./sicknessCase";
import { ChartModule } from 'angular-highcharts';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  declarations: [
    SicknessCasePage
  ],
  imports: [
    IonicPageModule.forChild(SicknessCasePage),
    ChartModule,
    ComponentsModule
  ],
  entryComponents: [
    SicknessCasePage
  ]
})
export class SicknessCasePageModule { };