import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { noWhitespaceValidator } from './no-whitespace.validator';

@Directive({
  selector: '[noWhitespace]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }],
  standalone: true,
})
export class NoWhitespaceDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return noWhitespaceValidator()(control);
  }
}
