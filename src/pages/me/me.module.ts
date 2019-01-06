import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MePage } from "./me";

import { AboutPageModule } from "./about/about.module";
import { ChangePasswordPageModule } from "./changePassword/changePassword.module";

import { UserNetwork } from '../../network/user.network';
import { HttpNetwork } from '../../network/http';
import { ToastService } from '../../service/toast.service';


@NgModule({
  declarations:[
    MePage
  ],
  imports:[
    IonicPageModule.forChild(MePage),
    AboutPageModule,
    ChangePasswordPageModule
  ],
  entryComponents:[
    MePage
  ],
  providers:[
    HttpNetwork,
    UserNetwork,
    ToastService
  ]
})
export class MePageModule {};