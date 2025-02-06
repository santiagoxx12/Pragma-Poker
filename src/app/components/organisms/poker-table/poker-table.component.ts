import { Component, Input } from '@angular/core';
import { Player } from '../../../interfaces/game.interface';
import { PlayerAvatarComponent } from '../../atoms/player-avatar/player-avatar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poker-table',
  standalone: true,
  imports:[PlayerAvatarComponent, CommonModule],
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.css'
})
export class PokerTableComponent {
  @Input() players: Player[] = [];
  @Input() revealed = false;

  getPlayerPosition(index: number, total: number): string {
    const angle = (index * 360) / total;
    const radius = 40;
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    return `translate(${x}%, ${y}%) translate(-50%, -50%)`;
  }
}
