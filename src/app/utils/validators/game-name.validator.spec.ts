import { FormControl } from '@angular/forms';
import { maxThreeNumbersValidator, onlyNumbersValidator } from './game-name.validator';
describe('Game Name Validators', () => { 
  describe('maxThreeNumbersValidator', () => { 
    it('Debe retornar null si el valor tiene 3 o menos números', () => {
      const control = new FormControl('abc123');
      expect(maxThreeNumbersValidator(control)).toBeNull();
    });
    it('Debe retornar error si el valor tiene más de 3 números', () => {
      const control = new FormControl('abc1234');
      expect(maxThreeNumbersValidator(control)).toEqual({ maxThreeNumbers: true });
    });
    it('Debe retornar null si no hay números en el valor', () => {
      const control = new FormControl('abcdef');
      expect(maxThreeNumbersValidator(control)).toBeNull();
    });
  });
  describe('onlyNumbersValidator', () => {
    it('Debe retornar error si el valor contiene solo números', () => {
      const control = new FormControl('123456');
      expect(onlyNumbersValidator(control)).toEqual({ onlyNumbers: true });
    });
    it('Debe retornar null si el valor contiene letras y números', () => {
      const control = new FormControl('abc123');
      expect(onlyNumbersValidator(control)).toBeNull();
    });
    it('Debe retornar null si el valor solo tiene letras', () => {
      const control = new FormControl('abcdef');
      expect(onlyNumbersValidator(control)).toBeNull();
    });
  });
});
