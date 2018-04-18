import { 
  Component, 
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';

/**
 * Generated class for the EtnEventTimelineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

interface Event {
  id: number | string;
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

  @Input() events: Array<any>;
  @Input() sortBy: (string | Array<string>) = "timestamp";
  @Input() log: boolean = false;
  private _events: Array<any>;

  constructor() {
    
  }

  ngOnChanges(changes: SimpleChanges){
    const events: SimpleChange = changes.events;
    if(typeof events.currentValue === 'undefined' || events.currentValue === null) return;
    this._events = events.currentValue.slice(0);
    if(this.sortBy === 'timestamp'){
      this._events.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return (b.timestamp - a.timestamp)
        } else {
          return 0;
        }
      });
    }
    if(this.log) console.log("[EtnEventTimelineComponent.ngOnChanges] _events:",this._events);
  }

}
