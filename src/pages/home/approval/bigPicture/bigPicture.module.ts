import { BigPicture } from './bigPicture';
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [BigPicture],
  imports: [
      IonicPageModule.forChild(BigPicture),
    ],
  entryComponents: [BigPicture],
})
export class ApprovalPageModule {}
