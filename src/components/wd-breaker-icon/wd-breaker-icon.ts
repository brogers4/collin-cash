import { Component, Input } from '@angular/core';

/**
 * Generated class for the WdBreakerIconComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wd-breaker-icon',
  templateUrl: 'wd-breaker-icon.html'
})
export class WdBreakerIconComponent {

  _state: string = '';
  icon: string;

  @Input() set state(state: string) {
    if (typeof state === 'undefined' || state === null) return;
    this._state = state.toLowerCase();
    this.icon = this._getBreakerIconBystate(this._state);
  }
  get state(): string { return this._state };

  _stateBreakerIcons: any = {
    "closed": "breaker-closed",
    "open": "breaker-open",
    "fault": "breaker-fault",
    "tripped": "breaker-open-handle"
  }

  constructor() {
    
  }

  _getBreakerIconBystate(state: string) {
    if (state in this._stateBreakerIcons) {
      return this._stateBreakerIcons[state];
    } else return "etn-help";
  }

}
