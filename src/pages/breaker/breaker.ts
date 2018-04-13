import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter, Breaker, ID } from '../../interfaces/devices';

/**
 * Generated class for the BreakerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-breaker',
  templateUrl: 'breaker.html',
})
export class BreakerPage {

  // loadcenterId: number | string;
  // breakerId: number | string;
  // loadcenter: Loadcenter;
  id: ID;
  breaker: any;
  loadcenterId: ID;
  loadcenterName: any;
  loadType: any;
  circuitNumber: any;
  state: any;
  status: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public devicesProvider: DevicesProvider
  ) {
    // this.loadcenterId = navParams.get('loadcenterId');
    // this.breakerId = navParams.get('breakerId');
    // this.loadcenter = devicesProvider.getLoadcenterById(this.loadcenterId);
    // this.breaker = devicesProvider.getBreakerById(this.loadcenterId,this.breakerId);
    this.id = navParams.get('breakerId');
    this.loadcenterId = navParams.get('loadcenterId');
    
    this.breaker = devicesProvider.db.object('v1/breaker/'+this.id).valueChanges();
    this.loadType = devicesProvider.db.object('v1/breaker/'+this.id+'/staticData/loadType/val').valueChanges();
    this.circuitNumber = devicesProvider.db.object('v1/breaker/' + this.id + '/staticData/circuitNumber/val').valueChanges();
    this.state = devicesProvider.db.object('v1/breaker/' + this.id + '/dynamicData/state/val').valueChanges();
    this.status = devicesProvider.db.object('v1/breaker/' + this.id + '/dynamicData/status/val').valueChanges();

    this.loadcenterName = devicesProvider.db.object('v1/devices/'+this.loadcenterId+'/staticData/name/val').valueChanges();
  }

}
