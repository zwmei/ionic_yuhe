import { ChangePasswordPage } from "./changePassword";
import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { LoadingService } from "../../../service/loading.service";
import { ToastService } from "../../../service/toast.service";
import { ConfirmService } from "../../../service/confirm.service";
import { UserNetwork } from "../../../network/user.network";

@NgModule({
  declarations: [ChangePasswordPage],
  imports: [
    IonicPageModule.forChild(ChangePasswordPage),
  ],
  providers: [LoadingService, ToastService, ConfirmService,UserNetwork],
  entryComponents: [ChangePasswordPage]
})
export class ChangePasswordPageModule { }
