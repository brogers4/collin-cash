import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DevicesProvider } from '../../providers/devices/devices';
import { BreakerModel } from '../../models/breaker-model';
import { EventModel } from '../../models/event-model';
import { BreakerPage } from '../breaker/breaker';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  public activeFaultBreakers: Array<BreakerModel>;
  public timelineEvents: Array<any>;
  public numActiveFaultBreakers: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public devicesProvider: DevicesProvider
  ) {

    this.devicesProvider.getBreakersWithActiveFaults().subscribe( breakers => {
      this.activeFaultBreakers = breakers;
      this.numActiveFaultBreakers = breakers.length;
      this.activeFaultBreakers.forEach( (breaker, index) => {
        this.devicesProvider.getDeviceName(breaker.getLoadcenterId()).subscribe( name => {
          this.activeFaultBreakers[index].loadcenterName = name;
        })
      })
    })

    this.devicesProvider.timelineEvents.debounceTime(100).subscribe(timelineEvents => {
      this.timelineEvents = timelineEvents;
    })

  }

  goToBreaker(breaker: BreakerModel) {
    this.navCtrl.push(BreakerPage, {
      "breakerId": breaker.id,
      "loadcenterId": breaker.getLoadcenterId()
    })
  }

}
