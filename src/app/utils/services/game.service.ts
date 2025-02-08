import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player, GameState } from '../../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly defaultPlayers: Player[] = [
    { id: '1', name: 'David', isSpectator: false, isAdmin: false, selectedCard: null, position: 0 },
    { id: '2', name: 'Alice', isSpectator: false, isAdmin: false, selectedCard: null, position: 1 },
    { id: '3', name: 'Bob', isSpectator: true, isAdmin: false, selectedCard: null, position: 2 },
    { id: '4', name: 'Charlie', isSpectator: false, isAdmin: false, selectedCard: null, position: 3 },
    { id: '5', name: 'Eva', isSpectator: true, isAdmin: false, selectedCard: null, position: 5 },
    { id: '6', name: 'Frank', isSpectator: false, isAdmin: false, selectedCard: null, position: 6 },
    { id: '7', name: 'Grace', isSpectator: false, isAdmin: false, selectedCard: null, position: 7 }
  ];

  private readonly gameState = new BehaviorSubject<GameState>({
    players: this.defaultPlayers,
    roomName: 'Sprint 32',
    currentVotingSystem: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?']
  });

  updateRoomName(newRoomName: string) {
    this.gameState.next({
      ...this.gameState.value,
      roomName: newRoomName
    });
  }


  gameState$ = this.gameState.asObservable();

  addCurrentUser(userData: { name: string; viewMode: string; isAdmin: boolean }) {
    const currentState = this.gameState.value;
    const newPlayer: Player = {
      id: 'current-user',
      name: userData.name,
      isSpectator: userData.viewMode === 'spectator',
      isAdmin: userData.isAdmin,
      selectedCard: null,
      position: 6
    };

    const updatedPlayers = [...currentState.players, newPlayer];


    this.gameState.next({
      ...currentState,
      players: updatedPlayers
    });

    return newPlayer.id;
  }

  updatePlayerCard(playerId: string, card: string | null) {
    const currentState = this.gameState.value;
    const updatedPlayers = currentState.players.map(player =>
      player.id === playerId ? { ...player, selectedCard: card } : player
    );

    this.gameState.next({
      ...currentState,
      players: updatedPlayers
    });
  }

  updateVotingSystem(newSystem: string[]) {
    this.gameState.next({
      ...this.gameState.value,
      currentVotingSystem: newSystem
    });
  }

  resetGameState() {
    this.gameState.next({
      players: [...this.defaultPlayers], 
      roomName: 'Sprint 32',
      currentVotingSystem: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?']
    });
  }

}
