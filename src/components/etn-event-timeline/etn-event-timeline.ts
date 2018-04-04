import { Component } from '@angular/core';

/**
 * Generated class for the EtnEventTimelineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

interface Event {
  title: string;
  subTitle?: string;
  icon?: string;
  description?: string;
  type?: string;
  timestamp?: number;
}

@Component({
  selector: 'etn-event-timeline',
  templateUrl: 'etn-event-timeline.html'
})
export class EtnEventTimelineComponent {

  events: Array<Event>;

  constructor() {
    this.events = [
      {
        title: "Breaker Opened",
        subTitle: "Loadcenter 2, Breaker 2",
        icon: "alert",
        type: "warning",
        timestamp: 1522870722005
      },{
        title: "Overload Trip",
        subTitle: "Loadcenter 1, Breaker 2",
        icon: "flash",
        type: "danger",
        timestamp: 1522870571745
      },{
        title: "Arc Fault",
        subTitle: "Loadcenter 1, Breaker 3",
        icon: "flash",
        type: "danger",
        timestamp: 1522870287566
      }
    ]
  }

}
