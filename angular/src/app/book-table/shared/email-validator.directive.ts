import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validateEmail][formControlName], [validateEmail][formControl],[validateEmail][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true },
    ],
})
export class EmailValidatorDirective implements Validator {
    validate(c: AbstractControl): { [key: string]: any } {
        return emailValidator(c.value) ? undefined : {
            validateEmail: {
                valid: false,
            },
        };
    }
}

// Function exported to be used in this directive and unit tests
export function emailValidator(c: AbstractControl): boolean {
    let regExp: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return regExp.test(c.value);
}
