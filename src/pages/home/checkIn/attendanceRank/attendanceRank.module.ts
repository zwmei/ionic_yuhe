import { AttendanceRank } from "./attendanceRank";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CheckNetwork } from "../../../../network/check.network";


@NgModule({
  declarations: [AttendanceRank],
  imports: [
      IonicPageModule.forChild(AttendanceRank)
    ],
  entryComponents: [AttendanceRank],
  providers: [CheckNetwork],
})
export class AttendanceRankPageModule {
}
