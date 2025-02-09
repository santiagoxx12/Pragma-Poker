import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewModeModalComponent } from '../../organisms/view-mode-modal/view-mode-modal.component';
import { AuthService } from '../../../utils/services/auth.service';
import { User } from '../../../interfaces/user.interface';
import { ViewModeService } from '../../../utils/services/view-mode.service';
import { GameService } from '../../../utils/services/game.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-player-avatar',
  standalone: true,
  imports: [CommonModule, ViewModeModalComponent],
  templateUrl: './player-avatar.component.html',
  styleUrl: './player-avatar.component.css'
})
export class PlayerAvatarComponent implements OnInit, OnDestroy {
  @Input() name!: string;
  @Input() isSpectator!: boolean;
  @Input() selectedCard?: string | null;
  @Input() hasSelectedCard = false;
  @Input() showCard = false;
  
  isCurrentUser = false;
  showViewModeModal = false;
  isVotingEnabled = true;
  private currentUser: User | null = null;
  private subscription = new Subscription();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly authService: AuthService,
    private readonly viewModeService: ViewModeService,
    private readonly gameService: GameService
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.authService.currentUser$,
      this.viewModeService.viewMode$,
      this.gameService.gameState$
    ]).subscribe(([user, viewMode, gameState]) => {
      this.currentUser = user;
      this.isCurrentUser = user ? user.name === this.name : false;
      this.isSpectator = this.isCurrentUser ? viewMode === 'spectator' : this.isSpectator;
      this.isVotingEnabled = gameState.isVotingEnabled;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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

  onAvatarClick() {
    if (this.isCurrentUser && this.isVotingEnabled) {
      this.showViewModeModal = true;
      this.cdr.detectChanges();
    }
  }
}