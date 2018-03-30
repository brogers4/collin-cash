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
@NgModule({
	declarations: [EtnAccountHeaderComponent,
    EtnSimpleIndicatorComponent],
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
    EtnSimpleIndicatorComponent
	]
})
export class ComponentsModule {}
