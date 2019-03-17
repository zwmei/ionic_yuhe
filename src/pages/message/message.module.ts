import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MessagePage } from "./message";
import { ComponentsModule } from "../../components/components.module";
import { ChatNetwork } from "../../network/chat.network";
import { ChatPageModule } from "./chat/chat.module";

@NgModule({
  declarations: [
    MessagePage
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    ComponentsModule,
    ChatPageModule
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
