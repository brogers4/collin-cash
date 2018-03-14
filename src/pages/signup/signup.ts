import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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

  private registerEmailAndPassword : FormGroup;
  private profileDetails : FormGroup;
  private summary: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {
    this.registerEmailAndPassword = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.profileDetails = this.formBuilder.group({
      displayName: ['', Validators.required],
      profileImageURL: ['', Validators.required]
    });
    this.summary = this.formBuilder.group({

    });
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter SignupPage");
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave SignupPage");
    this.menu.enable(true);
  }

  cancelSignup() {
    this.navCtrl.pop(null)
  }

  submitRegistration() {
    console.log("Submitting Registration!");
  }

}
