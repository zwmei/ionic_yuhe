import { TabPage } from "./tab";
import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { ContactPageModule } from "../contact/contact.module";
import { MessagePageModule } from "../message/message.module";
import { DynamicPageModule } from "../dynamic/dynamic.module";
import { HomePageModule } from "../home/home.module";
import { MePageModule } from "../me/me.module";

@NgModule({
  declarations: [TabPage],
  imports: [
    IonicPageModule.forChild(TabPage),
    MessagePageModule,
    DynamicPageModule,
    HomePageModule,
    ContactPageModule,
    MePageModule
  ],
  entryComponents: [TabPage]
})
export class TabPageModule { }
