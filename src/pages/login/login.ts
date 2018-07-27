import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

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

  email: string;
  password: string;
  errorMessage: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public afAuth: AngularFireAuth
  ) {
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  signIn() {
    console.log("Signing in...");
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(
      user => {
        console.log("Successfully signed in:",user);
        this.navCtrl.setRoot(HomePage);
      }, error => {
        console.log("Error signing in:",error);
        if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found"){
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      }
    )
  }

  signUp() {
    console.log("Signing up...");
    this.navCtrl.push(SignupPage);
  }

}
