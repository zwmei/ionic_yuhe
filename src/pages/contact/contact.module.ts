import { NgModule } from "@angular/core";
import { ContactPage } from "./contact";
import { IonicPageModule } from "ionic-angular";
import { ContactNetwork } from "../../network/contact.network";
import { ToastService } from "../../service/toast.service";

@NgModule({
  declarations:[
    ContactPage
  ],
  imports:[
    IonicPageModule.forChild(ContactPage)
  ],
  entryComponents:[
    ContactPage
  ],
  providers: [
    ContactNetwork
  ]
})
export class ContactPageModule {};