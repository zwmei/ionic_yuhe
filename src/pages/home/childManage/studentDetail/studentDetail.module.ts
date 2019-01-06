import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StudentDetailPage } from "./studentDetail";
import { ToastService } from "../../../../service/toast.service";
import { ClassNetwork } from "../../../../network/class.network";
import { HttpNetwork } from "../../../../network/http";

@NgModule({
  declarations:[
    StudentDetailPage
  ],
  imports:[
    IonicPageModule.forChild(StudentDetailPage)
  ],
  providers: [ClassNetwork, ToastService, HttpNetwork],
  entryComponents:[
    StudentDetailPage
  ]
})
export class StudentDetailPageModule {};