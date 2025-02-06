import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerAvatarComponent } from '../../atoms/player-avatar/player-avatar.component';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [PlayerAvatarComponent],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.css'
})
export class GameHeaderComponent {
  @Input() title = '';
  @Input() playerName = '';
  @Output() onInvite = new EventEmitter<void>();

  invitePlayers() {
    this.onInvite.emit();
  }
}
