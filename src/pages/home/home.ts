import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DevicesProvider } from '../../providers/devices/devices';

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

  constructor(
    public navCtrl: NavController,
    public devicesProvider: DevicesProvider
  ) {

    this.devicesProvider.timelineEvents.subscribe( timelineEvents => {
      this.timelineEvents = timelineEvents;
    })

    this.devicesProvider.devices.subscribe( devices => {
      console.log("HomePage devices:",devices);
      this.numOnline = 0;
      this.numOffline = 0;
      this.numUnknownConnected = 0;
      devices.forEach( device => {
        try {
          if(device.object.dynamicData.connected.val === true){
            this.numOnline++;
          } else if(device.object.dynamicData.connected.val === false){
            this.numOffline++;
          }
        } catch(e) {
          this.numUnknownConnected++;
        }
      })
    })

  }

}
