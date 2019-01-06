import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FinancialReportingDetailPage } from "./financialReportingDetail";
import { ChartModule } from 'angular-highcharts';
import { ComponentsModule } from "../../../../../components/components.module";

@NgModule({
  declarations: [
    FinancialReportingDetailPage
  ],
  imports: [
    IonicPageModule.forChild(FinancialReportingDetailPage),
    ChartModule,
    ComponentsModule
  ],
  entryComponents: [
    FinancialReportingDetailPage
  ]
})
export class FinancialReportingDetailPageModule { };