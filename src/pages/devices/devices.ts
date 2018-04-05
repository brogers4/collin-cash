import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicePage } from '../device/device';

/**
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Device {
  id: number;
  name: string;
  numActiveFaults?: number;
  lastFault?: string;
  lastFaultTimestamp?: number;
}

@IonicPage()
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {

  devices: Array<Device>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.devices = [
      {
        id: 1,
        name: "Garage Loadcenter",
        numActiveFaults: 0,
        lastFault: "Arc Fault",
        lastFaultTimestamp: 1522870287566
      },{
        id: 2,
        name: "Pool House Loadcenter",
        numActiveFaults: 2,
        lastFault: "Overload",
        lastFaultTimestamp: Date.now()
      },{
        id: 3,
        name: "Guest House Loadcenter",
        numActiveFaults: 0,
        lastFault: "None",
        lastFaultTimestamp: 0
      }
    ]
  }

  isActiveFault(device: Device){
    return (device.numActiveFaults > 0);
  }

  goToDevice(id: number){
    this.navCtrl.push(DevicePage,{
      "id": id
    })
  }

}
