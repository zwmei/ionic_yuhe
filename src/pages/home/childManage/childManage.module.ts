import { NgModule } from "@angular/core";
import { ClassManagePageModule } from "./classManage/classManage.module";
import { StudentManagePageModule } from "./studentManage/studentManage.module";
import { StudentDetailPageModule } from "./studentDetail/studentDetail.module";
import { ChildCheckOnPageModule } from "./childCheckOn/childCheckOn.module";
import { ChildCheckListPageModule } from "./childCheckList/childCheckList.module";
import { ChildCheckListItemPageModule } from "./childCheckListItem/childCheckListItem.module";
import { ChildCheckChartDetailPageModule } from "./childCheckChartDetail/childCheckChartDetail.module";
import { ChartDetailListPageModule } from "./chartDetailList/chartDetailList.module";
import { StatusDetailListPageModule } from "./statusDetailList/statusDetailList.module";

@NgModule({
  declarations:[
  ],
  imports:[
    ClassManagePageModule,
    ChildCheckOnPageModule,
    StudentManagePageModule,
    StudentDetailPageModule,
    ChildCheckListPageModule,
    ChildCheckListItemPageModule,
    ChildCheckChartDetailPageModule,
    ChartDetailListPageModule,
    StatusDetailListPageModule
  ],
  entryComponents:[
  ]
})
export class ChildManageModule {};