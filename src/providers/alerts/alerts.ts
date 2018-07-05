import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DevicesProvider } from '../devices/devices';
import { BreakerModel } from '../../models/breaker-model';

import 'rxjs/add/operator/pairwise';

/*
  Generated class for the AlertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertsProvider {

  public alerts: Observable<Array<any>>;
  public alertCount: Observable<number>;
  public activeFaultBreakerAlerts: Observable<Array<any>>;
  public activeFaultBreakerAlertCount: Observable<number>;

  constructor(
    public devicesProvider: DevicesProvider
  ) {
    
    this.activeFaultBreakerAlerts = new Observable( observer => {
      this.devicesProvider.getBreakersWithActiveFaults().subscribe(breakers => {
        var activeFaultBreakerAlerts = [];
        breakers.forEach( breaker => {
          activeFaultBreakerAlerts.push({
            id: this._generateUID(),
            type: "ACTIVE_FAULT_BREAKER",
            title: "Breaker Fault",
            description: `${breaker.getName()}, ${breaker.getStatus()}`,
            item: breaker
          });
          observer.next(activeFaultBreakerAlerts);
        });
        observer.next(activeFaultBreakerAlerts);
      });
    })

    this.activeFaultBreakerAlertCount = new Observable( observer => {
      this.activeFaultBreakerAlerts.subscribe( alerts => {
        observer.next(alerts.length);
      });
    });
    
    this.alerts = new Observable( observer => {
      var alerts = [];

      this.activeFaultBreakerAlerts.pairwise().subscribe( _alerts => {
        let oldAlerts = _alerts[0];
        let newAlerts = _alerts[1];
        oldAlerts.forEach( alert => {
          if(this._getIndexOfArrayById(newAlerts,alert.id) === -1){
            this._removeFromArrayById(alerts,alert.id);
          }
        });
        newAlerts.forEach( alert => {
          let index = this._getIndexOfArrayById(alerts,alert.id);
          if(index === -1){
            alerts.push(alert);
          } else {
            alerts[index] = alert;
          }
        });
        observer.next(alerts);
      });
      observer.next(alerts);

    });

    this.alertCount = new Observable( observer => {
      this.alerts.subscribe( alerts => {
        observer.next(alerts.length);
      });
    });

  }

  _generateUID(){
    return Date.now().toString(16);
  }

  _removeFromArrayById(arr: Array<any>, id: string) {
    let index = this._getIndexOfArrayById(arr,id);
    arr.splice(index,1);
    return arr;
  }

  _getIndexOfArrayById(arr: Array<any>, id: string) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return i;
    }
    return -1;
  }

}
