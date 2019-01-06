import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ClassManagePage } from "./classManage";
import { ClassNetwork } from "../../../../network/class.network";
import { ToastService } from "../../../../service/toast.service";

@NgModule({
  declarations:[
    ClassManagePage
  ],
  imports:[
    IonicPageModule.forChild(ClassManagePage)
  ],
  providers: [ClassNetwork, ToastService],
  entryComponents:[
    ClassManagePage
  ]
})
export class ClassManagePageModule {};