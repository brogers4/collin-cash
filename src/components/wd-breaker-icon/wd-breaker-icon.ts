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

  _status: string = '';
  icon: string;

  @Input() set status(status: string) {
    console.log("wd-breaker-icon set status:",status);
    this._status = status.toLowerCase();
    this.icon = this._getBreakerIconByStatus(this._status);
  }
  get status(): string { return this._status };

  _statusBreakerIcons: any = {
    "closed": "breaker-closed",
    "open": "breaker-open",
    "fault": "breaker-fault",
    "tripped": "breaker-open-handle"
  }

  constructor() {
    
  }

  _getBreakerIconByStatus(status: string) {
    if (status in this._statusBreakerIcons) {
      return this._statusBreakerIcons[status];
    } else return "etn-help";
  }

}
