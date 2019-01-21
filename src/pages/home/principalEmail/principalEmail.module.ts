import { EmailNetwork } from './../../../network/email.network';
import { PrincipalEmail } from "./principalEmail";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [PrincipalEmail],
  imports: [
      IonicPageModule.forChild(PrincipalEmail),
    ],
  entryComponents: [PrincipalEmail],
  providers: [EmailNetwork]
})
export class PrincipalEmailPageModule {}
