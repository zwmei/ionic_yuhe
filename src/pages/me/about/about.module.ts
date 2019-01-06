import { AboutPage } from "./about";
import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { LoadingService } from "../../../service/loading.service";

@NgModule({
  declarations: [AboutPage],
  imports: [
    IonicPageModule.forChild(AboutPage),
  ],
  providers: [LoadingService],
  entryComponents: [AboutPage]
})
export class AboutPageModule { }
