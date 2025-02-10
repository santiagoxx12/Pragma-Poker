import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { GameService } from './game.service';
import { GameState, Player } from '../../interfaces/game.interface';

describe('AdminService', () => {
  let servicio: AdminService;
  let authServiceEspia: jasmine.SpyObj<AuthService>;
  let gameServiceEspia: jasmine.SpyObj<GameService>;

  beforeEach(() => {
    authServiceEspia = jasmine.createSpyObj('AuthService', ['isAdmin$']);
    gameServiceEspia = jasmine.createSpyObj('GameService', ['gameState$', 'updateGameState']);

    TestBed.configureTestingModule({
      providers: [
        AdminService,
        { provide: AuthService, useValue: authServiceEspia },
        { provide: GameService, useValue: gameServiceEspia }
      ]
    });

    servicio = TestBed.inject(AdminService);
  });

  it('debería crearse', () => {
    expect(servicio).toBeTruthy();
  });

  it('debería asignar el rol de administrador si el usuario es admin', (done) => {
    authServiceEspia.isAdmin$.and.returnValue(of(true));
    const estadoJuego: GameState = {
      roomName: 'Sala1',
      currentVotingSystem: ['simple'],
      selectedCards: {},
      isVotingEnabled: false,
      isRevealing: false,
      averageVote: null,
      voteCount: {},
      players: [
        { id: '1', name: 'Jugador1', isSpectator: false, isAdmin: false, position: 1 } as Player,
        { id: '2', name: 'Jugador2', isSpectator: false, isAdmin: false, position: 2 } as Player
      ]
    };
    gameServiceEspia.gameState$ = of(estadoJuego);
    gameServiceEspia.updateGameState.and.callFake(() => {});

    servicio.assignAdminRole('Jugador1').subscribe(() => {
      expect(gameServiceEspia.updateGameState).toHaveBeenCalledWith({
        ...estadoJuego,
        players: [
          { id: '1', name: 'Jugador1', isSpectator: false, isAdmin: true, position: 1 },
          { id: '2', name: 'Jugador2', isSpectator: false, isAdmin: false, position: 2 }
        ]
      });
      done();
    });
  });

  it('debería lanzar error si el usuario no es administrador', (done) => {
    authServiceEspia.isAdmin$.and.returnValue(of(false));

    servicio.assignAdminRole('Jugador1').subscribe({
      error: (err) => {
        expect(err.message).toBe('No tienes permisos de administrador');
        done();
      }
    });
  });
});
