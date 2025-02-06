import { Component } from '@angular/core';
import { CreateUserModalComponent } from '../../components/organisms/create-user-modal/create-user-modal.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../interfaces/game.interface';
import { GameService } from '../../utils/services/game.service';
import { CardSelectorComponent } from '../../components/organisms/card-selector/card-selector.component';
import { GameHeaderComponent } from '../../components/molecules/game-header/game-header.component';

@Component({
  selector: 'app-game-room',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateUserModalComponent,
    CardSelectorComponent,
    GameHeaderComponent
  ],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.css'
})
export class GameRoomComponent {
  showUserModal = true;
  sprintName = 'Sprint 32';
  players: Player[] = [];
  isSpectator = false;
  revealed = false;
  selectedCard: string | null = null;
  availableCards = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
  playerInitials = 'LU';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.sprintName = this.route.snapshot.paramMap.get('gameName') || 'Sprint 32';
  }

  getPlayerPosition(index: number, total: number): string {
    const angle = (index * 360) / total;
    const radius = 40;
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    return `translate(${x}%, ${y}%) translate(-50%, -50%)`;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  selectCard(card: string) {
    this.selectedCard = card;
  }

  onUserCreated(userData: { name: string; viewMode: string; isAdmin: boolean }) {
    this.isSpectator = userData.viewMode === 'spectator';
    this.showUserModal = false;
  }

  invitePlayers() {
    console.log('Invitar jugadores');
  }

}
