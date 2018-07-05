import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadcenterModel } from '../../models/loadcenter-model';
import { DeviceModel } from '../../models/device-model';
import { ID } from '../../interfaces/devices';
import { DevicesProvider } from '../../providers/devices/devices';

/**
 * Generated class for the EditLoadcenterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-loadcenter-modal',
  templateUrl: 'edit-loadcenter-modal.html',
})
export class EditLoadcenterModalPage {

  private loadcenterDetails: FormGroup;
  loadcenterId: ID;
  loadcenterRef: any;
  loadcenter: LoadcenterModel;
  device: DeviceModel;

  constructor(
    public viewCtrl: ViewController, 
    public toastCtrl: ToastController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public dp: DevicesProvider
  ) {

    this.loadcenterId = navParams.get('loadcenterId');

    this.loadcenterDetails = this.formBuilder.group({
      name: ['', Validators.required]
    });

    if(this.loadcenterId){
      this.dp.getDevice(this.loadcenterId).subscribe( device => {
        this.device = device;
        this.loadcenterDetails.controls['name'].setValue(device.getName());
      })
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitForm() {
    let staticData = {};
    if(this.loadcenterDetails.get('name').dirty){
      Object.assign(staticData, {name: this.dp._tsVal(this.loadcenterDetails.get('name').value)});
    }

    if(Object.keys(staticData).length !== 0){
      this.dp.getDeviceRef(this.loadcenterId,'staticData').update(staticData)
        .then(success => {
          console.log("Successfully updated loadcenter data:", staticData)
          let toast = this.toastCtrl.create({
            message: "Successfully updated loadcenter data.",
            duration: 3000,
            // showCloseButton: true,
            cssClass: "toast-success"
          })
          toast.present();
          this.dismiss();
        })
        .catch(err => {
          console.log("Error updating loadcenter data:", err);
          let toast = this.toastCtrl.create({
            message: "Error updating loadcenter data: " + err,
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
