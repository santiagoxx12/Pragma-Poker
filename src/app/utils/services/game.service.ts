import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState, Player } from '../../interfaces/game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly votingSystems = {
    fibonacci: [
      '0',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '21',
      '34',
      '55',
      '89',
      '?',
      '☕',
    ],
    power: ['0', '1', '2', '4', '8', '16', '32', '64', '?', '☕'],
  };

  private readonly defaultPlayers: Player[] = [
    {
      id: '1',
      name: 'David',
      isSpectator: false,
      isAdmin: false,
      selectedCard: null,
      position: 0,
    },
    {
      id: '2',
      name: 'Alice',
      isSpectator: false,
      isAdmin: false,
      selectedCard: null,
      position: 1,
    },
    {
      id: '3',
      name: 'Bob',
      isSpectator: true,
      isAdmin: false,
      selectedCard: null,
      position: 2,
    },
    {
      id: '4',
      name: 'Charlie',
      isSpectator: false,
      isAdmin: false,
      selectedCard: null,
      position: 3,
    },
    {
      id: '5',
      name: 'Eva',
      isSpectator: true,
      isAdmin: false,
      selectedCard: null,
      position: 5,
    },
    {
      id: '6',
      name: 'Frank',
      isSpectator: false,
      isAdmin: false,
      selectedCard: null,
      position: 6,
    },
    {
      id: '7',
      name: 'Grace',
      isSpectator: false,
      isAdmin: false,
      selectedCard: null,
      position: 7,
    },
  ];

  private readonly gameState = new BehaviorSubject<GameState>({
    players: [...this.defaultPlayers],
    roomName: 'Sprint 32',
    currentVotingSystem: this.votingSystems.fibonacci,
    selectedCards: {},
    isVotingEnabled: true,
    isRevealing: false,
    averageVote: null,
    voteCount: {},
  });

  gameState$ = this.gameState.asObservable();

  changeVotingSystem(system: 'fibonacci' | 'power') {
    this.gameState.next({
      ...this.gameState.value,
      currentVotingSystem: this.votingSystems[system],
      selectedCards: {},
      isVotingEnabled: true,
      isRevealing: false,
      averageVote: null,
      voteCount: {},
    });
  }

  updateRoomName(newRoomName: string) {
    this.gameState.next({
      ...this.gameState.value,
      roomName: newRoomName,
    });
  }

  updateGameState(newState: Partial<GameState>) {
    this.gameState.next({
      ...this.gameState.value,
      ...newState,
    });
  }

  revealCards() {
    const currentState = this.gameState.value;
    const currentUser = currentState.players.find(p => p.id === 'current-user');

    this.updateGameState({ isRevealing: true });

    setTimeout(() => {
      const players = currentState.players;
      const voteCount: { [key: string]: number } = {};
      let sum = 0;
      let count = 0;

      players.forEach((player) => {
        if (!player.isSpectator && player.selectedCard) {
          const card = player.selectedCard;
          voteCount[card] = (voteCount[card] || 0) + 1;

          if (card !== '?' && card !== '☕') {
            sum += parseFloat(card);
            count++;
          }
        }
      });

      this.updateGameState({
        isRevealing: false,
        isVotingEnabled: false,
        averageVote: count > 0 ? sum / count : null,
        voteCount,
      });

      if (!currentUser?.isAdmin) {
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      }
    }, 2000);
  }

  addCurrentUser(userData: {
    name: string;
    viewMode: string;
    isAdmin: boolean;
  }) {
    const currentState = this.gameState.value;
    const newPlayer: Player = {
      id: 'current-user',
      name: userData.name,
      isSpectator: userData.viewMode === 'spectator',
      isAdmin: userData.isAdmin,
      selectedCard: null,
      position: 6,
    };

    const updatedPlayers = [...currentState.players, newPlayer];

    this.gameState.next({
      ...currentState,
      players: updatedPlayers,
    });

    if (userData.viewMode === 'spectator') {
      setTimeout(() => {
        this.triggerDefaultPlayersSelection();
        setTimeout(() => {
          this.checkAndAutoReveal();
        }, 3000);
      }, 1000);
    }

    return newPlayer.id;
  }

  selectCard(playerId: string, card: string) {
    if (!this.gameState.value.isVotingEnabled) {
      return;
    }

    const currentState = this.gameState.value;
    const player = currentState.players.find((p) => p.id === playerId);

    if (!player || player.isSpectator) {
      return;
    }

    this.updatePlayerCard(playerId, card);

    if (player.isAdmin) {
      setTimeout(() => {
        this.triggerDefaultPlayersSelection();
      }, 1000);
    } else if (!player.isAdmin && !player.isSpectator) {
      setTimeout(() => {
        this.triggerDefaultPlayersSelection();
        setTimeout(() => {
          this.checkAndAutoReveal();
        }, 3000);
      }, 1000);
    }

    this.printSelectedCards();
  }

  private checkAndAutoReveal() {
    const currentState = this.gameState.value;
    const currentUser = currentState.players.find(p => p.id === 'current-user');

    if (currentUser?.isAdmin) return;

    const nonSpectators = currentState.players.filter(p => !p.isSpectator);
    const allVoted = nonSpectators.every(p => !!currentState.selectedCards[p.id]);

    if (allVoted) {
      setTimeout(() => {
        this.revealCards();
      }, 2000);
    }
  }

  triggerDefaultPlayersSelection() {
    const currentState = this.gameState.value;

    const defaultPlayers = currentState.players.filter(
      (p) => !p.isSpectator && p.id !== 'current-user' && !p.selectedCard
    );

    defaultPlayers.forEach((player) => {
      const delay = Math.random() * 2000 + 1000;

      setTimeout(() => {
        const randomCard = this.getRandomCard(
          currentState.currentVotingSystem,
          player.id
        );
        this.updatePlayerCard(player.id, randomCard);
        this.printSelectedCards();
      }, delay);
    });
  }

  private getRandomCard(votingSystem: string[], playerId: string): string {
    const numericalCards = votingSystem.filter(
      (card) => card !== '?' && card !== '☕'
    );

    if (Math.random() < 0.1) {
      return '?';
    }

    if (Math.random() < 0.05) {
      return '☕';
    }

    const previousCard = this.gameState.value.players.find(
      (p) => p.id === playerId
    )?.selectedCard;
    let availableCards = [...numericalCards];

    if (previousCard) {
      availableCards = availableCards.filter((card) => card !== previousCard);
    }

    return availableCards[Math.floor(Math.random() * availableCards.length)];
  }

  private updatePlayerCard(playerId: string, card: string | null) {
    const currentState = this.gameState.value;
    const updatedPlayers = currentState.players.map((player) =>
      player.id === playerId ? { ...player, selectedCard: card } : player
    );

    const updatedSelectedCards = {
      ...currentState.selectedCards,
    };

    if (card !== null) {
      updatedSelectedCards[playerId] = card;
    } else {
      delete updatedSelectedCards[playerId];
    }

    this.gameState.next({
      ...currentState,
      players: updatedPlayers,
      selectedCards: updatedSelectedCards,
    });
  }

  private printSelectedCards() {
    console.log('Cartas seleccionadas: ', this.gameState.value.selectedCards);
  }

  isAllPlayersVoted(): boolean {
    const { players, selectedCards } = this.gameState.value;
    const nonSpectators = players.filter((player) => !player.isSpectator);

    return (
      nonSpectators.length > 0 &&
      nonSpectators.every(
        (player) =>
          selectedCards[player.id] !== undefined &&
          selectedCards[player.id] !== null
      )
    );
  }

  resetGame() {
    const currentState = this.gameState.value;
    const currentUser = currentState.players.find(p => p.id === 'current-user');

    const resetPlayers = currentState.players.map(player => ({
      ...player,
      selectedCard: null
    }));

    this.gameState.next({
      ...currentState,
      players: resetPlayers,
      selectedCards: {},
      isVotingEnabled: true,
      isRevealing: false,
      averageVote: null,
      voteCount: {},
    });

    if (currentUser?.isSpectator || currentUser?.isAdmin) {
      setTimeout(() => {
        this.triggerDefaultPlayersSelection();
        if (!currentUser.isAdmin) {
          setTimeout(() => {
            this.checkAndAutoReveal();
          }, 3000);
        }
      }, 1000);
    }
  }

  resetGameState() {
    this.gameState.next({
      players: [...this.defaultPlayers],
      roomName: 'Sprint 32',
      currentVotingSystem: this.votingSystems.fibonacci,
      selectedCards: {},
      isVotingEnabled: true,
      isRevealing: false,
      averageVote: null,
      voteCount: {},
    });
  }
}
