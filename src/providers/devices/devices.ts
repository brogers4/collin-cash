import { Injectable } from '@angular/core';
import { ID, Loadcenter, Breaker, Fault } from '../../interfaces/devices';

/*
  Generated class for the DevicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DevicesProvider {

  loadcenters: Array<Loadcenter>;

  _statusBreakerIcons: any = {
    "closed": "breaker-closed",
    "open": "breaker-open",
    "fault": "breaker-fault",
    "tripped": "breaker-open-handle"
  }

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
            status: "Fault",
            closed: false,
            activeFault: true,
            currentFault: "Arc Fault",
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
            status: "Open",
            closed: false,
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

  getDeviceById(id: ID){
    for(var i=0; i<this.loadcenters.length; i++){
      if(this.loadcenters[i].id === id){
        return this.loadcenters[i];
      }
    }
  }

  getBreakerIconByStatus(status: string){
    if(status.toLowerCase() in this._statusBreakerIcons){
      return this._statusBreakerIcons[status.toLowerCase()];
    }
  }

  getBreakerById(loadcenterId: ID, breakerId: ID){
    let loadcenter: Loadcenter = this.getDeviceById(loadcenterId);
    for(var i=0; i<loadcenter.breakers.length; i++){
      if(loadcenter.breakers[i].id === breakerId){
        return loadcenter.breakers[i];
      }
    }
  }

}
