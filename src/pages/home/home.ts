import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DevicesProvider } from '../../providers/devices/devices';
import { AlertsProvider } from '../../providers/alerts/alerts';

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
    public devicesProvider: DevicesProvider,
    public alertsProvider: AlertsProvider
  ) {

    this.alertsProvider.alertCount.subscribe( count => {
      this.numAlerts = count;
    })

    this.devicesProvider.timelineEvents.debounceTime(100).subscribe( timelineEvents => {
      this.timelineEvents = timelineEvents;
    })

    this.devicesProvider.devices.subscribe( devices => {
      this.numOnline = 0;
      this.numOffline = 0;
      this.numUnknownConnected = 0;
      devices.forEach( device => {
        try {
          if(device.isConnected()){
            this.numOnline++;
          } else if(device.isDisconnected()){
            this.numOffline++;
          } else {
            this.numUnknownConnected++;
          }
        } catch(e) {
          this.numUnknownConnected++;
        }
      });
    });

    this.devicesProvider.loadcenters.subscribe( loadcenters => {
      this.numFaults = 0;
      loadcenters.forEach( loadcenter => {
        try {
          if(loadcenter.data.dynamicData.activeFault.val === true){
            this.numFaults++;
          }
        } catch(e) {
          // ignore
        }
      });
    });

    this.devicesProvider.breakers.subscribe( breakers => {
      this.numClosed = 0;
      this.numOpen = 0;
      this.numTripped = 0;
      breakers.forEach( breaker => {
        let state = breaker.getState();
        if(state === "open"){
          this.numOpen++;
        } else if(state === "closed"){
          this.numClosed++;
        } else if(state === "fault"){
          this.numTripped++;
        } else {
          this.numUnknownState++;
        }
      })
    })

  }

}
