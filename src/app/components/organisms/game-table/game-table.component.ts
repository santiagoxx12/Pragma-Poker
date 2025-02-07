import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerAvatarComponent } from '../../atoms/player-avatar/player-avatar.component';
import { Player } from '../../../interfaces/game.interface';

@Component({
  selector: 'app-game-table',
  standalone: true,
  imports: [CommonModule, PlayerAvatarComponent],
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.css'
})
export class GameTableComponent {
  @Input() players: Player[] = [];

  get topPlayers(): Player[] {
    return this.players.filter(p => p.position < 3);
  }

  get bottomPlayers(): Player[] {
    return this.players.filter(p => p.position > 4);
  }

  get leftPlayer(): Player | undefined {
    return this.players.find(p => p.position === 3);
  }

  get rightPlayer(): Player | undefined {
    return this.players.find(p => p.position === 4);
  }
}
