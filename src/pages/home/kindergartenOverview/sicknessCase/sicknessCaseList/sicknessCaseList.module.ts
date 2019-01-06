import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SicknessCaseListPage } from "./sicknessCaseList";

@NgModule({
  declarations: [
    SicknessCaseListPage
  ],
  imports: [
    IonicPageModule.forChild(SicknessCaseListPage)
  ],
  entryComponents: [
    SicknessCaseListPage
  ]
})
export class SicknessCaseListPageModule { };