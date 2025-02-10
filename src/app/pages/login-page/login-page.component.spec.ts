import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../components/atoms/input-field/input-field.component';
import { RadioButtonComponent } from '../../components/atoms/radio-button/radio-button.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoginPageComponent,
        CommonModule,
        InputFieldComponent,
        RadioButtonComponent,
        ButtonComponent,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores por defecto', () => {
    expect(component.loginForm.value).toEqual({ name: '', role: 'player' });
  });

  it('debería marcar el formulario como inválido si el nombre está vacío', () => {
    component.loginForm.controls.name.setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('debería validar que el nombre tenga entre 5 y 20 caracteres', () => {
    component.loginForm.controls.name.setValue('abc');
    expect(component.loginForm.controls.name.valid).toBeFalse();

    component.loginForm.controls.name.setValue('abcdefghijklmnopqrstuv');
    expect(component.loginForm.controls.name.valid).toBeFalse();
  });

  it('debería llamar al método login del AuthService al enviar el formulario válido', () => {
    component.loginForm.controls.name.setValue('UsuarioValido');
    component.loginForm.controls.role.setValue('admin');

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      name: 'UsuarioValido',
      role: 'admin',
    });
  });

  it('no debería llamar a login si el formulario es inválido', () => {
    component.loginForm.controls.name.setValue('');

    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
