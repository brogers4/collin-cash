import { AbstractControl } from '@angular/forms';

export class CustomValidation {

    static confirmPasswordValidator(AC: AbstractControl) {
        let password = AC.get('password').value;
        let confirmPassword = AC.get('confirmPassword').value;
        if(password != confirmPassword) {
            console.log("password mismatch");
            AC.get('confirmPassword').setErrors({MatchPassword: true});
        } else {
            console.log("password match");
            return null;
        }
    }

}