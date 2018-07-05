import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicesPage } from './devices';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(DevicesPage),
    PipesModule
  ],
})
export class DevicesPageModule {}
