import { LoginPage } from "./login";
import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [LoginPage],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [LoginPage]
})
export class LoginPageModule { }
