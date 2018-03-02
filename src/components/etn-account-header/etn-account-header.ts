import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello EtnAccountHeaderComponent Component');
    this.text = 'Hello World';
  }

}
