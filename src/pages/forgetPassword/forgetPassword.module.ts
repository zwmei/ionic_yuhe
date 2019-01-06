import { ForgetPasswordPage } from "./forgetPassword";
import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { LoadingService } from "../../service/loading.service";

@NgModule({
  declarations: [ForgetPasswordPage],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage),
  ],
  providers: [LoadingService],
  entryComponents: [ForgetPasswordPage]
})
export class ForgetPasswordPageModule { }
