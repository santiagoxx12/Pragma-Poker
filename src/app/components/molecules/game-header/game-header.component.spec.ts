import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameHeaderComponent } from './game-header.component';
import { AuthService } from '../../../utils/services/auth.service';
import { CommonModule } from '@angular/common';

class MockAuthService {
  logout = jasmine.createSpy('logout');
}

describe('GameHeaderComponent', () => {
  let componente: GameHeaderComponent;
  let fixture: ComponentFixture<GameHeaderComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    authService = new MockAuthService();

    await TestBed.configureTestingModule({
      imports: [CommonModule, GameHeaderComponent],
      providers: [{ provide: AuthService, useValue: authService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHeaderComponent);
    componente = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería devolver las iniciales correctas para nombres con dos palabras', () => {
    componente.userName = 'Juan Pérez';
    expect(componente.userInitials).toBe('JP');
  });

  it('debería devolver las iniciales correctas para un solo nombre', () => {
    componente.userName = 'Alicia';
    expect(componente.userInitials).toBe('AL');
  });

  it('debería devolver una cadena vacía para un nombre vacío', () => {
    componente.userName = '';
    expect(componente.userInitials).toBe('');
  });

  it('debería formatear correctamente el nombre de la sala', () => {
    componente.roomName = 'sala-juego-123';
    expect(componente.formattedRoomName).toBe('sala');
  });

  it('debería llamar a authService.logout cuando se invoque logout', () => {
    componente.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
