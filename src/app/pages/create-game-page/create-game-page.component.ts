import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { maxThreeNumbersValidator, onlyNumbersValidator } from '../../utils/validators/game-name.validator';
import { InputFieldComponent } from '../../components/atoms/input-field/input-field.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { HeaderBarComponent } from '../../components/molecules/header-bar/header-bar.component';

interface GameForm {
  name: FormControl<string>;
}

@Component({
  selector: 'app-create-game-page', 
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.css'],
  imports:[InputFieldComponent,ButtonComponent,HeaderBarComponent,ReactiveFormsModule] 
})
export class CreateGamePageComponent {
  
  gameForm = new FormGroup<GameForm>({
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
    })
  });

  get nameControl() {
    return this.gameForm.controls.name;
  }
  
}
