import { EmailFileUploaderComponent } from './file-uploader/email-file-uploader';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CalendarComponent } from './calendar/calendar';
import { YearSwitchComponent } from './year-switch/year-switch';
import { MonthSwitchComponent } from './month-switch/month-switch';
import { SeasonSwitchComponent } from './season-switch/season-switch';
import { WeekSwitchComponent } from './week-switch/week-switch';
import { FileUploaderComponent } from './file-uploader/file-uploader';


@NgModule({
	declarations: [
		CalendarComponent,
    YearSwitchComponent,
    MonthSwitchComponent,
    SeasonSwitchComponent,
    WeekSwitchComponent,
    FileUploaderComponent,
    EmailFileUploaderComponent
	],
	imports: [IonicModule],
	exports: [
		CalendarComponent,
    YearSwitchComponent,
    MonthSwitchComponent,
    SeasonSwitchComponent,
    WeekSwitchComponent,
    FileUploaderComponent,
    EmailFileUploaderComponent
  ]
})
export class ComponentsModule { }
