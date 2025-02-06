import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() control!: FormControl<string>;

  shouldShowError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
  
}
