import { ApprovalNetwork } from './../../../network/approval.network';
import { ApprovalPage } from "./approvalPage";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [ApprovalPage],
  imports: [
      IonicPageModule.forChild(ApprovalPage),
    ],
  entryComponents: [ApprovalPage],
  providers: [ApprovalNetwork]
})
export class ApprovalPageModule {}