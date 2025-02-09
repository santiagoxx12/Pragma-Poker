import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../utils/services/auth.service';
import { InviteModalComponent } from '../../organisms/invite-modal/invite-modal.component';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [CommonModule, InviteModalComponent],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.css'
})
export class GameHeaderComponent {
  @Input() roomName!: string;
  @Input() userName!: string;
  showInviteModal = false;

  constructor(private readonly authService: AuthService) {}


  get userInitials(): string {
    if (!this.userName) return '';
    const words = this.userName.split(' ').filter(word => word.length > 0);
    if (words.length > 1) {
      return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return '';
  }

  get formattedRoomName(): string {
    return this.roomName.split('-')[0];
  }

  logout() {
    this.authService.logout();
  }

}
