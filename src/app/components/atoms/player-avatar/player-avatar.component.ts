import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-avatar',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './player-avatar.component.html',
  styleUrl: './player-avatar.component.css'
})
export class PlayerAvatarComponent {
  @Input() name: string = '';
  @Input() hasSelectedCard = false;

  get initials(): string {
    return this.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
