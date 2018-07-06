import { Injectable } from '@angular/core';
import { ID } from '../../interfaces/devices';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
// import { catchError } from 'rxjs/operators';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';

import { DeviceModel } from '../../models/device-model';

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

  devices: Observable<Array<DeviceModel>>;

  deviceNames: Observable<any>;

  _devices: Array<DeviceModel>;

  _testDevices: Array<DeviceModel>;

  private _v: string = "v1";

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
        if(typeof user !== 'undefined' && user !== null && user.uid !== null){
          db.object(`${this._v}/users/${user.uid}/devices`).valueChanges().subscribe(devices => {
            if (typeof devices === 'undefined' || devices === null) observer.next([]);
            let deviceList = this._truthyObjectToArray(devices);
            observer.next(deviceList);
          }, err => {
            if (err.code == "PERMISSION_DENIED") {
              // ignore
            } else {
              console.log(err);
            }
          });
        } else {
          observer.next([]);
        }
      });
    });
    this.deviceList.debounceTime(50);

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
          }, err => {
            if (err.code == "PERMISSION_DENIED") {
              // ignore
            } else {
              console.log(err);
            }
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
          }, err => {
            if (err.code == "PERMISSION_DENIED") {
              // ignore
            } else {
              console.log(err);
            }
          })
        })
      })
    })

    // Devices instance subscription
    this.devices.subscribe( devices => {
      this._devices = devices;
    });
    
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
      this.db.object(`${this._v}/devices/${id}`).valueChanges().subscribe( data => {
        observer.next(new DeviceModel(id,data));
      });
    });
  }

  getDeviceRef(id: ID, path: String = null) {
    if (path) {
      return this.db.object(`${this._v}/devices/${id}/${path}`);
    }
    else return this.db.object(`${this._v}/devices/${id}`);
  }
  //endregion DEVICE FUNCTIONS
  ////////////////////////////

  //////////////////////////////
  //region  PRIVATE FUNCTIONS
  //////////////////////////////

  _getIndexOfArrayById(arr: Array<any>, id: ID){
    if(typeof arr !== 'undefined' && arr !== null){
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
      }
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
    if(typeof obj !== 'object' || obj === null) return [];
    return Object.keys(obj).filter(objKey => obj[objKey] === true);
  }

  _falseyObjectToArray(obj: any) {
    if (typeof obj !== 'object' || obj === null) return [];
    return Object.keys(obj).filter(objKey => obj[objKey] === false);
  }

  _tsVal(val: any){
    return {
      val: val,
      ts: Date.now()
    }
  }

  //////////////////////////////
  //endregion  PRIVATE FUNCTIONS  
  //////////////////////////////
}
