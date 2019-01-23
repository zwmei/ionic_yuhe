import { ComponentsModule } from './../../../../components/components.module';
import { EmailNetwork } from './../../../../network/email.network';
import { EditEmail } from "./editEmail";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [EditEmail],
  imports: [
      IonicPageModule.forChild(EditEmail),
      ComponentsModule
    ],
  entryComponents: [EditEmail],
  providers: [EmailNetwork]
})
export class EditEmailPageModule {}
