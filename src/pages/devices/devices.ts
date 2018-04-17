import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicePage } from '../device/device';

import { Loadcenter, ID } from '../../interfaces/devices';

import { DevicesProvider } from '../../providers/devices/devices';

/**
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {

  loadcenters: Array<Loadcenter> = [];
  loadcenterList: Array<ID> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public devicesProvider: DevicesProvider
  ) {
    
    this.devicesProvider.loadcenters.subscribe( loadcenters => {
      this.loadcenters = loadcenters;
    })
    
  }

  isActiveFault(device: Loadcenter){
    return (device.numActiveFaults > 0);
  }

  goToDevice(id: number | string){
    this.navCtrl.push(DevicePage,{
      "id": id
    })
  }

}
