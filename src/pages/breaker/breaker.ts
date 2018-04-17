import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter, Breaker, ID } from '../../interfaces/devices';
import { AngularFireDatabase } from 'angularfire2/database';

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
    // this.loadcenterId = navParams.get('loadcenterId');
    // this.breakerId = navParams.get('breakerId');
    // this.loadcenter = devicesProvider.getLoadcenterById(this.loadcenterId);
    // this.breaker = devicesProvider.getBreakerById(this.loadcenterId,this.breakerId);
    this.id = navParams.get('breakerId');
    this.loadcenterId = navParams.get('loadcenterId');

    this.breaker = this.db.object('v1/breaker/'+this.id).valueChanges();
    this.db.object('v1/breaker/' + this.id + '/staticData/loadType/val').valueChanges().subscribe(val => { this.loadType = val; });
    this.db.object('v1/breaker/' + this.id + '/staticData/circuitNumber/val').valueChanges().subscribe(val => { this.circuitNumber = val; });
    this.db.object('v1/breaker/' + this.id + '/dynamicData/state/val').valueChanges().subscribe(val => { this.state = val; });
    this.db.object('v1/breaker/' + this.id + '/dynamicData/status/val').valueChanges().subscribe(val=>{this.status=val;});

    this.db.object('v1/devices/'+this.loadcenterId+'/staticData/name/val').valueChanges().subscribe(val=>{this.loadcenterName=val;})

    this.db.object('v1/breaker/'+this.id+'/events').valueChanges().subscribe( events => {
      var eventList = devicesProvider._truthyObjectToArray(events);
      this.events = [];
      eventList.forEach( (eventId, index) => {
        this.db.object('v1/event/' + eventId).valueChanges().subscribe( (event: any) => {
          if(typeof event === 'undefined' || event === null) return;
          this.events.push({
            id: eventId,
            title: (event.staticData && event.staticData.eventDescription && event.staticData.eventDescription.val) ? event.staticData.eventDescription.val : 'Unknown',
            subTitle: this.loadcenterName+", "+this.loadType,
            icon: (event.staticData && event.staticData.eventType && event.staticData.eventType.val) ? this._getTimelineIcon(event.staticData.eventType.val) : 'help',
            type: (event.staticData && event.staticData.eventType && event.staticData.eventType.val) ? this._getTimelineType(event.staticData.eventType.val) : 'unknown',
            timestamp: (event.staticData && event.staticData.time && event.staticData.time.val) ? event.staticData.time.val : null
          })
        })
      })
    })
  }

  _getTimelineIcon(eventType: string){
    switch(eventType){
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
