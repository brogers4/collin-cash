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
import { EtnEventTimelineComponent } from './etn-event-timeline/etn-event-timeline';
import { WdIconComponent } from './wd-icon/wd-icon';
import { WdBreakerIconComponent } from './wd-breaker-icon/wd-breaker-icon';
@NgModule({
	declarations: [
		EtnAccountHeaderComponent,
		EtnSimpleIndicatorComponent,
    	EtnEventTimelineComponent,
    	WdIconComponent,
    	WdBreakerIconComponent
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
    	EtnEventTimelineComponent,
    	WdIconComponent,
    	WdBreakerIconComponent
	]
})
export class ComponentsModule {}
