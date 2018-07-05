import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBreakerModalPage } from './edit-breaker-modal';

@NgModule({
  declarations: [
    EditBreakerModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditBreakerModalPage),
  ],
})
export class EditBreakerModalPageModule {}
