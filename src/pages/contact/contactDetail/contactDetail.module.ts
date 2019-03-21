import { ContactDetailPage } from "./contactDetail";
import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { LoadingService } from "../../../service/loading.service";
import { ToastService } from "../../../service/toast.service";
import { ConfirmService } from "../../../service/confirm.service";
import { UserNetwork } from "../../../network/user.network";
import { ChatNetwork } from "../../../network/chat.network";

@NgModule({
  declarations: [ContactDetailPage],
  imports: [
    IonicPageModule.forChild(ContactDetailPage),
  ],
  providers: [LoadingService, ToastService, ConfirmService, UserNetwork, ChatNetwork],
  entryComponents: [ContactDetailPage]
})
export class ContactDetailPageModule { }
