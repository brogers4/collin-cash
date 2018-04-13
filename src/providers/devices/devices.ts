import { Injectable, EventEmitter } from '@angular/core';
import { ID, Loadcenter, Breaker, Fault } from '../../interfaces/devices';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DevicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DevicesProvider {

  loadcenters: Array<Loadcenter> = [];
  breakers: Array<Breaker> = [];
  faults: Array<Fault> = [];

  user: any;
  devices: Observable<any>;

  deviceList: Array<ID> = [];
  loadcenterList: Array<ID> = [];
  breakerList: Array<ID> = [];
  faultList: Array<ID> = [];

  _statusBreakerIcons: any = {
    "closed": "breaker-closed",
    "open": "breaker-open",
    "fault": "breaker-fault",
    "tripped": "breaker-open-handle"
  }

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    
    // Observe auth state and user to build device list and loadcenter list
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.devices = db.object('v1/users/'+this.user.uid+'/devices').valueChanges();
        const devicesObserver = this.devices.subscribe(devices => {
          if (typeof devices === 'undefined' || devices === null) return;

          this.deviceList = this._truthyObjectToArray(devices);
          this.deviceList.forEach( (deviceId, index) => {
            db.object('v1/devices/' + deviceId + '/classes').valueChanges().subscribe(deviceClasses => {
              if (typeof deviceClasses === 'undefined' || deviceClasses === null) return;

              let loadcenterListChange = false;
              if ('loadcenter' in deviceClasses && deviceClasses['loadcenter'] === true) {
                if (!this.loadcenterList.includes(deviceId)) {
                  this.loadcenterList.push(deviceId);
                  this.loadcenters.push({
                    id: deviceId,
                    name: db.object('v1/devices/'+deviceId+'/staticData/name/val').valueChanges(),
                    object: db.object('v1/loadcenter/'+deviceId).valueChanges()
                  })
                  loadcenterListChange = true;

                  // Retrieve the list of breaker ID's for the loadcenter
                  db.object('v1/loadcenter/'+deviceId+'/breakers').valueChanges().subscribe( breakers => {
                    if (typeof breakers === 'undefined' || breakers === null) return;

                    let breakerListChange = false;
                    var breakerList = this._truthyObjectToArray(breakers);
                    breakerList.forEach( (breakerId, index) => {
                      if(!this.breakerList.includes(breakerId)){
                        this.breakerList.push(breakerId);
                        this.breakers.push({
                          id: breakerId,
                          object: db.object('v1/breaker/'+breakerId).valueChanges()
                        });
                        breakerListChange = true;

                        // Retrieve the list of fault ID's for the breaker
                        db.object('v1/breaker/'+breakerId+'/faults').valueChanges().subscribe( faults => {
                          if(typeof faults === 'undefined' || faults === null) return;

                          let faultListChange = false;
                          var faultList = this._truthyObjectToArray(faults);
                          faultList.forEach((faultId, index) => {
                            if (!this.faultList.includes(faultId)) {
                              this.faultList.push(faultId);
                              this.faults.push({
                                id: faultId,
                                object: db.object('v1/faults/' + faultId).valueChanges()
                              });
                              faultListChange = true;
                            }
                          })
                          var faultFalseList = this._falseyObjectToArray(faults);
                          faultFalseList.forEach((faultId, index) => {
                            if (this.faultList.includes(faultId)) {
                              this.faultList.splice(this.faultList.indexOf(faultId), 1);
                              this.faults.splice(this._getIndexOfFaultById(faultId), 1);
                              faultListChange = true;
                            }
                          })
                          if (faultListChange) {
                            this._onFaultListChange();
                          }
                          
                        })
                      }
                    });
                    // TODO: This could cause problems if a duplicate breaker is added and then removed
                    var breakerFalseList = this._falseyObjectToArray(breakers);
                    breakerFalseList.forEach( (breakerId, index) => {
                      if(this.breakerList.includes(breakerId)){
                        this.breakerList.splice(this.breakerList.indexOf(breakerId),1);
                        this.breakers.splice(this._getIndexOfBreakerById(breakerId),1);
                        breakerListChange = true;
                        // TODO: Also need to remove faults from fault list per breaker
                      }
                    })
                    if(breakerListChange) {
                      this._onBreakerListChange();
                    }
                  })
                }
              } else {
                if (this.loadcenterList.includes(deviceId)) {
                  this.loadcenterList.splice(this.loadcenterList.indexOf(deviceId),1);
                  this.loadcenters.splice(this._getIndexOfLoadcenterById(deviceId),1);
                  loadcenterListChange = true;
                  // TODO: Also need to remove breakers from breaker list per loadcenter
                  // TODO: Also need to remove faults from fault list per breaker per loadcenter
                  // NOTE: Is there a better way to manage this? Perhaps it's better just to rebuild the list on any change.
                }
              }
              if (loadcenterListChange) {
                this._onLoadcenterListChange();
              }
            })
          })
        })
      } else {
        this.user = null;
      }
    });

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

  ///////////////////////////////
  //region  PRIVATE FUNCTIONS  //
  ///////////////////////////////

  _onLoadcenterListChange(){
    // console.log("DevicesProvider _onLoadcenterListChange loadcenters:",this.loadcenterList);
  }

  _onBreakerListChange(){
    // console.log("DevicesProvider _onBreakerListChange breakers:",this.breakerList);
  }

  _onFaultListChange(){
    // console.log("DevicesProvider _onFaultListChange faults:",this.faultList);
  }

  _getIndexOfLoadcenterById(id: ID){
    return this._getIndexOfObjectById(this.loadcenters, id);
  }

  _getIndexOfBreakerById(id: ID){
    return this._getIndexOfObjectById(this.breakers, id);
  }

  _getIndexOfFaultById(id: ID){
    return this._getIndexOfObjectById(this.faults,id);
  }

  _getIndexOfObjectById(arr: Array<any>, id: ID){
    for (var i = 0; i < arr.length; i++){
      if (arr[i].id === id) return i;
    }
  }

  _getObjectById(arr: Array<any>, id: ID){
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return arr[i];
    }
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
