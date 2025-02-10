import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameTableComponent } from './game-table.component';
import { PlayerAvatarComponent } from '../../atoms/player-avatar/player-avatar.component';
import { GameService } from '../../../utils/services/game.service';
import { AuthService } from '../../../utils/services/auth.service';
import { of } from 'rxjs';
import { GameState, Player } from '../../../interfaces/game.interface';

describe('Componente GameTable', () => {
  let component: GameTableComponent;
  let fixture: ComponentFixture<GameTableComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', ['revealCards', 'resetGame'], {
      gameState$: of({
        players: [],
        roomName: '',
        currentVotingSystem: [],
        selectedCards: {},
        isVotingEnabled: true,
        isRevealing: false,
        averageVote: null,
        voteCount: {}
      } as GameState)
    });

    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      currentUser$: of({ isAdmin: true })
    });

    await TestBed.configureTestingModule({
      imports: [GameTableComponent, PlayerAvatarComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crearse', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Propiedades derivadas', () => {
    it('debería retornar los jugadores en las posiciones superiores', () => {
      component.players = [{ position: 1 }, { position: 2 }, { position: 3 }] as Player[];
      expect(component.topPlayers.length).toBe(2);
    });

    it('debería retornar los jugadores en las posiciones inferiores', () => {
      component.players = [{ position: 6 }, { position: 7 }, { position: 4 }] as Player[];
      expect(component.bottomPlayers.length).toBe(2);
    });

    it('debería retornar el jugador de la izquierda', () => {
      component.players = [{ position: 3 }] as Player[];
      expect(component.leftPlayer?.position).toBe(3);
    });

    it('debería retornar el jugador de la derecha', () => {
      component.players = [{ position: 5 }] as Player[];
      expect(component.rightPlayer?.position).toBe(5);
    });
  });

  describe('Acciones del juego', () => {
    it('debería llamar a revealCards() cuando se invoque onRevealCards()', () => {
      component.onRevealCards();
      expect(mockGameService.revealCards).toHaveBeenCalled();
    });

    it('debería llamar a resetGame() cuando se invoque resetGame()', () => {
      component.resetGame();
      expect(mockGameService.resetGame).toHaveBeenCalled();
    });
  });
});
