import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GameService } from './game.service';
import { GameState } from '../../interfaces/game.interface';
import { take } from 'rxjs/operators';

describe('GameService', () => {
  let servicio: GameService;

  const testUserData = {
    player: {
      name: 'Usuario Prueba',
      viewMode: 'player',
      isAdmin: false,
      isOwner: false
    },
    spectator: {
      name: 'Espectador Prueba',
      viewMode: 'spectator',
      isAdmin: false,
      isOwner: false
    }
  };

  const setupTestCards = () => {
    servicio.selectCard('1', '8');
    servicio.selectCard('2', '13');
    servicio.selectCard('4', '5');
  };

  const setupAllPlayerVotes = () => {
    servicio.selectCard('1', '8');
    servicio.selectCard('2', '13');
    servicio.selectCard('4', '5');
    servicio.selectCard('6', '3');
    servicio.selectCard('7', '2');
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
    servicio = TestBed.inject(GameService);
  });

  it('debería crearse', () => {
    expect(servicio).toBeTruthy();
  });

  describe('Estado Inicial', () => {
    const verifyInitialState = (estado: GameState) => {
      expect(estado.players.length).toBe(7);
      expect(estado.roomName).toBe('Sprint 32');
      expect(estado.isVotingEnabled).toBe(true);
      expect(estado.isRevealing).toBe(false);
      expect(estado.averageVote).toBeNull();
      expect(Object.keys(estado.selectedCards).length).toBe(0);
    };

    it('debería inicializarse con el estado por defecto', (done) => {
      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyInitialState(estado);
        done();
      });
    });
  });

  describe('Sistema de Votación', () => {
    const verifyPowerSystem = (estado: GameState) => {
      expect(estado.currentVotingSystem.length).toBe(10);
      expect(estado.currentVotingSystem).toContain('32');
      expect(estado.currentVotingSystem).toContain('64');
    };

    const verifyResetVotes = (estado: GameState) => {
      expect(Object.keys(estado.selectedCards).length).toBe(0);
      expect(estado.players.every(p => p.selectedCard === null)).toBe(true);
    };

    it('debería cambiar al sistema power', (done) => {
      servicio.changeVotingSystem('power');
      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyPowerSystem(estado);
        done();
      });
    });

    it('debería resetear votos al cambiar sistema', (done) => {
      setupTestCards();
      servicio.changeVotingSystem('power');

      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyResetVotes(estado);
        done();
      });
    });
  });

  describe('Gestión de Jugadores', () => {
    const verifyPlayer = (estado: GameState, expectedName: string, isSpectator: boolean) => {
      const usuarioActual = estado.players.find(p => p.id === 'current-user');
      expect(usuarioActual).toBeTruthy();
      expect(usuarioActual?.name).toBe(expectedName);
      expect(usuarioActual?.isSpectator).toBe(isSpectator);
    };

    it('debería agregar jugador normal', (done) => {
      servicio.addCurrentUser(testUserData.player);
      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyPlayer(estado, 'Usuario Prueba', false);
        done();
      });
    });

    it('debería agregar espectador', (done) => {
      servicio.addCurrentUser(testUserData.spectator);
      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyPlayer(estado, 'Espectador Prueba', true);
        done();
      });
    });
  });

  describe('Selección de Cartas', () => {
    const verifyCardSelection = (estado: GameState, playerId: string, expectedCard: string | null) => {
      if (expectedCard === null) {
        expect(estado.selectedCards[playerId]).toBeUndefined();
      } else {
        expect(estado.selectedCards[playerId]).toBe(expectedCard);
      }
      expect(estado.players.find(p => p.id === playerId)?.selectedCard).toBe(expectedCard);
    };

    it('debería actualizar selección de carta', (done) => {
      servicio.selectCard('1', '8');
      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyCardSelection(estado, '1', '8');
        done();
      });
    });

    it('no debería permitir selección con votación deshabilitada', (done) => {
      servicio.updateGameState({ isVotingEnabled: false });
      servicio.selectCard('1', '8');
      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyCardSelection(estado, '1', null);
        done();
      });
    });
  });

  describe('Revelación de Cartas', () => {
    const verifyVoteAverage = (estado: GameState, expectedAverage: number) => {
      expect(estado.averageVote).toBe(expectedAverage);
      expect(estado.isVotingEnabled).toBe(false);
    };

    it('debería calcular promedio correctamente', fakeAsync(() => {
      setupTestCards();
      servicio.revealCards();
      tick(2100);

      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyVoteAverage(estado, (8 + 13 + 5) / 3);
      });
    }));

    it('debería manejar cartas especiales', fakeAsync(() => {
      servicio.selectCard('1', '8');
      servicio.selectCard('2', '?');
      servicio.selectCard('4', '☕');

      servicio.revealCards();
      tick(2100);

      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        verifyVoteAverage(estado, 8);
      });
    }));
  });

  describe('Reinicio del Juego', () => {
    const verifyResetState = (estado: GameState) => {
      expect(estado.isVotingEnabled).toBe(true);
      expect(estado.isRevealing).toBe(false);
      expect(estado.averageVote).toBeNull();
      expect(Object.keys(estado.selectedCards).length).toBe(0);
      expect(estado.players.every(p => p.selectedCard === null)).toBe(true);
    };

    it('debería reiniciar correctamente', fakeAsync(() => {
      setupTestCards();
      servicio.revealCards();
      tick(2100);

      servicio.resetGame();

      servicio.gameState$.pipe(take(1)).subscribe(verifyResetState);
    }));
  });

  describe('Gestión de Sala', () => {
    it('debería actualizar nombre de sala', (done) => {
      servicio.updateRoomName('Nuevo Sprint');
      servicio.gameState$.pipe(take(1)).subscribe((estado) => {
        expect(estado.roomName).toBe('Nuevo Sprint');
        done();
      });
    });
  });

  describe('Estado de Votación', () => {
    it('debería detectar votación completa', () => {
      setupAllPlayerVotes();
      expect(servicio.isAllPlayersVoted()).toBe(true);
    });

    it('debería detectar votación incompleta', () => {
      setupTestCards();
      expect(servicio.isAllPlayersVoted()).toBe(false);
    });
  });
});
