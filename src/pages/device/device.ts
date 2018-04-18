import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter, Breaker, Event, ID } from '../../interfaces/devices';
import { BreakerPage } from '../breaker/breaker';
import { AngularFireDatabase } from 'angularfire2/database';

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
  events: Array<any> = [];
  name: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
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
      name: null,
      object: null
    }
    this.db.object('v1/devices/' + this.id + '/staticData/name/val').valueChanges().subscribe( val => { this.loadcenter.name = val });
    this.db.object('v1/loadcenter/' + this.id).valueChanges().subscribe( val => { this.loadcenter.object = val });

    this.devicesProvider.breakers.subscribe( breakers => {
      this.breakers = this.devicesProvider.filterBreakersByLoadcenterId(breakers,this.id);
    });

    this.devicesProvider.events.subscribe( events => {
      this.events = this.devicesProvider.getTimelineEventsByLoadcenterId(events,this.id);
    })

  }

  goToBreaker(id: number | string){
    this.navCtrl.push(BreakerPage,{
      "breakerId": id,
      "loadcenterId": this.id
    })
  }

}
