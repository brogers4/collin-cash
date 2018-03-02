import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { 
	MatMenuModule,
	MatButtonModule,
	MatListModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EtnAccountHeaderComponent } from './etn-account-header/etn-account-header';
@NgModule({
	declarations: [EtnAccountHeaderComponent],
	imports: [
		IonicModule,
		BrowserAnimationsModule,
		MatMenuModule,
		MatButtonModule,
		MatListModule
	],
	exports: [
		EtnAccountHeaderComponent,
		MatMenuModule,
		MatButtonModule,
		MatListModule
	]
})
export class ComponentsModule {}
