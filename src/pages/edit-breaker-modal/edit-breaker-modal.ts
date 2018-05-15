import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BreakerModel } from '../../models/breaker-model';
import { ID } from '../../interfaces/devices';
import { DevicesProvider } from '../../providers/devices/devices';

/**
 * Generated class for the EditBreakerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-breaker-modal',
  templateUrl: 'edit-breaker-modal.html',
})
export class EditBreakerModalPage {

  private breakerDetails: FormGroup;
  breakerId: ID;
  breakerRef: any;
  breaker: BreakerModel;

  constructor(
    public viewCtrl: ViewController, 
    public toastCtrl: ToastController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public dp: DevicesProvider
  ) {

    this.breakerId = navParams.get('breakerId');

    this.breakerDetails = this.formBuilder.group({
      name: ['', Validators.required],
      loadType: ['', Validators.required]
    });

    if(this.breakerId){
      this.breakerRef = this.dp.getBreakerRef(this.breakerId);
      this.dp.getBreaker(this.breakerId).subscribe( breaker => {
        this.breaker = breaker;
        this.breakerDetails.controls['name'].setValue(breaker.getName());
        this.breakerDetails.controls['loadType'].setValue(breaker.getLoadType());
      })
    }
    
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submitForm(){
    let staticData = {};
    if(this.breakerDetails.get('name').dirty){
      Object.assign(staticData, {name: this.dp._tsVal(this.breakerDetails.get('name').value)});
    }
    if (this.breakerDetails.get('loadType').dirty) {
      Object.assign(staticData, {loadType: this.dp._tsVal(this.breakerDetails.get('loadType').value)});
    }
    if(Object.keys(staticData).length !== 0){
      this.dp.getBreakerRef(this.breakerId,'staticData').update(staticData)
        .then(success => {
          console.log("Successfully updated breaker data:", staticData)
          let toast = this.toastCtrl.create({
            message: "Successfull updated breaker data.",
            duration: 3000,
            // showCloseButton: true,
            cssClass: "toast-success"
          })
          toast.present();
          this.dismiss();
        })
        .catch(err => {
          console.log("Error updating breaker data:",err);
          let toast = this.toastCtrl.create({
            message: "Error updating breaker data: "+err,
            showCloseButton: true,
            cssClass: "toast-error"
          })
          toast.present();
        })
    } else {
      console.log("No changes made. Dismissing.");
      this.dismiss();
    }
    
  }

}
