import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ChatPage } from "./chat";
import { HtmlPipe } from "../../../service/html.pipe.service";

@NgModule({
  declarations: [
    ChatPage,
    HtmlPipe
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
  ],
  entryComponents: [
    ChatPage
  ]
})
export class ChatPageModule { };