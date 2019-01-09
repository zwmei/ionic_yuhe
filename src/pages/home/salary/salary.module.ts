import { DatePipe } from '@angular/common';
import { Salary } from "./salary";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UserNetwork } from "../../../network/user.network";
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [Salary],
  imports: [
      IonicPageModule.forChild(Salary),
      ComponentsModule
    ],
  entryComponents: [Salary],
  providers: [UserNetwork, DatePipe],
})
export class SalaryPageModule {}