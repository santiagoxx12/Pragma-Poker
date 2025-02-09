import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GameService } from './game.service';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly router: Router, private readonly gameService: GameService) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al parsear usuario desde localStorage:', error);
        this.logout();
      }
    }

  }

  login(user: User) {
    const userWithAdminFlag = { ...user, isAdmin: user.role === 'admin' };
    localStorage.setItem('user', JSON.stringify(userWithAdminFlag));
    this.currentUserSubject.next(userWithAdminFlag);
    this.router.navigate(['/create-game']);
  }


  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);

    this.gameService.resetGameState();

    this.router.navigate(['/login']);
  }

  isAdmin$(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => user?.isAdmin === true));
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

}
