import { Component, Input } from '@angular/core';

/**
 * Generated class for the EtnSimpleIndicatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'etn-simple-indicator',
  templateUrl: 'etn-simple-indicator.html'
})
export class EtnSimpleIndicatorComponent {
  private _value: number;
  alarm: boolean;
  
  @Input() label: string;
  @Input() unit: string;
  @Input() pluralUnits: string;
  @Input() alarmThreshold: number = 1;
  @Input() 
  set value(value: number){
    this._value = value;
    if(value >= this.alarmThreshold){
      this.alarm = true;
    } else {
      this.alarm = false;
    }
  }
  get value(){
    return this._value;
  }
  
  constructor() {
    
  }

  _useSingleUnit(){
    return (this.value == 1);
  }

}
