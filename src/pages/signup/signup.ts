import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,CustomValidation.strongPassword]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: CustomValidation.passwordMatch
    });
    this.profileForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      profileImageURL: ['', Validators.required]
    });
    this.summaryForm = this.formBuilder.group({

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
    if(this.emailForm.valid && this.profileForm.valid){
      this.afAuth.auth.createUserWithEmailAndPassword(this.emailForm.value.email,this.emailForm.value.password).then(
        user => {
          console.log("Successfully created user.");
          user.updateProfile({
            displayName: this.profileForm.value.displayName,
            photoURL: this.profileForm.value.profileImageURL
          }).then(
            () => {
              console.log("Successfully updated user profile.");
              let alert = this.alertCtrl.create({
                title: 'Success!',
                subTitle: 'User account and profile created successfully.',
                buttons: [{
                  text: 'OK',
                  handler: data => {
                    this.navCtrl.setRoot(HomePage);
                  }
                }]
              });
              alert.present();
            }, error => {
              console.log("Error updating user profile:",error);
              let alert = this.alertCtrl.create({
                subTitle: 'Your user account was created successfully, but there were issues updating your profile. Please try updating your profile again within the app.',
                buttons: [{
                  text: 'OK',
                  handler: data => {
                    this.navCtrl.setRoot(HomePage);
                  }
                }]
              });
              alert.present();
            }
          )
        }, error => {
          console.log("Error creating user:",error);
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'There was an error creating your account: '+error,
            buttons: ['OK']
          });
          alert.present();
        }
      )
    }
    console.log("Submitting Registration!");
  }

}
