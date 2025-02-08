import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería inicializar con valores predeterminados', (done) => {
    service.gameState$.subscribe((state) => {
      expect(state.roomName).toBe('Sprint 32');
      expect(state.players.length).toBe(7);
      expect(state.currentVotingSystem).toEqual(['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?']);
      done();
    });
  });

  it('debería actualizar el nombre de la sala', (done) => {
    service.updateRoomName('Nueva Sala');
    service.gameState$.subscribe((state) => {
      expect(state.roomName).toBe('Nueva Sala');
      done();
    });
  });

  it('debería agregar un usuario al estado del juego', (done) => {
    const userData = { name: 'New Player', viewMode: 'player', isAdmin: false };
    const newUserId = service.addCurrentUser(userData);

    service.gameState$.subscribe((state) => {
      expect(state.players.length).toBe(8);
      expect(state.players.some(player => player.name === 'New Player')).toBeTrue();
      expect(state.players.find(player => player.name === 'New Player')?.id).toBe(newUserId);
      done();
    });
  });

  it('debería actualizar la carta seleccionada de un jugador', (done) => {
    service.updatePlayerCard('1', '5');
    service.gameState$.subscribe((state) => {
      const player = state.players.find(p => p.id === '1');
      expect(player?.selectedCard).toBe('5');
      done();
    });
  });

  it('debería actualizar el sistema de votación', (done) => {
    const newVotingSystem = ['1', '3', '5', '7', '9'];
    service.updateVotingSystem(newVotingSystem);

    service.gameState$.subscribe((state) => {
      expect(state.currentVotingSystem).toEqual(newVotingSystem);
      done();
    });
  });

  it('debería restablecer el estado del juego', (done) => {
    service.resetGameState();
    service.gameState$.subscribe((state) => {
      expect(state.players.length).toBe(7);
      expect(state.roomName).toBe('Sprint 32');
      expect(state.currentVotingSystem).toEqual(['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?']);
      done();
    });
  });
});
