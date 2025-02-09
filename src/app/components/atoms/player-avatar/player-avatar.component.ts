import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewModeModalComponent } from '../../organisms/view-mode-modal/view-mode-modal.component';
import { AuthService } from '../../../utils/services/auth.service';
import { User } from '../../../interfaces/user.interface';
import { ViewModeService } from '../../../utils/services/view-mode.service';
import { GameService } from '../../../utils/services/game.service';
import { combineLatest, Subscription } from 'rxjs';
import { AdminService } from '../../../utils/services/admin.service';
import { AdminRoleModalComponent } from '../../organisms/admin-role-modal/admin-role-modal.component';

@Component({
  selector: 'app-player-avatar',
  standalone: true,
  imports: [CommonModule, ViewModeModalComponent, AdminRoleModalComponent],
  templateUrl: './player-avatar.component.html',
  styleUrl: './player-avatar.component.css',
  host: {
    '[class.is-admin]': 'currentUserIsAdmin'
  }
})
export class PlayerAvatarComponent implements OnInit, OnDestroy {
  @Input() name!: string;
  @Input() isSpectator!: boolean;
  @Input() selectedCard?: string | null;
  @Input() hasSelectedCard = false;
  @Input() showCard = false;
  @Input() isAdmin = false;
  @Input() isOwner = false;

  isCurrentUser = false;
  showViewModeModal = false;
  showAdminModal = false;
  isVotingEnabled = true;
  currentUserIsAdmin = false;
  private currentUser: User | null = null;
  private readonly subscription = new Subscription();


  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly authService: AuthService,
    private readonly viewModeService: ViewModeService,
    private readonly gameService: GameService,
    private readonly adminService: AdminService

  ) {}

  ngOnInit() {
    const adminSub = this.authService.isAdmin$().subscribe(isAdmin => {
      this.currentUserIsAdmin = isAdmin;
      this.cdr.detectChanges();
    });
    this.subscription.add(adminSub);

    const gameStateSub = this.gameService.gameState$.subscribe(gameState => {
      const player = gameState.players.find(p => p.name === this.name);
      if (player) {
        this.isAdmin = player.isAdmin;
        this.isOwner = player.isOwner || false;
        this.cdr.detectChanges();
      }
    });
    this.subscription.add(gameStateSub);

    const mainSub = combineLatest([
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
    this.subscription.add(mainSub);
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
    } else if (this.currentUserIsAdmin && !this.isCurrentUser && !this.isAdmin) {
      this.showAdminModal = true;
      this.cdr.detectChanges();
    }
  }

  assignAdminRole() {
    this.adminService.assignAdminRole(this.name).subscribe({
      next: () => {
        console.log('Rol de admin asignado exitosamente');
        this.showAdminModal = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al asignar rol de admin:', error);
        this.showAdminModal = false;
        this.cdr.detectChanges();
      }
    });
  }

}
