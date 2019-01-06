import { ToastService } from './../../../../service/toast.service';
import { CheckInPage } from "./checkIn";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CheckNetwork } from "../../../../network/check.network";
import { DatePipe } from "@angular/common";


@NgModule({
  declarations: [CheckInPage],
  imports: [
      IonicPageModule.forChild(CheckInPage),
    ],
  entryComponents: [CheckInPage],
  providers: [CheckNetwork, DatePipe, ToastService],
})
export class CheckInPageModule {}