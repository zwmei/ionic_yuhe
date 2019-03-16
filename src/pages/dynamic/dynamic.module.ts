import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DynamicPage } from "./dynamic";
import { NewMomentPageModule } from "./newMoment/newMoment.module";


@NgModule({
  declarations:[
    DynamicPage
  ],
  imports:[
    IonicPageModule.forChild(DynamicPage),
    NewMomentPageModule
  ],
  entryComponents:[
    DynamicPage
  ]
})
export class DynamicPageModule {
  
}
