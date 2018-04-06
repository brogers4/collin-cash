import { Injectable } from '@angular/core';
import { Loadcenter } from '../../interfaces/devices';

/*
  Generated class for the DevicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DevicesProvider {

  loadcenters: Array<Loadcenter>

  constructor() {
    
    this.loadcenters = [
      {
        id: 1,
        name: "Garage Loadcenter",
        numActiveFaults: 0,
        lastFault: "Arc Fault",
        lastFaultTimestamp: 1522870287566,
        breakers: [
          {
            id: 1,
            name: "Breaker 1",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 2,
            name: "Breaker 2",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 3,
            name: "Breaker 3",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 4,
            name: "Breaker 4",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          },
        ]
      }, {
        id: 2,
        name: "Pool House Loadcenter",
        numActiveFaults: 2,
        lastFault: "Overload",
        lastFaultTimestamp: Date.now(),
        breakers: [
          {
            id: 1,
            name: "Breaker 1",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 2,
            name: "Breaker 2",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 3,
            name: "Breaker 3",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 4,
            name: "Breaker 4",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          },
        ]
      }, {
        id: 3,
        name: "Guest House Loadcenter",
        numActiveFaults: 0,
        lastFault: "None",
        lastFaultTimestamp: 0,
        breakers: [
          {
            id: 1,
            name: "Breaker 1",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 2,
            name: "Breaker 2",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 3,
            name: "Breaker 3",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          }, {
            id: 4,
            name: "Breaker 4",
            status: "Closed",
            closed: true,
            activeFault: false,
            currentFault: "None",
            faults: []
          },
        ]
      }
    ]

  }

  getDeviceById(id: number | string){
    for(var i=0; i<this.loadcenters.length; i++){
      if(this.loadcenters[i].id === id){
        return this.loadcenters[i];
      }
    }
  }

}
