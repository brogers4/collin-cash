import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter } from '../../interfaces/devices';

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

  id: number | string;
  devices: Array<Loadcenter>;
  device: Loadcenter;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public devicesProvider: DevicesProvider
  ) {
    this.id = navParams.get('id');
    this.devices = this.devicesProvider.loadcenters;
    this.device = this.devicesProvider.getDeviceById(this.id);
  }

}
