import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group
} from '@angular/animations';

/**
 * Generated class for the WdEventTimelineComponent component.
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
  selector: 'wd-event-timeline',
  templateUrl: 'wd-event-timeline.html',
  animations: [
    trigger('eventAnim',[
      transition(':enter',[
        style({ transform: 'translateY(-56px)', height: '0px', margin: '0px', opacity: 0 }),
        animate('0.3s linear')
      ]),
      transition(':leave', [
        animate('0.3s linear', style({transform: 'translateY(-56px)', height: '0px', margin: '0px', opacity: 0}))
      ])
    ])
  ]
})
export class WdEventTimelineComponent {

  @Input() events: Array<any> = [];
  @Input() sortBy: (string | Array<string>) = "timestamp";
  @Input() limitTo: number = 0;
  @Input() startAt: number = 0;
  @Input() paginate: boolean = false;
  @Input() log: boolean = false;
  private _events: Array<any> = [];
  private _timelineEvents: Array<any> = [];
  private _startAt: number = 0;
  private _limitTo: number = 0;
  private _showNext: boolean = false;
  private _showPrev: boolean = false;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('events')){
      const events: SimpleChange = changes.events;
      if (typeof events.currentValue !== 'undefined' && events.currentValue !== null){
        // Create a shallow copy
        this._events = events.currentValue.slice();
        if (this.sortBy === 'timestamp') {
          // Sorts events by most recent first
          this._events.sort((a, b) => {
            if (a.timestamp && b.timestamp) {
              return (b.timestamp - a.timestamp)
            } else {
              return 0;
            }
          });
        }
        if (this.log) console.log("[WdEventTimelineComponent.ngOnChanges] _events:", this._events);
      }
    }

    // if(changes.hasOwnProperty('limitTo')){
    //   const limitTo: SimpleChange = changes.limitTo;
    //   if(typeof limitTo.currentValue !== 'undefined' && limitTo.currentValue !== null){
    //     if (limitTo.currentValue > 0) {
    //       if(typeof this._events !== 'undefined' && this._events !== null){
    //         this._events = this._events.slice(0, limitTo.currentValue);
    //       }
    //     }
    //   }
    //   if(this.log) console.log("[WdEventTimelineComponent.ngOnChanges] limitTo:", this.limitTo);
    // }

    this._updateTimeline();
    
  }

  onNext(){
    this._startAt = this._startAt+1;
    this._updateTimeline();
  }

  onPrev(){
    this._startAt = this._startAt-1;
    this._updateTimeline();
  }

  _updateTimeline(){
    if (typeof this._events !== 'undefined' && this._events !== null) {
      if (this.limitTo > 0) {
        let endAt = Number(this._startAt) + Number(this.limitTo);
        this._timelineEvents = this._events.slice(this._startAt, endAt);
        if (this._events.length > this._timelineEvents.length) {
          if (this._startAt > 0) {
            this._showPrev = true;
          } else {
            this._showPrev = false;
          }
          if (endAt < this._events.length) {
            this._showNext = true;
          } else {
            this._showNext = false;
          }
        }
      } else {
        this._timelineEvents = this._events.slice();
      }
    }
  }

}
