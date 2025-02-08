import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-avatar.component.html',
  styleUrl: './player-avatar.component.css'

})
export class PlayerAvatarComponent {
  @Input() name!: string;
  @Input() isSpectator!: boolean;
  @Input() selectedCard?: string | null;
  @Input() hasSelectedCard = false;

  getInitials(): string {
    if (!this.name) return '';
    const words = this.name.split(' ').filter(word => word.length > 0);
    if (words.length > 1) {
      return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return '';
  }

}
