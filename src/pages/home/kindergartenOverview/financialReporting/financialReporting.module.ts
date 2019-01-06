import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FinancialReportingPage } from "./financialReporting";
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    FinancialReportingPage
  ],
  imports: [
    IonicPageModule.forChild(FinancialReportingPage),
    ChartModule
  ],
  entryComponents: [
    FinancialReportingPage
  ]
})
export class FinancialReportingPageModule { };