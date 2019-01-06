import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StudentManagePage } from "./studentManage";

import { ClassNetwork } from "../../../../network/class.network";
import { ToastService } from "../../../../service/toast.service";

@NgModule({
  declarations:[
    StudentManagePage
  ],
  imports:[
    IonicPageModule.forChild(StudentManagePage)
  ],
  providers: [ClassNetwork, ToastService],
  entryComponents:[
    StudentManagePage
  ]
})
export class StudentManagePageModule {};