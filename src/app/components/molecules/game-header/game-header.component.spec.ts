import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameHeaderComponent } from './game-header.component';
import { AuthService } from '../../../utils/services/auth.service';
import { GameService } from '../../../utils/services/game.service';
import { of } from 'rxjs';

describe('GameHeaderComponent', () => {
  let component: GameHeaderComponent;
  let fixture: ComponentFixture<GameHeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockGameService: jasmine.SpyObj<GameService>;

  const mockGameState = {
    isVotingEnabled: true,
    currentVotingSystem: ['0', '1', '2', '3', '5', '8', '13'],
    players: [],
    roomName: '',
    selectedCards: {},
    isRevealing: false,
    averageVote: null,
    voteCount: {}
  };

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
    mockGameService = jasmine.createSpyObj('GameService',
      ['changeVotingSystem'],
      { gameState$: of(mockGameState) }
    );

    await TestBed.configureTestingModule({
      imports: [GameHeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: GameService, useValue: mockGameService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.showInviteModal).toBeFalse();
      expect(component.showChangeVotingModal).toBeFalse();
      expect(component.currentVotingSystem).toBe('power');
      expect(component.cardsAreRevealed).toBeFalse();
      expect(component.canChangeVotingSystem).toBeTrue();
    });
  });

  describe('Funcionalidad de iniciales de usuario', () => {
    it('debería retornar string vacío si no hay nombre de usuario', () => {
      component.userName = '';
      expect(component.userInitials).toBe('');
    });

    it('debería retornar las iniciales de dos palabras si el nombre tiene dos o más palabras', () => {
      component.userName = 'Juan Pérez';
      expect(component.userInitials).toBe('JP');
    });

    it('debería retornar las dos primeras letras si el nombre tiene una sola palabra', () => {
      component.userName = 'Juan';
      expect(component.userInitials).toBe('JU');
    });

    it('debería manejar espacios múltiples en el nombre', () => {
      component.userName = '  Juan   Pérez  ';
      expect(component.userInitials).toBe('JP');
    });
  });

  describe('Formato del nombre de la sala', () => {
    it('debería retornar la primera parte del nombre de la sala antes del guión', () => {
      component.roomName = 'sala-test-123';
      expect(component.formattedRoomName).toBe('sala');
    });

    it('debería retornar el nombre completo si no hay guión', () => {
      component.roomName = 'salatest';
      expect(component.formattedRoomName).toBe('salatest');
    });
  });

  describe('Interacciones con servicios', () => {
    it('debería llamar al logout del AuthService', () => {
      component.logout();
      expect(mockAuthService.logout).toHaveBeenCalled();
    });

    it('debería llamar al changeVotingSystem del GameService con el sistema seleccionado', () => {
      component.onVotingSystemChanged('fibonacci');
      expect(mockGameService.changeVotingSystem).toHaveBeenCalledWith('fibonacci');
    });

  });
});
