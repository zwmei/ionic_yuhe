import { NgModule } from "@angular/core";
import { ContactPage } from "./contact";
import { IonicPageModule } from "ionic-angular";
import { ContactNetwork } from "../../network/contact.network";
import { ContactDetailPageModule } from "./contactDetail/contactDetail.module";


@NgModule({
  declarations:[
    ContactPage
  ],
  imports:[
    IonicPageModule.forChild(ContactPage),
    ContactDetailPageModule
  ],
  entryComponents:[
    ContactPage
  ],
  providers: [
    ContactNetwork
  ]
})
export class ContactPageModule {};