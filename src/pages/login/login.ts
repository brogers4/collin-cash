import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController
  ) {
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter LoginPage");
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave LoginPage");
    this.menu.enable(true);
  }

  signIn() {
    console.log("Signing in...");
    this.navCtrl.setRoot(HomePage);
  }

  signUp() {
    console.log("Signing up...");
    this.navCtrl.push(SignupPage);
  }

}
