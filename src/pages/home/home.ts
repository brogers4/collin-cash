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
  numUnknownState: number = 0;

  constructor(
    public navCtrl: NavController,
    public devicesProvider: DevicesProvider
  ) {

    this.devicesProvider.timelineEvents.subscribe( timelineEvents => {
      this.timelineEvents = timelineEvents;
    })

    this.devicesProvider.devices.subscribe( devices => {
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
      });
    });

    this.devicesProvider.loadcenters.subscribe( loadcenters => {
      this.numFaults = 0;
      loadcenters.forEach( loadcenter => {
        try {
          if(loadcenter.object.dynamicData.activeFault.val === true){
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
        try {
          if(breaker.object.dynamicData.state.val === "open"){
            this.numOpen++;
          } else if(breaker.object.dynamicData.state.val === "closed"){
            this.numClosed++;
          } else if(breaker.object.dynamicData.state.val === "fault"){
            this.numTripped++;
          }
        } catch(e) {
          this.numUnknownState++;
        }
      })
    })

  }

}
