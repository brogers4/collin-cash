import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { ApiProvider } from '../../providers/api/api';
import { Loadcenter, Breaker, ID } from '../../interfaces/devices';
import { AngularFireDatabase } from 'angularfire2/database';
import { BreakerModel } from '../../models/breaker-model';

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
  breaker: BreakerModel;
  loadcenterId: ID;
  loadcenterName: any;
  events: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public devicesProvider: DevicesProvider,
    public api: ApiProvider
  ) {

    this.id = navParams.get('breakerId');
    this.loadcenterId = navParams.get('loadcenterId');

    this.breaker = new BreakerModel(this.id);

    this.devicesProvider.getBreaker(this.id).subscribe( breaker => {
      this.breaker = breaker;
    })

    this.db.object('v1/devices/'+this.loadcenterId+'/staticData/name/val').valueChanges().subscribe(val=>{this.loadcenterName=val;})

    this.devicesProvider.events.debounceTime(100).subscribe(events => {
      this.events = this.devicesProvider.getTimelineEventsByBreakerId(events, this.id);
    })
  }

  openBreaker(){
    this.api.openLoadcenterBreaker(this.loadcenterId, this.breaker.getCircuitNumber()).then(
      req => {
        console.log("Successfully sent open breaker command.");
      },
      err => {
        console.log("Error sending open breaker command:",err);
      }
    );
  }

  closeBreaker(){
    this.api.closeLoadcenterBreaker(this.loadcenterId, this.breaker.getCircuitNumber()).then(
      req => {
        console.log("Successfully sent close breaker command.");
      },
      err => {
        console.log("Error sending close breaker command:",err);
      }
    );
  }

  clearFault(){
    this.api.clearLoadcenterBreakerFault(this.loadcenterId, this.breaker.getCircuitNumber()).then(
      req => {
        console.log("Successfully sent clear fault command.");
      },
      err => {
        console.log("Error sending clear fault command:",err);
      }
    )
  }

  onBreakerEdit(){
    var editBreakerModal = this.modalCtrl.create('EditBreakerModalPage',{'breakerId':this.id});
    editBreakerModal.present();
  }

}
