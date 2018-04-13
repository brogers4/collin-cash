import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter, Breaker, Fault, ID } from '../../interfaces/devices';
import { BreakerPage } from '../breaker/breaker';

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

  id: ID;
  // loadcenters: Array<Loadcenter>;
  // _loadcenter: any;
  loadcenter: Loadcenter;
  breakers: Array<Breaker>;
  faults: Array<Fault>;
  name: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public devicesProvider: DevicesProvider
  ) {
    this.id = navParams.get('id');
    // this._loadcenter = this.devicesProvider.getLoadcenterById(this.id).ref.valueChanges();
    // this.loadcenters = this.devicesProvider.loadcenters;
    // this.loadcenter = this.devicesProvider.getLoadcenterById(this.id);
    // this.loadcenter.name.subscribe( name => {
    //   console.log("DevicePage loadcenter.name:",name);
    // })
    this.loadcenter = {
      id: this.id,
      name: devicesProvider.db.object('v1/devices/'+this.id+'/staticData/name/val').valueChanges(),
      object: devicesProvider.db.object('v1/loadcenter/'+this.id).valueChanges()
    }

    devicesProvider.db.object('v1/loadcenter/'+this.id+'/breakers').valueChanges().subscribe( breakers => {
      if (typeof breakers === 'undefined' || breakers === null) return;
      var breakerList = devicesProvider._truthyObjectToArray(breakers);
      this.breakers = [];
      this.faults = [];
      breakerList.forEach( (breakerId, index) => {
        this.breakers.push({
          id: breakerId,
          object: devicesProvider.db.object('v1/breaker/'+breakerId).valueChanges()
        })
        devicesProvider.db.object('v1/breaker/'+breakerId+'/faults').valueChanges().subscribe( faults => {
          if (typeof faults === 'undefined' || faults === null) return;
          var faultList = devicesProvider._truthyObjectToArray(faults);
          faultList.forEach( (faultId, index) => {
            this.faults.push({
              id: faultId,
              object: devicesProvider.db.object('v1/fault/'+faultId).valueChanges()
            })
          });
        })
      })
    })
  }

  goToBreaker(id: number | string){
    this.navCtrl.push(BreakerPage,{
      "breakerId": id,
      "loadcenterId": this.id
    })
  }

}
