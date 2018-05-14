import { Injectable, EventEmitter } from '@angular/core';
import { ID, Device, Loadcenter, Breaker, Event } from '../../interfaces/devices';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';

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
  token: string;

  deviceList: Observable<Array<ID>>;
  loadcenterList: Observable<Array<ID>>;
  breakerList: Observable<Array<ID>>;
  eventList: Observable<Array<ID>>;

  devices: Observable<Array<DeviceModel>>;
  loadcenters: Observable<Array<LoadcenterModel>>;
  breakers: Observable<Array<BreakerModel>>;
  events: Observable<Array<EventModel>>;
  timelineEvents: Observable<Array<any>>;

  deviceNames: Observable<any>;

  _devices: Array<DeviceModel>;
  _loadcenters: Array<LoadcenterModel>;
  _breakers: Array<BreakerModel>;
  _events: Array<EventModel>;
  _timelineEvents: Array<any>;

  _testDevices: Array<DeviceModel>;

  private _v: string = "v1";

  _statusBreakerIcons: any = {
    "closed": "breaker-closed",
    "open": "breaker-open",
    "event": "breaker-event",
    "tripped": "breaker-open-handle"
  }

  ///////////////////////
  //region CONSTRUCTOR
  //////////////////////
  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {

    // OBSERVABLE: deviceList[ID]
    // PATH: v1/users/{id}/devices
    this.deviceList = new Observable( observer => {
      afAuth.authState.subscribe( user => {
        db.object(`${this._v}/users/${user.uid}/devices`).valueChanges().subscribe( devices => {
          if (typeof devices === 'undefined' || devices === null) observer.next([]);
          let deviceList = this._truthyObjectToArray(devices);
          observer.next(deviceList);
        });
      });
    });
    this.deviceList.debounceTime(100);

    // OBSERVABLE: devices[DeviceModel]
    // PATH: v1/devices/{id}
    this.devices = new Observable( observer => {
      this.deviceList.subscribe( deviceList => {
        var devices = [];
        deviceList.forEach( deviceId => {
          this.db.object(`${this._v}/devices/${deviceId}`).valueChanges().subscribe(val => {
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

    // OBSERVABLE: deviceNames[{ID: string}]
    // PATH: v1/devices/{id}/staticData/name/val
    this.deviceNames = new Observable(observer => {
      var deviceNames = {};
      this.deviceList.subscribe(deviceList => {
        deviceList.forEach(deviceId => {
          this.db.object(`${this._v}/devices/${deviceId}/staticData/name/val`).valueChanges().subscribe(name => {
            deviceNames[deviceId] = name;
            observer.next(deviceNames);
          })
        })
      })
    })

    // Devices instance subscription
    this.devices.subscribe( devices => {
      this._devices = devices;
    });

    // OBSERVABLE: loadcenterList[ID]
    // PATH: v1/devices/{id}/classes
    this.loadcenterList = new Observable( observer => {
      this.deviceList.subscribe(deviceList => {
        var loadcenterList = [];
        deviceList.forEach((deviceId, index) => {
          db.object(`${this._v}/devices/${deviceId}/classes`).valueChanges().subscribe( deviceClasses => {
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
    
    // OBSERVABLE: loadcenters[LoadcenterModel]
    // PATH: v1/loadcenter/{id}
    // PATH: v1/devices/{id}/staticData/name/val
    this.loadcenters = new Observable( observer => {
      this.loadcenterList.subscribe( loadcenterList => {
        var loadcenters = [];
        loadcenterList.forEach((loadcenterId, idx) => {
          loadcenters.push(new LoadcenterModel(loadcenterId));
          this.db.object(`${this._v}/devices/${loadcenterId}/staticData/name/val`).valueChanges().subscribe(val => {
            let index = this._getIndexOfArrayById(loadcenters, loadcenterId);
            loadcenters[index].name = val;
            observer.next(loadcenters);
          })
          this.db.object(`${this._v}/loadcenter/${loadcenterId}`).valueChanges().subscribe(loadcenter => {
            let index = this._getIndexOfArrayById(loadcenters, loadcenterId);
            loadcenters[index].updateData(loadcenter);
            observer.next(loadcenters);
          })
        })
        observer.next(loadcenters);
      })
    });

    // Loadcenters instance subscription
    this.loadcenters.subscribe( loadcenters => {
      this._loadcenters = loadcenters;
    })

    // OBSERVABLE: breakerList[ID]
    // PATH: v1/loadcenter/{id}/breakers
    this.breakerList = new Observable( observer => {
      this.loadcenterList.subscribe( loadcenterList => {
        var breakerList = [];
        loadcenterList.forEach( loadcenterId => {
          this.db.object(`${this._v}/loadcenter/${loadcenterId}/breakers`).valueChanges().subscribe( subBreakerList => {
            let _subBreakerListTrue = this._truthyObjectToArray(subBreakerList);
            let _subBreakerListFalse = this._falseyObjectToArray(subBreakerList);
            let change = false;
            _subBreakerListFalse.forEach( breakerId => {
              if(breakerList.includes(breakerId)){
                breakerList.splice(breakerList.indexOf(breakerId),1);
                change = true;
              }
            })
            _subBreakerListTrue.forEach( breakerId => {
              if(!breakerList.includes(breakerId)){
                breakerList.push(breakerId);
                change = true;
              }
            })
            if(change) observer.next(breakerList);
          })
        })
      })
      // this.loadcenters.subscribe( loadcenters => {
      //   var breakerList = [];
      //   loadcenters.forEach( (loadcenter, index) => {
      //     let subBreakerList = loadcenter.getBreakerList();
      //     breakerList.push(...subBreakerList);
      //   });
      //   observer.next(breakerList);
      // })
    });

    // OBSERVABLE: breakers[BreakerModel]
    // PATH: v1/breaker/{id}
    this.breakers = new Observable(observer => {
      this.breakerList.subscribe(breakerList => {
        var breakers = [];
        breakerList.forEach(breakerId => {
          this.db.object(`${this._v}/breaker/${breakerId}`).valueChanges().subscribe(val => {
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

    // Breakers instance subscription
    this.breakers.subscribe( breakers => {
      this._breakers = breakers;
    })

    // OBSERVABLE: eventList[ID]
    // PATH: v1/breaker/{id}/events
    this.eventList = new Observable( observer => {
      this.breakerList.subscribe(breakerList => {
        var eventList = [];
        breakerList.forEach(breakerId => {
          this.db.object(`${this._v}/breaker/${breakerId}/events`).valueChanges().subscribe(subEventList => {
            if(typeof subEventList !== 'undefined' && subEventList !== null){
              let _subEventListTrue = this._truthyObjectToArray(subEventList);
              let _subEventListFalse = this._falseyObjectToArray(subEventList);
              let change = false;
              _subEventListFalse.forEach(eventId => {
                if (eventList.includes(eventId)) {
                  eventList.splice(eventList.indexOf(eventId), 1);
                  change = true;
                }
              })
              _subEventListTrue.forEach(eventId => {
                if (!eventList.includes(eventId)) {
                  eventList.push(eventId);
                  change = true;
                }
              })
              if (change) observer.next(eventList);
            }
          })
        })
      })
      
      // this.breakers.subscribe( breakers => {
      //   var eventList = [];
      //   breakers.forEach( breaker => {
      //     let subEventList = breaker.getEventList();
      //     eventList.push(...subEventList);
      //   });
      //   observer.next(eventList);
      // });
    });

    // OBSERVABLE: events[EventModel]
    // PATH: v1/event/{id}
    this.events = new Observable(observer => {
      this.eventList.subscribe(eventList => {
        var events = [];
        eventList.forEach(eventId => {
          this.db.object(`${this._v}/event/${eventId}`).valueChanges().subscribe(val => {
            events.push(new EventModel(eventId,val));
            observer.next(events);
          });
        });
        observer.next(events);
      });
    });

    // Events instance subscription
    this.events.subscribe( events => {
      this._events = events;
    })

    // OBSERVABLE: timelineEvents[TimelineEvent]
    // PATH: v1/event/{id}
    // NOTE: Converts EventModel to TimelineEvent format
    this.timelineEvents = new Observable( observer => {
      this.events.subscribe( events => {
        var timelineEvents = [];
        events.forEach( event => {
          timelineEvents.push(this.getEventAsTimelineEvent(event));
        });
        observer.next(timelineEvents);
      });
    });

    // TimelineEvents instance suscription
    this.timelineEvents.subscribe( timelineEvents => {
      this._timelineEvents = timelineEvents;
    })
    
    // Observe auth state and user to build device list and loadcenter list
    afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        user.getIdToken(false).then(
          token => {
            this.token = token;
          },
          err => {
            console.log("Error getting user token:",err);
          }
        )
      } else {
        this.user = null;
        this.token = null;
      }
    });

  }
  //endregion CONSTRUCTOR
  ///////////////////////

  ////////////////////////////
  //region DEVICE FUNCTIONS
  ////////////////////////////
  getDevice(id: ID):Observable<DeviceModel> {
    return new Observable( observer => {
      this.db.object(`${this._v}/device/${id}`).valueChanges().subscribe( data => {
        observer.next(new DeviceModel(id,data));
      });
    });
  }

  getDeviceName(id: ID):Observable<any> {
    return new Observable( observer => {
      this.deviceNames.subscribe( deviceNames => {
        observer.next(deviceNames[id]);
      });
    });
  }
  //endregion DEVICE FUNCTIONS
  ////////////////////////////

  ////////////////////////////////
  //region LOADCENTER FUNCTIONS
  ////////////////////////////////
  getLoadcenter(id: ID):Observable<LoadcenterModel> {
    return new Observable( observer => {
      this.db.object(`${this._v}/loadcenter/${id}`).valueChanges().subscribe( data => {
        observer.next(new LoadcenterModel(id,data));
      });
    });
  }

  getLoadcentersWithActiveFaults(): Observable<Array<LoadcenterModel>> {
    return new Observable(observer => {
      this.loadcenters.subscribe(loadcenters => {
        observer.next(this.filterLoadcentersByActiveFault(loadcenters));
      })
    })
  }

  getLoadcenterNameById(id: ID) {
    return this._loadcenters[this._getIndexOfArrayById(this._loadcenters, id)].name;
  }

  filterLoadcentersByActiveFault(loadcenters: Array<LoadcenterModel>, activeFaultState: boolean = true) {
    return loadcenters.filter(loadcenter => {
      return (loadcenter.hasActiveFault() === activeFaultState);
    });
  }
  //endregion LOADCENTER FUNCTIONS
  ////////////////////////////////

  /////////////////////////////
  //region BREAKER FUNCTIONS
  /////////////////////////////
  getBreaker(id: ID):Observable<BreakerModel> {
    return new Observable( observer => {
      this.db.object(`${this._v}/breaker/${id}`).valueChanges().subscribe( data => {
        observer.next(new BreakerModel(id,data));
      })
    })
  }

  getBreakersFromList(breakerList: Array<ID>):Observable<Array<BreakerModel>> {
    return new Observable( observer => {
      var breakers = [];
      breakerList.forEach(breakerId => {
        this.getBreaker(breakerId).subscribe(breaker => {
          let index = this._getIndexOfArrayById(breakers, breakerId);
          if (index === -1) {
            breakers.push(breaker);
          } else {
            breakers[index] = breaker;
          }
          observer.next(breakers);
        });
      });
      observer.next(breakers);
    })
  }

  getBreakersByLoadcenterId(loadcenterId: ID): Observable<Array<BreakerModel>> {
    return new Observable(observer => {
      this.getLoadcenter(loadcenterId).subscribe((loadcenter: LoadcenterModel) => {
        let breakerList = loadcenter.getBreakerList();
        this.getBreakersFromList(breakerList).subscribe(breakers => {
          observer.next(breakers);
        })
      })
    })
  }

  getBreakersWithActiveFaults(): Observable<Array<BreakerModel>> {
    return new Observable(observer => {
      this.breakers.subscribe( breakers => {
        observer.next(this.filterBreakersByActiveFault(breakers));
      })
    })
  }

  getBreakerById(id: ID) {
    return this._getDataById(this._breakers, id);
  }

  getBreakerNameById(id: ID) {
    return this.getBreakerName(this.getBreakerById(id));
  }

  getBreakerName(breaker: any) {
    if (breaker && breaker.staticData && breaker.staticData.name && breaker.staticData.name.val) {
      return breaker.staticData.name.val;
    } else if (breaker && breaker.staticData && breaker.staticData.circuitNumber && breaker.staticData.circuitNumber.val) {
      return "Circuit #" + breaker.staticData.circuitNumber.val;
    } else if (breaker && breaker.staticData && breaker.staticData.loadType && breaker.staticData.loadType.val) {
      return breaker.staticData.loadType.val;
    } else {
      return "Unknown";
    }
  }

  getBreakerIconByStatus(status: string) {
    if (status.toLowerCase() in this._statusBreakerIcons) {
      return this._statusBreakerIcons[status.toLowerCase()];
    }
  }

  filterBreakersByLoadcenterId(breakers: Array<BreakerModel>, loadcenterId: ID) {
    return breakers.filter(breaker => {
      try {
        return (breaker.getLoadcenterId() === loadcenterId);
      } catch (e) {
        return false;
      }
    })
  }

  filterBreakersByActiveFault(breakers: Array<BreakerModel>, activeFaultState:boolean = true){
    return breakers.filter( breaker => {
      return (breaker.isActiveFault() === activeFaultState);
    });
  }
  //endregion BREAKER FUNCTIONS
  /////////////////////////////

  ///////////////////////////
  //region EVENT FUNCTIONS
  ///////////////////////////
  getEvent(id: ID):Observable<EventModel> {
    return new Observable( observer => {
      this.db.object(`${this._v}/event/${id}`).valueChanges().subscribe( data => {
        observer.next(new EventModel(id,data));
      })
    })
  }

  getEventAsTimelineEvent(event: EventModel) {
    if (typeof event === 'undefined' || event === null) return;

    let _subtitle = "Unknown";
    let _loadcenterName = null;
    let _breakerName = null;
    let _loadcenterId = event.getLoadcenterId();
    if (_loadcenterId) {
      //TODO: This is not async; need to put this in an observable
      _loadcenterName = this.getLoadcenterNameById(_loadcenterId);
    }
    let _breakerId = event.getBreakerId();
    if (_breakerId) {
      //TODO: This is not async; need to put this in an observable
      _breakerName = this.getBreakerNameById(_breakerId);
    }
    if (_loadcenterName && _breakerName) {
      _subtitle = _loadcenterName + ", " + _breakerName;
    } else if (_loadcenterName) {
      _subtitle = _loadcenterName + ", Unknown";
    } else if (_breakerName) {
      _subtitle = "Unknown, " + _breakerName;
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

  filterEventsByLoadcenterId(events: Array<EventModel>, loadcenterId: ID) {
    return events.filter(event => {
      return (event.getLoadcenterId() === loadcenterId);
    })
  }

  filterEventsByBreakerId(events: Array<EventModel>, breakerId: ID) {
    return events.filter(event => {
      return (event.getBreakerId() === breakerId);
    })
  }

  getTimelineEventsByLoadcenterId(events: Array<EventModel>, loadcenterId: ID) {
    return this.filterEventsByLoadcenterId(events, loadcenterId).map(event => this.getEventAsTimelineEvent(event));
  }

  getTimelineEventsByBreakerId(events: Array<EventModel>, breakerId: ID) {
    return this.filterEventsByBreakerId(events, breakerId).map(event => this.getEventAsTimelineEvent(event));
  }
  //endregion EVENT FUNCTIONS
  ///////////////////////////

  //////////////////////////////
  //region  PRIVATE FUNCTIONS
  //////////////////////////////

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

  _getDataById(arr: Array<any>, id: ID){
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return arr[i].data;
    }
    return null;
  }

  _truthyObjectToArray(obj: any){
    return Object.keys(obj).filter(objKey => obj[objKey] === true);
  }

  _falseyObjectToArray(obj: any) {
    return Object.keys(obj).filter(objKey => obj[objKey] === false);
  }

  //////////////////////////////
  //endregion  PRIVATE FUNCTIONS  
  //////////////////////////////
}
