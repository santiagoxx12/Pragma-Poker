import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonComponent } from '../../components/atoms/radio-button/radio-button.component'; // Asegúrate de que la ruta es correcta
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { InputFieldComponent } from '../../components/atoms/input-field/input-field.component';
import { Router } from '@angular/router';
import { maxThreeNumbersValidator, onlyNumbersValidator } from '../../utils/validators/game-name.validator';
import { AuthService } from '../../utils/services/auth.service';


interface LoginForm {
  name: FormControl<string>;
  role: FormControl<'admin' | 'player'>;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    RadioButtonComponent,
    ButtonComponent
  ]
})
export class LoginPageComponent {
  loginForm = new FormGroup<LoginForm>({
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
    role: new FormControl<'admin' | 'player'>('player', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  get nameControl() {
    return this.loginForm.controls.name;
  }

  get roleControl() {
    return this.loginForm.controls.role;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = {
        name: this.nameControl.value,
        role: this.roleControl.value
      };

      this.authService.login(userData);

      // this.router.navigate(['/create-game']);
    }
  }
}
