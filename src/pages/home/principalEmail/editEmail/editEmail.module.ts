import { EditEmail } from "./editEmail";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [EditEmail],
  imports: [
      IonicPageModule.forChild(EditEmail),
    ],
  entryComponents: [EditEmail]
})
export class EditEmailPageModule {}