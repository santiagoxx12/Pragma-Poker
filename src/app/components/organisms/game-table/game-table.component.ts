import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerAvatarComponent } from '../../atoms/player-avatar/player-avatar.component';
import { GameState, Player } from '../../../interfaces/game.interface';
import { GameService } from '../../../utils/services/game.service';
import { AuthService } from '../../../utils/services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-game-table',
  standalone: true,
  imports: [CommonModule, PlayerAvatarComponent],
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.css'
})
export class GameTableComponent implements OnInit {
  @Input() players: Player[] = [];
  gameState: GameState;
  isAdmin$!: Observable<boolean>;
  shouldShowRevealButton$!: Observable<boolean>;
  shouldShowNewVotingButton$!: Observable<boolean>;

  constructor(
    private readonly gameService: GameService,
    private readonly authService: AuthService
  ) {
    this.gameState = {
      players: [],
      roomName: '',
      currentVotingSystem: [],
      selectedCards: {},
      isVotingEnabled: true,
      isRevealing: false,
      averageVote: null,
      voteCount: {}
    };
  }

  ngOnInit() {
    this.isAdmin$ = this.authService.currentUser$.pipe(
      map(user => user?.isAdmin === true)
    );

    this.shouldShowRevealButton$ = this.gameService.gameState$.pipe(
      map(state => {
        const nonSpectators = state.players.filter(player => !player.isSpectator);
        return (
          nonSpectators.every(player => !!state.selectedCards[player.id]) &&
          state.isVotingEnabled &&
          !state.isRevealing
        );
      })
    );

    this.shouldShowNewVotingButton$ = this.gameService.gameState$.pipe(
      map(state => !state.isVotingEnabled)
    );

    this.gameService.gameState$.subscribe(state => {
      this.gameState = state;
    });
  }

  get topPlayers(): Player[] {
    return this.players.filter(p => p.position <= 2);
  }

  get bottomPlayers(): Player[] {
    return this.players
      .filter(p => p.position >= 6 && p.position <= 7)
      .sort((a, b) => a.position - b.position);
  }

  get leftPlayer(): Player | undefined {
    return this.players.find(p => p.position === 3);
  }

  get rightPlayer(): Player | undefined {
    return this.players.find(p => p.position === 5);
  }

  onRevealCards() {
    this.gameService.revealCards();
  }

  resetGame() {
    this.gameService.resetGame();
  }
}
