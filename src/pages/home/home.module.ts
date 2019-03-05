import { EditEmailPageModule } from './principalEmail/editEmail/editEmail.module';
import { ResignApplyPageModule } from './apply/resignApply/resignApply.module';
import { RestApplyPageModule } from './apply/restApply/restApply.module';
import { CopyToMePageModule } from './approval/copyToMe/copyToMe.module';
import { StartByMePageModule } from './approval/startByMe/startByMe.module';
import { MyApprovalPageModule } from './approval/myApproval/myApproval.module';
import { SalaryPageModule } from './salary/salary.module';
import { PrincipalEmailPageModule } from './principalEmail/principalEmail.module';
import { EditAnnouncementPageModule } from './announcement/editAnnouncement/editAnnouncement.module';
import { AnnounceDetailsPageModule } from './announcement/annluncementDetails/announce-details.module';
import { AnnouncementPageModule } from './announcement/announcement.module';
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { ChildManageModule } from "./childManage/childManage.module";
import { FeedbackEmailPageModule } from './principalEmail/feedbackEmail/feedbackEmail.module';
import {ChartModule} from 'angular-highcharts';
import { ApprovalDetailsPageModule } from './approval/approvalDetails/approvalDetails.module';
import { kindergartenOverviewModule } from "./kindergartenOverview/kindergartenOverview.module";
import { MessageService } from '../../service/message.service';
import { ConfirmService } from '../../service/confirm.service';
import { ActionSheetService } from '../../service/actionSheet.service';
import { CheckInPageModule } from './checkIn/checkInPage/checkIn.module';
import { AttendanceReportPageModule } from "./checkIn/attendanceReport/attendanceReport.module";
import { ApprovalPageModule } from './approval/approvalPage.module';
import { ProcurementApplyPageModule } from './apply/procurementApply/procurementApply.module';
import { StationeryApplyPageModule } from './apply/stationeryApply/stationeryApply.module';
import { WorkOrderApplyPageModule } from './apply/workOrderApply/workOrderApply.module';
import { ScheduleManageModule } from './schedule/schedule.module';
import { SicknessCasePageModule } from './kindergartenOverview/sicknessCase/sicknessCase.module';
import { HttpNetwork } from '../../network/http';
import { KindergartenOverviewNetwork } from '../../network/kindergartenOverview.network';
import { FinancialReportingPageModule } from './kindergartenOverview/financialReporting/financialReporting.module';
import { AuthService } from '../../service/auth.service';
import { UtilsService } from '../../service/utils.service';


@NgModule({
  declarations:[
    HomePage,
  ],
  imports:[
    IonicPageModule.forChild(HomePage),
    ChartModule,
    ChildManageModule,
    AnnouncementPageModule,
    AnnounceDetailsPageModule,
    EditAnnouncementPageModule,
    FeedbackEmailPageModule,
    PrincipalEmailPageModule,
    MyApprovalPageModule,
    ApprovalDetailsPageModule,
    SalaryPageModule,
    kindergartenOverviewModule,
    CheckInPageModule,
    AttendanceReportPageModule,
    ApprovalPageModule,
    StartByMePageModule,
    CopyToMePageModule,
    RestApplyPageModule,
    ProcurementApplyPageModule,
    ResignApplyPageModule,
    StationeryApplyPageModule,
    EditEmailPageModule,
    WorkOrderApplyPageModule,
    ScheduleManageModule,
    SicknessCasePageModule,
    FinancialReportingPageModule
  ],
  providers:[
    MessageService,
    ConfirmService,
    ActionSheetService,
    AuthService,
    UtilsService,
    HttpNetwork,
    KindergartenOverviewNetwork,
  ],
  entryComponents:[
    HomePage,
  ]
})

export class HomePageModule {};