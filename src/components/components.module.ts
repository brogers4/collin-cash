import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { 
	MatMenuModule,
	MatButtonModule,
	MatListModule,
	MatIconModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WdFileInputComponent } from './wd-file-input/wd-file-input';
import { CollinCashTicketComponent } from './collin-cash-ticket/collin-cash-ticket';
import { CcMoneyBagComponent } from './cc-money-bag/cc-money-bag';
import { CcSymbolComponent } from './cc-symbol/cc-symbol';
@NgModule({
	declarations: [
    WdFileInputComponent,
    CollinCashTicketComponent,
    CcMoneyBagComponent,
    CcSymbolComponent,
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
		MatMenuModule,
		MatButtonModule,
		MatListModule,
		MatIconModule,
    WdFileInputComponent,
    CollinCashTicketComponent,
    CcMoneyBagComponent,
    CcSymbolComponent,
	]
})
export class ComponentsModule {}
