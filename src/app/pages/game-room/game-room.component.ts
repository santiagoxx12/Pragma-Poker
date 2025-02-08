import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserModalComponent } from '../../components/organisms/create-user-modal/create-user-modal.component';
import { GameHeaderComponent } from '../../components/molecules/game-header/game-header.component';
import { GameTableComponent } from '../../components/organisms/game-table/game-table.component';
import { CardSelectorComponent } from '../../components/organisms/card-selector/card-selector.component';
import { GameService } from '../../utils/services/game.service';
import { GameState, Player } from '../../interfaces/game.interface';
import { ActivatedRoute } from '@angular/router';
import { VoteResultsComponent } from '../../components/organisms/vote-results/vote-results.component';

@Component({
  selector: 'app-game-room',
  standalone: true,
  imports: [
    CommonModule,
    CreateUserModalComponent,
    GameHeaderComponent,
    GameTableComponent,
    CardSelectorComponent,
    VoteResultsComponent
  ],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.css'
})
export class GameRoomComponent implements OnInit {
  showUserModal = true;
  isSpectator = false;
  currentUserName = '';
  roomName = 'Sprint 32';
  players: Player[] = [];
  votingSystem: string[] = [];
  currentUserId = '';
  gameState: GameState;

  constructor(
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute
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
    this.route.paramMap.subscribe(params => {
      const gameName = params.get('gameName') ?? 'DefaultRoom';
      this.roomName = gameName;
      this.gameService.updateRoomName(gameName);
    });

    this.gameService.gameState$.subscribe(state => {
      this.players = state.players;
      this.votingSystem = state.currentVotingSystem;
      this.roomName = state.roomName;
      this.gameState = state;
    });
  }

  onUserCreated(eventData: { name: string; viewMode: string; isAdmin: boolean }) {
    this.isSpectator = eventData.viewMode === 'spectator';
    this.currentUserName = eventData.name;
    this.showUserModal = false;

    localStorage.setItem('user', JSON.stringify(eventData));

    this.currentUserId = this.gameService.addCurrentUser(eventData);

    if (this.isSpectator) {
      this.gameService.triggerDefaultPlayersSelection();
    }
  }

  onCardSelected(card: string) {
    if (!this.isSpectator && this.currentUserId) {
      this.gameService.selectCard(this.currentUserId, card);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.gameService.resetGameState();
    window.location.assign(window.location.href);
    }
}
