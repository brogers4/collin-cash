import { Injectable, EventEmitter } from '@angular/core';
import { ID, Device, Loadcenter, Breaker, Event } from '../../interfaces/devices';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { DeviceModel } from '../../models/device-model';
import { LoadcenterModel } from '../../models/loadcenter-model';
import { BreakerModel } from '../../models/breaker-model';
import { EventModel } from '../../models/event-model';

/*
  Generated class for the DevicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DevicesProvider {

  user: any;

  deviceList: Observable<Array<ID>>;
  loadcenterList: Observable<Array<ID>>;
  breakerList: Observable<Array<ID>>;
  eventList: Observable<Array<ID>>;

  devices: Observable<Array<DeviceModel>>;
  loadcenters: Observable<Array<LoadcenterModel>>;
  breakers: Observable<Array<BreakerModel>>;
  events: Observable<Array<EventModel>>;
  timelineEvents: Observable<Array<any>>;

  _devices: Array<DeviceModel>;
  _loadcenters: Array<LoadcenterModel>;
  _breakers: Array<BreakerModel>;
  _events: Array<EventModel>;
  _timelineEvents: Array<any>;

  _testDevices: Array<DeviceModel>;

  _statusBreakerIcons: any = {
    "closed": "breaker-closed",
    "open": "breaker-open",
    "event": "breaker-event",
    "tripped": "breaker-open-handle"
  }

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {

    this.deviceList = new Observable( observer => {
      afAuth.authState.subscribe( user => {
        db.object('v1/users/'+user.uid+'/devices').valueChanges().subscribe( devices => {
          if (typeof devices === 'undefined' || devices === null) observer.next([]);
          let deviceList = this._truthyObjectToArray(devices);
          observer.next(deviceList);
        });
      });
    });

    this.devices = new Observable( observer => {
      this.deviceList.subscribe( deviceList => {
        var devices = [];
        deviceList.forEach( deviceId => {
          this.db.object('v1/devices/'+deviceId).valueChanges().subscribe(val => {
            let index = this._getIndexOfArrayById(devices,deviceId);
            if(index === -1){
              devices.push(new DeviceModel(deviceId,val));
            } else {
              devices[index].updateData(val);
            }
            observer.next(devices);
          });
        });
        observer.next(devices);
      });
    });

    this.devices.subscribe( devices => {
      this._devices = devices;
    });

    this.loadcenterList = new Observable( observer => {
      this.deviceList.subscribe(deviceList => {
        var loadcenterList = [];
        deviceList.forEach((deviceId, index) => {
          db.object('v1/devices/'+deviceId+'/classes').valueChanges().subscribe( deviceClasses => {
            if(typeof deviceClasses !== 'undefined' && deviceClasses !== null){
              if('loadcenter' in deviceClasses && deviceClasses['loadcenter'] === true){
                loadcenterList.push(deviceId);
                observer.next(loadcenterList);
              } else {
                if(loadcenterList.includes(deviceId)){
                  loadcenterList.splice(loadcenterList.indexOf(deviceId), 1);
                  observer.next(loadcenterList);
                }
              }
            }
          })
        });
      });
    });
    
    this.loadcenters = new Observable( observer => {
      this.loadcenterList.subscribe( loadcenterList => {
        var loadcenters = [];
        loadcenterList.forEach((loadcenterId, idx) => {
          loadcenters.push(new LoadcenterModel(loadcenterId));
          this.db.object('v1/devices/' + loadcenterId + '/staticData/name/val').valueChanges().subscribe(val => {
            let index = this._getIndexOfArrayById(loadcenters, loadcenterId);
            loadcenters[index].name = val;
            observer.next(loadcenters);
          })
          this.db.object('v1/loadcenter/' + loadcenterId).valueChanges().subscribe(loadcenter => {
            let index = this._getIndexOfArrayById(loadcenters, loadcenterId);
            loadcenters[index].updateData(loadcenter);
            observer.next(loadcenters);
          })
        })
        observer.next(loadcenters);
      })
    });

    this.loadcenters.subscribe( loadcenters => {
      this._loadcenters = loadcenters;
    })

    this.breakerList = new Observable( observer => {
      this.loadcenters.subscribe( loadcenters => {
        var breakerList = [];
        loadcenters.forEach( (loadcenter, index) => {
          let subBreakerList = loadcenter.getBreakerList();
          breakerList.push(...subBreakerList);
        });
        observer.next(breakerList);
      })
    });

    this.breakers = new Observable(observer => {
      this.breakerList.subscribe(breakerList => {
        var breakers = [];
        breakerList.forEach(breakerId => {
          this.db.object('v1/breaker/' + breakerId).valueChanges().subscribe(val => {
            let index = this._getIndexOfArrayById(breakers,breakerId);
            if(index === -1){
              breakers.push(new BreakerModel(breakerId,val));
            } else {
              breakers[index].updateData(val);
            }
            observer.next(breakers);
          });
        });
        observer.next(breakers);
      });
    });

    this.breakers.subscribe( breakers => {
      this._breakers = breakers;
    })

    this.eventList = new Observable( observer => {
      this.breakers.subscribe( breakers => {
        var eventList = [];
        breakers.forEach( breaker => {
          let subEventList = breaker.getEventList();
          eventList.push(...subEventList);
        });
        observer.next(eventList);
      });
    });

    this.events = new Observable(observer => {
      this.eventList.subscribe(eventList => {
        var events = [];
        eventList.forEach(eventId => {
          this.db.object('v1/event/'+eventId).valueChanges().subscribe(val => {
            events.push(new EventModel(eventId,val));
            observer.next(events);
          });
        });
        observer.next(events);
      });
    });

    this.events.subscribe( events => {
      this._events = events;
    })

    this.timelineEvents = new Observable( observer => {
      this.events.subscribe( events => {
        var timelineEvents = [];
        events.forEach( event => {
          timelineEvents.push(this.getEventAsTimelineEvent(event));
        });
        observer.next(timelineEvents);
      });
    });

    this.timelineEvents.subscribe( timelineEvents => {
      this._timelineEvents = timelineEvents;
    })
    
    // Observe auth state and user to build device list and loadcenter list
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });

  }

  getDeviceById(id: ID){
    return this._getObjectById(this._devices,id);
  }

  getLoadcenterById(id: ID){
    return this._getObjectById(this._loadcenters,id);
  }

  getLoadcenterNameById(id: ID){
    return this._loadcenters[this._getIndexOfArrayById(this._loadcenters,id)].name;
  }

  getBreakerById(id: ID){
    return this._getObjectById(this._breakers,id);
  }

  getBreakerNameById(id: ID){
    return this.getBreakerName(this.getBreakerById(id));
  }

  getBreakerName(breaker: any){
    if (breaker && breaker.staticData && breaker.staticData.name && breaker.staticData.name.val) {
      return breaker.staticData.name.val;
    } else if (breaker && breaker.staticData && breaker.staticData.circuitNumber && breaker.staticData.circuitNumber.val) {
      return "Circuit #" + breaker.staticData.circuitNumber.val;
    } else if (breaker && breaker.staticData && breaker.staticData.loadType && breaker.staticData.loadType.val){
      return breaker.staticData.loadType.val;
    } else {
      return "Unknown";
    }
  }

  getBreakerIconByStatus(status: string){
    if(status.toLowerCase() in this._statusBreakerIcons){
      return this._statusBreakerIcons[status.toLowerCase()];
    }
  }

  filterBreakersByLoadcenterId(breakers: Array<Breaker>, loadcenterId: ID){
    return breakers.filter( breaker => {
      try { 
        return (breaker.object.staticData.loadcenterId.val === loadcenterId);
      } catch(e) {
        return false;
      }
    })
  }

  filterEventsByLoadcenterId(events: Array<EventModel>, loadcenterId: ID){
    return events.filter(event => {
      return (event.getLoadcenterId() === loadcenterId);
    })
  }

  filterEventsByBreakerId(events: Array<EventModel>, breakerId: ID) {
    return events.filter(event => {
      return (event.getBreakerId() === breakerId);
    })
  }

  getTimelineEventsByLoadcenterId(events: Array<EventModel>, loadcenterId: ID){
    return this.filterEventsByLoadcenterId(events,loadcenterId).map(event => this.getEventAsTimelineEvent(event));
  }

  getTimelineEventsByBreakerId(events: Array<EventModel>, breakerId: ID) {
    return this.filterEventsByBreakerId(events, breakerId).map(event => this.getEventAsTimelineEvent(event));
  }


  getEventAsTimelineEvent(event: EventModel){
    if (typeof event === 'undefined' || event === null) return;
    
    let _subtitle = "Unknown";
    let _loadcenterName = null;
    let _breakerName = null;
    let _loadcenterId = event.getLoadcenterId();
    if(_loadcenterId){
      _loadcenterName = this.getLoadcenterNameById(_loadcenterId);
    }
    let _breakerId = event.getBreakerId();
    if (_breakerId) {
      _breakerName = this.getBreakerNameById(_breakerId);
    }
    if(_loadcenterName && _breakerName){
      _subtitle = _loadcenterName+", "+_breakerName;
    } else if(_loadcenterName){
      _subtitle = _loadcenterName+", Unknown";
    } else if(_breakerName){
      _subtitle = "Unknown, "+_breakerName;
    }
    let _eventType = event.getEventType();
    let _eventDescription = event.getEventDescription();
    return {
      id: event.id,
      title: (_eventDescription) ? _eventDescription : 'Unknown',
      subTitle: _subtitle,
      icon: (_eventType) ? this._getTimelineIcon(_eventType) : 'help',
      type: (_eventType) ? this._getTimelineType(_eventType) : 'unknown',
      timestamp: event.getTime()
    }
  }

  // NOTE: This function no longer works
  //
  // getBreakerById(loadcenterId: ID, breakerId: ID){
  //   let loadcenter: Loadcenter = this.getLoadcenterById(loadcenterId);
  //   for(var i=0; i<loadcenter.breakers.length; i++){
  //     if(loadcenter.breakers[i].id === breakerId){
  //       return loadcenter.breakers[i];
  //     }
  //   }
  // }

  ///////////////////////////////
  //region  PRIVATE FUNCTIONS  //
  ///////////////////////////////

  _onLoadcenterListChange(){
    // console.log("DevicesProvider _onLoadcenterListChange loadcenters:",this.loadcenterList);
  }

  _onBreakerListChange(){
    // console.log("DevicesProvider _onBreakerListChange breakers:",this.breakerList);
  }

  _oneventListChange(){
    // console.log("DevicesProvider _oneventListChange events:",this.eventList);
  }

  _getTimelineIcon(eventType: string) {
    switch (eventType) {
      case "fault":
        return "flash";
      case "open":
      case "closed":
      case "close":
        return "alert";
      default:
        return "help";
    }
  }

  _getTimelineType(eventType: string) {
    switch (eventType) {
      case "fault":
        return "danger";
      case "open":
        return "success";
      case "closed":
      case "close":
        return "warning";
      default:
        return "unknown";
    }
  }

  _getIndexOfLoadcenterById(id: ID){
    return this._getIndexOfArrayById(this._loadcenters, id);
  }

  _getIndexOfBreakerById(id: ID){
    return this._getIndexOfArrayById(this._breakers, id);
  }

  _getIndexOfEventById(id: ID){
    return this._getIndexOfArrayById(this._events,id);
  }

  _getIndexOfArrayById(arr: Array<any>, id: ID){
    for (var i = 0; i < arr.length; i++){
      if (arr[i].id === id) return i;
    }
    return -1;
  }

  _getObjectById(arr: Array<any>, id: ID){
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return arr[i].object;
    }
    return null;
  }

  _truthyObjectToArray(obj: any){
    return Object.keys(obj).filter(objKey => obj[objKey] === true);
  }

  _falseyObjectToArray(obj: any) {
    return Object.keys(obj).filter(objKey => obj[objKey] === false);
  }

  //////////////////////////////////
  //endregion  PRIVATE FUNCTIONS  //  
  //////////////////////////////////
}
