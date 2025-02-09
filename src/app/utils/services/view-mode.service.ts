import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';
import { take } from 'rxjs/operators';
import { GameState } from '../../interfaces/game.interface';

@Injectable({
    providedIn: 'root'
  })
  export class ViewModeService {
    private readonly currentViewMode = new BehaviorSubject<'player' | 'spectator'>('player');
    viewMode$ = this.currentViewMode.asObservable();
  
    constructor(private readonly gameService: GameService) {
      this.viewMode$.subscribe(mode => {
        this.updatePlayerRole(mode);
      });
    }
  
    changeViewMode(newMode: 'player' | 'spectator') {
      this.currentViewMode.next(newMode);
    }
  
    private updatePlayerRole(newMode: 'player' | 'spectator') {
      this.gameService.gameState$.pipe(
        take(1)
      ).subscribe((currentState: GameState) => {
        const currentUser = currentState.players.find(p => p.id === 'current-user');
        
        if (currentUser) {
          const updatedPlayers = currentState.players.map(player => {
            if (player.id === 'current-user') {
              return {
                ...player,
                isSpectator: newMode === 'spectator',
                selectedCard: null 
              };
            }
            return player;
          });
  
          const updatedSelectedCards = { ...currentState.selectedCards };
          if (newMode === 'spectator') {
            delete updatedSelectedCards[currentUser.id];
          }
  
          this.gameService.updateGameState({
            players: updatedPlayers,
            selectedCards: updatedSelectedCards,
            ...(newMode === 'spectator' && {
              isVotingEnabled: true,
              isRevealing: false,
              averageVote: null,
              voteCount: {}
            })
          });
        }
      });
    }
  
    getCurrentViewMode(): 'player' | 'spectator' {
      return this.currentViewMode.value;
    }
  }