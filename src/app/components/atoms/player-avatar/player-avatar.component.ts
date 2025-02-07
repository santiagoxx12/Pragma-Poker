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
    return this.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}