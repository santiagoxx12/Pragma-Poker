import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGamePageComponent } from './create-game-page.component';
import { Router } from '@angular/router';
import { GameService } from '../../utils/services/game.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../components/atoms/input-field/input-field.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { CommonModule } from '@angular/common';

describe('Componente CreateGamePage', () => {
  let component: CreateGamePageComponent;
  let fixture: ComponentFixture<CreateGamePageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockGameService: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockGameService = jasmine.createSpyObj('GameService', ['createGame']); // Se agregan métodos de servicio

    await TestBed.configureTestingModule({
      imports: [CreateGamePageComponent, CommonModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GameService, useValue: mockGameService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crearse', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar el formulario con un campo de nombre vacío', () => {
      expect(component.gameForm.value.name).toBe('');
    });
  });

  describe('Validaciones del formulario', () => {
    it('debería marcar inválido si el nombre está vacío', () => {
      component.nameControl.setValue('');
      expect(component.nameControl.valid).toBeFalse();
    });

    it('debería marcar inválido si el nombre tiene menos de 5 caracteres', () => {
      component.nameControl.setValue('abc');
      expect(component.nameControl.valid).toBeFalse();
    });

    it('debería marcar inválido si el nombre tiene más de 20 caracteres', () => {
      component.nameControl.setValue('a'.repeat(21));
      expect(component.nameControl.valid).toBeFalse();
    });

    it('debería marcar inválido si el nombre contiene caracteres especiales', () => {
      component.nameControl.setValue('nombre@123');
      expect(component.nameControl.valid).toBeFalse();
    });
  });

    it('no debería navegar si el formulario es inválido', () => {
      component.nameControl.setValue('');
      component.onGameCreate();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

