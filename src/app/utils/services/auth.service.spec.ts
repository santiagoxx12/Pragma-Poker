import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth.service';
import { Router } from '@angular/router';
import { GameService } from './game.service';

describe('AuthService', () => {
  let service: AuthService;
  let gameService: GameService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        GameService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(AuthService);
    gameService = TestBed.inject(GameService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorage.clear();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería cargar el usuario desde localStorage si existe', () => {
    const mockUser: User = { name: 'TestUser', role: 'admin' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: routerSpy }]
    });
    const newServiceInstance = TestBed.inject(AuthService);

    expect(newServiceInstance['currentUserSubject'].value).toEqual(mockUser);
  });


  it('debería autenticar correctamente a un usuario y redirigirlo', () => {
    const user: User = { name: 'JohnDoe', role: 'admin' };

    service.login(user);

    expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
    expect(service.isAuthenticated()).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/create-game']);
  });

  it('debería cerrar sesión correctamente y resetear el estado del juego', () => {
    const user: User = { name: 'JohnDoe', role: 'admin' };
    localStorage.setItem('user', JSON.stringify(user));

    spyOn(gameService, 'resetGameState');

    service.logout();

    expect(localStorage.getItem('user')).toBeNull();

    expect(service.isAuthenticated()).toBeFalse();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);

    expect(gameService.resetGameState).toHaveBeenCalled();
  });

  it('debería retornar verdadero si el usuario es admin', () => {
    const user: User = { name: 'AdminUser', role: 'admin' };
    service.login(user);

    expect(service.isAdmin()).toBeTrue();
  });

  it('debería retornar falso si el usuario es player', () => {
    const user: User = { name: 'PlayerUser', role: 'player' };
    service.login(user);

    expect(service.isAdmin()).toBeFalse();
  });

  it('debería retornar falso si no hay usuario autenticado', () => {
    localStorage.clear();
    service['currentUserSubject'].next(null);
    expect(service.isAuthenticated()).toBeFalse();
  });



});
