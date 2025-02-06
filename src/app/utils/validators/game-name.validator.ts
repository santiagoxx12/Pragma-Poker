import { AbstractControl, ValidationErrors } from '@angular/forms';

export function maxThreeNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  const digitCount = (value.match(/\d/g) || []).length;
  return digitCount > 3 ? { maxThreeNumbers: true } : null;
}

export function onlyNumbersValidator(control: AbstractControl): ValidationErrors | null {
  return /^\d+$/.test(control.value) ? { onlyNumbers: true } : null;
}

