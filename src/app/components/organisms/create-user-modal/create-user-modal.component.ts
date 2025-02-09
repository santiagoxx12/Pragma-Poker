import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { maxThreeNumbersValidator, onlyNumbersValidator } from '../../../utils/validators/game-name.validator';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { RadioButtonComponent } from '../../atoms/radio-button/radio-button.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { AuthService } from '../../../utils/services/auth.service';

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
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent implements OnInit {
  @Output() userCreated = new EventEmitter<{ name: string; viewMode: string; isAdmin: boolean; isOwner: boolean; }>();
  @Output() close = new EventEmitter<void>();


  constructor(
      private readonly authService: AuthService,

    ) {}

  userForm = new FormGroup<UserForm>({
    name: new FormControl({ value: '', disabled: true },{
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

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.nameControl.setValue(user.name);
    }
  }

  onSubmit() {
    this.authService.isAdmin$().subscribe(isAdmin => {
      const userData = {
        name: this.nameControl.value,
        viewMode: this.viewModeControl.value,
        isAdmin: isAdmin,
        isOwner: true
      };
      this.userCreated.emit(userData);
      this.close.emit();
    });
  }

}
