import { NewMomentPage } from "./newMoment";
import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { LoadingService } from "../../../service/loading.service";
import { ToastService } from "../../../service/toast.service";
import { ConfirmService } from "../../../service/confirm.service";
import { ComponentsModule } from "../../../components/components.module";
import { DynamicNetwork } from "../../../network/dynamic.network";

@NgModule({
  declarations: [NewMomentPage],
  imports: [
    IonicPageModule.forChild(NewMomentPage),
    ComponentsModule
  ],
  providers: [LoadingService, ToastService, ConfirmService,DynamicNetwork],
  entryComponents: [NewMomentPage],
})
export class NewMomentPageModule { }
