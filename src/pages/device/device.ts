import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter, Breaker, Event, ID } from '../../interfaces/devices';
import { BreakerPage } from '../breaker/breaker';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadcenterModel } from '../../models/loadcenter-model';
import { BreakerModel } from '../../models/breaker-model';

import 'rxjs/add/operator/debounceTime';

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
  loadcenter: LoadcenterModel;
  breakers: Array<BreakerModel>;
  events: Array<any> = [];
  name: string;

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public devicesProvider: DevicesProvider
  ) {
    
    this.id = navParams.get('id');

    this.loadcenter = new LoadcenterModel(this.id);
    this.db.object('v1/devices/' + this.id + '/staticData/name/val').valueChanges().subscribe( val => { this.loadcenter.name = String(val) });
    this.db.object('v1/loadcenter/' + this.id).valueChanges().subscribe( val => { this.loadcenter.updateData(val) });

    this.devicesProvider.getBreakersByLoadcenterId(this.id).subscribe( breakers => {
      this.breakers = breakers;
    });

    this.devicesProvider.events.debounceTime(100).subscribe( events => {
      this.events = this.devicesProvider.getTimelineEventsByLoadcenterId(events,this.id);
    })

  }

  goToBreaker(id: number | string){
    this.navCtrl.push(BreakerPage,{
      "breakerId": id,
      "loadcenterId": this.id
    })
  }

  onLoadcenterEdit(){
    var editLoadcenterModal = this.modalCtrl.create('EditLoadcenterModalPage',{'loadcenterId':this.id});
    editLoadcenterModal.present();
  }

}
