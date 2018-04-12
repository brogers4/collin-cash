import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesProvider } from '../../providers/devices/devices';
import { Loadcenter, Breaker } from '../../interfaces/devices';

/**
 * Generated class for the BreakerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-breaker',
  templateUrl: 'breaker.html',
})
export class BreakerPage {

  loadcenterId: number | string;
  breakerId: number | string;
  loadcenter: Loadcenter;
  breaker: Breaker = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public devicesProvider: DevicesProvider
  ) {
    this.loadcenterId = navParams.get('loadcenterId');
    this.breakerId = navParams.get('breakerId');
    this.loadcenter = devicesProvider.getDeviceById(this.loadcenterId);
    this.breaker = devicesProvider.getBreakerById(this.loadcenterId,this.breakerId);
  }

}
