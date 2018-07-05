import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

/**
 * Generated class for the WdFileInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wd-file-input',
  templateUrl: 'wd-file-input.html'
})
export class WdFileInputComponent {

  @Input() formControlName: string;
  @Output() fileChanged = new EventEmitter<File>();
  readyToUpload: boolean = false;
  file: File;

  constructor(private storage: AngularFireStorage) {
    
  }

  onFileChange(event: any){
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0];

      var reader = new FileReader();
      this.readyToUpload = true;

      reader.onload = function(e: any){  
        document.getElementById('wdFileInputPreview').style.backgroundImage = "url("+e.target.result+")";
      }

      reader.readAsDataURL(event.target.files[0]);

      this.fileChanged.emit(this.file);
    } else {
      this.readyToUpload = false;
    }
  }

  uploadFile(){
    // if(this.file){
    //   this.storage.ref('images/profile-images/')
    // }
  }

}
