import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { 
	MatMenuModule,
	MatButtonModule,
	MatListModule,
	MatIconModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EtnAccountHeaderComponent } from './etn-account-header/etn-account-header';
import { EtnSimpleIndicatorComponent } from './etn-simple-indicator/etn-simple-indicator';
import { WdEventTimelineComponent } from './wd-event-timeline/wd-event-timeline';
import { WdIconComponent } from './wd-icon/wd-icon';
import { WdBreakerIconComponent } from './wd-breaker-icon/wd-breaker-icon';
import { WdFileInputComponent } from './wd-file-input/wd-file-input';
import { CollinCashTicketComponent } from './collin-cash-ticket/collin-cash-ticket';
@NgModule({
	declarations: [
		EtnAccountHeaderComponent,
		EtnSimpleIndicatorComponent,
    	WdEventTimelineComponent,
    	WdIconComponent,
    	WdBreakerIconComponent,
    WdFileInputComponent,
    CollinCashTicketComponent,
	],
	imports: [
		IonicModule,
		BrowserAnimationsModule,
		MatMenuModule,
		MatButtonModule,
		MatListModule,
		MatIconModule
	],
	exports: [
		EtnAccountHeaderComponent,
		MatMenuModule,
		MatButtonModule,
		MatListModule,
		MatIconModule,
    	EtnSimpleIndicatorComponent,
    	WdEventTimelineComponent,
    	WdIconComponent,
    	WdBreakerIconComponent,
    WdFileInputComponent,
    CollinCashTicketComponent,
	]
})
export class ComponentsModule {}
