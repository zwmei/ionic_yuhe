import { AttendanceRank } from "./attendanceRank";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [AttendanceRank],
  imports: [
      IonicPageModule.forChild(AttendanceRank)
    ],
  entryComponents: [AttendanceRank]
})
export class AttendanceRankPageModule {
}