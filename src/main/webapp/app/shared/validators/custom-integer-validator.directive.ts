import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[jhiCustomInteger][formControlName],[jhiCustomInteger][formControl],[jhiCustomInteger][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomIntegerDirective, multi: true}]
})
export class CustomIntegerDirective implements Validator {
  @Input()
  jhiCustomInteger: number;

  validate(c: FormControl): {[key: string]: any} {
      const v = c.value;
      return (!Number.isInteger(v)) ? {'jhiCustomInteger': true} : null;
  }
}
