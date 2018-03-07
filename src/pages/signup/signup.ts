import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public afAuth: AngularFireAuth
  ) {
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter SignupPage");
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave SignupPage");
    this.menu.enable(true);
  }

}
