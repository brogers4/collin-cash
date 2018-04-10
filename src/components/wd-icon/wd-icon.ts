import { Component, Input } from '@angular/core';

/**
 * Generated class for the WdIconComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wd-icon',
  templateUrl: 'wd-icon.html'
})
export class WdIconComponent {

  @Input() name: string;

  constructor() {

  }

}
