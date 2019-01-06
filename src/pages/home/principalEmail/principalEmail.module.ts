import { PrincipalEmail } from "./principalEmail";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [PrincipalEmail],
  imports: [
      IonicPageModule.forChild(PrincipalEmail),
    ],
  entryComponents: [PrincipalEmail]
})
export class PrincipalEmailPageModule {}
