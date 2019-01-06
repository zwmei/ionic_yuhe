import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CalendarComponent } from './calendar/calendar';
import { YearSwitchComponent } from './year-switch/year-switch';
import { MonthSwitchComponent } from './month-switch/month-switch';
import { SeasonSwitchComponent } from './season-switch/season-switch';


@NgModule({
	declarations: [
		CalendarComponent,
    YearSwitchComponent,
    MonthSwitchComponent,
    SeasonSwitchComponent
	],
	imports: [IonicModule],
	exports: [
		CalendarComponent,
    YearSwitchComponent,
    MonthSwitchComponent,
    SeasonSwitchComponent]
})
export class ComponentsModule { }
