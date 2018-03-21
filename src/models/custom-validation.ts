import { FormControl, AbstractControl } from '@angular/forms';

export class CustomValidation {

    static passwordMatch(AC: AbstractControl) {
        let password = AC.get('password').value;
        let confirmPassword = AC.get('confirmPassword').value;
        if(password != confirmPassword) {
            AC.get('confirmPassword').setErrors({passwordMatch: true});
        } else {
            return null;
        }
    }

    static strongPassword(control: FormControl) {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let hasSymbol = /[-+_!@#$%^&*=.,?<>~]/.test(control.value);
        if(hasUpper && hasLower && (hasNumber || hasSymbol)){
            return null;
        } else {
            return { strongPassword: true }
        }
    }

    static hasNumberOrSymbol(control: FormControl) {
        let hasNumber = /\d/.test(control.value);
        let hasSymbol = /[-+_!@#$%^&*=.,?<>~]/.test(control.value);
        if(hasNumber || hasSymbol) {
            return null;
        } else {
            return { hasNumberOrSymbol: true }
        }
    }

    static hasUpper(control: FormControl) {
        let hasUpper = /[A-Z]/.test(control.value);
        if(hasUpper) {
            return null;
        } else {
            return { hasUpper: true }
        }
    }

    static hasLower(control: FormControl) {
        let hasLower = /[a-z]/.test(control.value);
        if(hasLower) {
            return null;
        } else {
            return { hasLower: true }
        }
    }

}