import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';

export interface User {
  name: string;
  role: 'admin' | 'player';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly router: Router, private readonly gameService: GameService) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.router.navigate(['/create-game']);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);

    this.gameService.resetGameState();

    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

}
