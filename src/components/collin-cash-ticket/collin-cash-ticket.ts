import { Component, Input } from '@angular/core';

/**
 * Generated class for the CollinCashTicketComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'collin-cash-ticket',
  templateUrl: 'collin-cash-ticket.html'
})
export class CollinCashTicketComponent {

  @Input() value: number;
  state: string = "inactive";

  constructor() {
  }

  setState = function(_state: string){
    this.state = _state;
  }

}
