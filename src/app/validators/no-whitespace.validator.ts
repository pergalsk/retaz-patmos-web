import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value !== 'string') {
      return null;
    }

    if (control.value === '') {
      return null;
    }

    if (control.value.trim() !== '') {
      return null;
    }

    return { whitespace: true };
  };
}
