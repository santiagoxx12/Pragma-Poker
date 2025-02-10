import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserModalComponent } from './create-user-modal.component';
import { AuthService } from '../../../utils/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { RadioButtonComponent } from '../../atoms/radio-button/radio-button.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';

describe('CreateUserModalComponent', () => {
  let component: CreateUserModalComponent;
  let fixture: ComponentFixture<CreateUserModalComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isAdmin$: () => of(false)
    };

    await TestBed.configureTestingModule({
      imports: [
        CreateUserModalComponent,
        CommonModule,
        ReactiveFormsModule,
        InputFieldComponent,
        RadioButtonComponent,
        ButtonComponent
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crearse correctamente', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('Validación del formulario', () => {
    it('debería marcar el campo nombre como inválido si está vacío', () => {
      component.nameControl.setValue('');
      expect(component.nameControl.valid).toBeFalse();
    });

    it('debería marcar el campo nombre como inválido si tiene menos de 5 caracteres', () => {
      component.nameControl.setValue('abc');
      expect(component.nameControl.valid).toBeFalse();
    });
  });

  describe('Envío del formulario', () => {
    it('debería emitir el evento userCreated con los datos del usuario', () => {
      spyOn(component.userCreated, 'emit');
      spyOn(component.close, 'emit');

      component.nameControl.setValue('Usuario123');
      component.viewModeControl.setValue('player');

      component.onSubmit();

      expect(component.userCreated.emit).toHaveBeenCalledWith({
        name: 'Usuario123',
        viewMode: 'player',
        isAdmin: false,
        isOwner: true
      });
      expect(component.close.emit).toHaveBeenCalled();
    });
  });
});
