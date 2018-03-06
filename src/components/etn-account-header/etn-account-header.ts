import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generated class for the EtnAccountHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'etn-account-header',
  templateUrl: 'etn-account-header.html'
})
export class EtnAccountHeaderComponent {
  @Output() onLogout: EventEmitter<any> = new EventEmitter();
  @Input() user: any;

  constructor() {
    console.log('Hello EtnAccountHeaderComponent Component');
  }

  logoutClicked() {
    this.onLogout.emit();
  }

}
