import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { maxThreeNumbersValidator, onlyNumbersValidator } from '../../../utils/validators/game-name.validator';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { RadioButtonComponent } from '../../atoms/radio-button/radio-button.component';
import { ButtonComponent } from '../../atoms/button/button.component';


interface UserForm {
  name: FormControl<string>;
  viewMode: FormControl<string>;
}
@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    RadioButtonComponent,
    ButtonComponent
  ],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.css'
})
export class CreateUserModalComponent {
  @Output() userCreated = new EventEmitter<{name: string, viewMode: string, isAdmin: boolean}>();
  @Output() close = new EventEmitter<void>();

  userForm = new FormGroup<UserForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]*$/),
        maxThreeNumbersValidator,
        onlyNumbersValidator
      ]
    }),
    viewMode: new FormControl('player', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  get nameControl() {
    return this.userForm.controls.name;
  }

  get viewModeControl() {
    return this.userForm.controls.viewMode;
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userCreated.emit({
        name: this.nameControl.value,
        viewMode: this.viewModeControl.value,
        isAdmin: true
      });
    }
  }
}