import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateGamePageComponent } from './create-game-page.component';
import { InputFieldComponent } from '../../components/atoms/input-field/input-field.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { HeaderBarComponent } from '../../components/molecules/header-bar/header-bar.component';

describe('CreateGamePageComponent', () => {
  let component: CreateGamePageComponent;
  let fixture: ComponentFixture<CreateGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        CreateGamePageComponent,  
        InputFieldComponent,
        ButtonComponent,
        HeaderBarComponent,
        ReactiveFormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario con el campo vacío', () => {
    expect(component.gameForm.value).toEqual({ name: '' });
  });

  it('Debe marcar el campo como inválido si está vacío', () => {
    component.nameControl.setValue('');
    expect(component.nameControl.valid).toBeFalse();
    expect(component.nameControl.hasError('required')).toBeTrue();
  });

  it('Debe ser inválido si tiene menos de 5 caracteres', () => {
    component.nameControl.setValue('abc');
    expect(component.nameControl.valid).toBeFalse();
    expect(component.nameControl.hasError('minlength')).toBeTrue();
  });

  it('Debe ser inválido si tiene más de 20 caracteres', () => {
    component.nameControl.setValue('a'.repeat(21));
    expect(component.nameControl.valid).toBeFalse();
    expect(component.nameControl.hasError('maxlength')).toBeTrue();
  });

  it('Debe ser inválido si tiene caracteres especiales', () => {
    component.nameControl.setValue('game#1');
    expect(component.nameControl.valid).toBeFalse();
    expect(component.nameControl.hasError('pattern')).toBeTrue();
  });

  it('Debe ser inválido si tiene más de 3 números', () => {
    component.nameControl.setValue('game1234');
    expect(component.nameControl.valid).toBeFalse();
    expect(component.nameControl.hasError('maxThreeNumbers')).toBeTrue();
  });

  it('Debe ser inválido si solo contiene números', () => {
    component.nameControl.setValue('123456');
    expect(component.nameControl.valid).toBeFalse();
    expect(component.nameControl.hasError('onlyNumbers')).toBeTrue();
  });

  it('Debe ser válido si cumple todas las reglas', () => {
    component.nameControl.setValue('game12');
    expect(component.nameControl.valid).toBeTrue();
  });

});
