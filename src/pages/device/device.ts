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

    this.db.object('v1/loadcenter/'+this.id+'/breakers').valueChanges().subscribe( breakers => {
      if (typeof breakers === 'undefined' || breakers === null) return;
      var breakerList = devicesProvider._truthyObjectToArray(breakers);
      this.breakers = [];
      this.events = [];
      breakerList.forEach( (breakerId, index) => {
        this.db.object('v1/breaker/' + breakerId).valueChanges().subscribe( (breaker: any) => {
          this.breakers.push({
            id: breakerId,
            object: breaker
          });

          this.db.object('v1/breaker/' + breakerId + '/events').valueChanges().subscribe(events => {
            if (typeof events === 'undefined' || events === null) return;
            var eventList = devicesProvider._truthyObjectToArray(events);
            eventList.forEach((eventId, index) => {
              this.db.object('v1/event/' + eventId).valueChanges().subscribe((event: any) => {
                this.events.push({
                  id: eventId,
                  title: (event.staticData && event.staticData.eventDescription && event.staticData.eventDescription.val) ? event.staticData.eventDescription.val : 'Unknown',
                  subTitle: this.loadcenter.name + ", " + breaker.staticData.loadType.val,
                  icon: (event.staticData && event.staticData.eventType && event.staticData.eventType.val) ? this._getTimelineIcon(event.staticData.eventType.val) : 'help',
                  type: (event.staticData && event.staticData.eventType && event.staticData.eventType.val) ? this._getTimelineType(event.staticData.eventType.val) : 'unknown',
                  timestamp: (event.staticData && event.staticData.time && event.staticData.time.val) ? event.staticData.time.val : null
                });
              });
            });
          });
        });
        
        

      });
    });

  }

  goToBreaker(id: number | string){
    this.navCtrl.push(BreakerPage,{
      "breakerId": id,
      "loadcenterId": this.id
    })
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

}
