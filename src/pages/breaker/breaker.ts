import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter, Breaker, ID } from '../../interfaces/devices';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/debounceTime';

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
  events: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public devicesProvider: DevicesProvider
  ) {

    this.id = navParams.get('breakerId');
    this.loadcenterId = navParams.get('loadcenterId');

    this.breaker = this.db.object('v1/breaker/'+this.id).valueChanges();
    this.db.object('v1/breaker/' + this.id + '/staticData/loadType/val').valueChanges().subscribe(val => { this.loadType = val; });
    this.db.object('v1/breaker/' + this.id + '/staticData/circuitNumber/val').valueChanges().subscribe(val => { this.circuitNumber = val; });
    this.db.object('v1/breaker/' + this.id + '/dynamicData/state/val').valueChanges().subscribe(val => { this.state = val; });
    this.db.object('v1/breaker/' + this.id + '/dynamicData/status/val').valueChanges().subscribe(val=>{this.status=val;});

    this.db.object('v1/devices/'+this.loadcenterId+'/staticData/name/val').valueChanges().subscribe(val=>{this.loadcenterName=val;})

    this.devicesProvider.events.debounceTime(100).subscribe(events => {
      this.events = this.devicesProvider.getTimelineEventsByBreakerId(events, this.id);
    })
  }

}
