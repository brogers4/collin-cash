import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DevicesProvider } from '../../providers/devices/devices';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timelineEvents: Array<any>;
  numLoadcenters: number = 0;
  numOnline: number = 0;
  numOffline: number = 0;
  numUnknownConnected: number = 0;
  numFaults: number = 0;
  numBreakers: number = 0;
  numClosed: number = 0;
  numOpen: number = 0;
  numTripped: number = 0;
  numUnknownState: number = 0;
  numAlerts: number = 0;

  constructor(
    public navCtrl: NavController,
    public devicesProvider: DevicesProvider
  ) {

    this.devicesProvider.devices.subscribe( devices => {
      // Do something with the devices
    });

  }

}
