import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState, Player } from '../../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly defaultScoring = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
  private readonly fibonacci = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?'];
  private readonly tShirt = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?'];

  private readonly gameState = new BehaviorSubject<GameState | null>(null);
  gameState$ = this.gameState.asObservable();

  private readonly currentUser = new BehaviorSubject<Player | null>(null);
  currentUser$ = this.currentUser.asObservable();

  setCurrentUser(user: Player) {
    this.currentUser.next(user);
  }

  initializeGame(gameName: string, user: Player) {
    const initialState: GameState = {
      id: Date.now().toString(),
      name: gameName,
      players: [user],
      revealed: false,
      scoringSystem: this.defaultScoring
    };
    this.gameState.next(initialState);
    this.currentUser.next(user);
  }

  changeScoringSystem(system: 'default' | 'fibonacci' | 'tshirt') {
    const currentState = this.gameState.value;
    if (currentState) {
      let newScoring: string[];
      switch (system) {
        case 'fibonacci':
          newScoring = this.fibonacci;
          break;
        case 'tshirt':
          newScoring = this.tShirt;
          break;
        default:
          newScoring = this.defaultScoring;
      }

      const updatedPlayers = currentState.players.map(player => ({
        ...player,
        selectedCard: null
      }));

      this.updateGameState({
        ...currentState,
        scoringSystem: newScoring,
        players: updatedPlayers,
        revealed: false
      });
    }
  }

  selectCard(playerId: string, card: string) {
    const currentState = this.gameState.value;
    if (currentState) {
      const updatedPlayers = currentState.players.map(player =>
        player.id === playerId ? { ...player, selectedCard: card } : player
      );
      this.updateGameState({ ...currentState, players: updatedPlayers });
    }
  }

  toggleReveal() {
    const currentState = this.gameState.value;
    if (currentState) {
      this.updateGameState({ ...currentState, revealed: !currentState.revealed });
    }
  }

  private updateGameState(state: GameState) {
    this.gameState.next(state);
  }
}
