import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../utils/services/auth.service';
import { InviteModalComponent } from '../../organisms/invite-modal/invite-modal.component';
import { ChangeVotingModalComponent } from '../../organisms/change-voting-modal/change-voting-modal.component';
import { GameService } from '../../../utils/services/game.service';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [CommonModule, InviteModalComponent, ChangeVotingModalComponent],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.css',
})
export class GameHeaderComponent {
  @Input() roomName!: string;
  @Input() userName!: string;
  @Input() isAdmin = false;

  showInviteModal = false;
  showChangeVotingModal = false;
  currentVotingSystem: 'fibonacci' | 'power' = 'fibonacci';
  cardsAreRevealed = false;
  canChangeVotingSystem = true;


  constructor(
    private readonly authService: AuthService,
    private readonly gameService: GameService
  ) {
    this.gameService.gameState$.subscribe(state => {
      this.cardsAreRevealed = !state.isVotingEnabled;
      this.canChangeVotingSystem = true;
      this.currentVotingSystem = state.currentVotingSystem.length > 10 ? 'fibonacci' : 'power';
    });
  }

  get userInitials(): string {
    if (!this.userName) return '';
    const words = this.userName.split(' ').filter((word) => word.length > 0);
    if (words.length > 1) {
      return (
        words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
      );
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return '';
  }

  get formattedRoomName(): string {
    if (!this.roomName) {
      return '';
    }
    return this.roomName.split('-')[0];
  }


  logout() {
    this.authService.logout();
  }

  onVotingSystemChanged(system: 'fibonacci' | 'power') {
      this.gameService.changeVotingSystem(system);
  }
}
