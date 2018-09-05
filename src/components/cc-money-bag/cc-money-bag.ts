import { Component } from '@angular/core';

/**
 * Generated class for the CcMoneyBagComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cc-money-bag',
  templateUrl: 'cc-money-bag.html'
})
export class CcMoneyBagComponent {

  text: string;

  constructor() {
    console.log('Hello CcMoneyBagComponent Component');
    this.text = 'Hello World';
  }

}
