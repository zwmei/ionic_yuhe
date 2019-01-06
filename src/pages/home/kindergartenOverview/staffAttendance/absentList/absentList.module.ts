import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AbsentListPage } from "./absentList";
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AbsentListPage
  ],
  imports: [
    IonicPageModule.forChild(AbsentListPage),
    ChartModule
  ],
  entryComponents: [
    AbsentListPage
  ]
})
export class AbsentListPageModule { };