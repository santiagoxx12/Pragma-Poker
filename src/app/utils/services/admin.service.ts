import { Injectable } from '@angular/core';
import { Observable, switchMap, take, of, throwError } from 'rxjs';
import { GameService } from './game.service';
import { AuthService } from './auth.service';
import { Player, GameState } from '../../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private readonly gameService: GameService,
    private readonly authService: AuthService
  ) {}

  assignAdminRole(playerName: string): Observable<void> {
    return this.authService.isAdmin$().pipe(
      take(1),
      switchMap((isAdmin) => {
        if (!isAdmin) {
          return throwError(() => new Error('No tienes permisos de administrador'));
        }

        return this.gameService.gameState$.pipe(
          take(1),
          switchMap((currentState: GameState) => {
            const updatedPlayers = currentState.players.map((player: Player) => {
              if (player.name === playerName) {
                return { ...player, isAdmin: true };
              }
              return player;
            });

            this.gameService.updateGameState({
              ...currentState,
              players: updatedPlayers
            });

            return of(void 0);
          })
        );
      })
    );
  }
}
