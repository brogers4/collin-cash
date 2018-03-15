import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { CustomValidation } from '../../models/custom-validation';

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

  private emailForm : FormGroup;
  private profileForm : FormGroup;
  private summaryForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: CustomValidation.confirmPasswordValidator
    });
    this.profileForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      profileImageURL: ['', Validators.required]
    });
    this.summaryForm = this.formBuilder.group({

    });
  }

  confirmPasswordValidator(group: FormControl) {
    return (group.value.password === group.value.confirmPassword) ? { 'confirmPassword': true } : null;
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
