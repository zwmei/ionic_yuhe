import { ApprovalNetwork } from './../../../../network/approval.network';
import { ApprovalDetails } from "./approvalDetails";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [ApprovalDetails],
  imports: [
      IonicPageModule.forChild(ApprovalDetails),
    ],
  entryComponents: [ApprovalDetails],
  providers: [ApprovalNetwork]
})
export class ApprovalDetailsPageModule {}