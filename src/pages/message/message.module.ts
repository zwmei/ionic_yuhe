import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MessagePage } from "./message";
import { ComponentsModule } from "../../components/components.module";
import { ChatNetwork } from "../../network/chat.network";

@NgModule({
  declarations: [
    MessagePage
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    ComponentsModule
  ],
  providers: [
    ChatNetwork
  ],
  entryComponents: [
    MessagePage
  ]
})
export class MessagePageModule {

}
