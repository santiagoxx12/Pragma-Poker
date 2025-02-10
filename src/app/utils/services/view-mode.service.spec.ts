import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { GameService } from './game.service';
import { User } from '../../interfaces/user.interface';

describe('AuthService', () => {
  let servicio: AuthService;
  let routerEspia: jasmine.SpyObj<Router>;
  let gameServiceEspia: jasmine.SpyObj<GameService>;

  beforeEach(() => {
    localStorage.clear();
    routerEspia = jasmine.createSpyObj('Router', ['navigate']);
    gameServiceEspia = jasmine.createSpyObj('GameService', ['resetGameState']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerEspia },
        { provide: GameService, useValue: gameServiceEspia }
      ]
    });

    servicio = TestBed.inject(AuthService);
  });

  it('debería crearse', () => {
    expect(servicio).toBeTruthy();
  });

  it('debería iniciar sesión y almacenar el usuario en localStorage', () => {
    const usuario: User = { id: '1', name: 'Usuario de Prueba', role: 'admin' };
    servicio.login(usuario);

    expect(localStorage.getItem('user')).toBe(JSON.stringify({ ...usuario, isAdmin: true }));
    expect(servicio.isAuthenticated()).toBeTrue();
    expect(routerEspia.navigate).toHaveBeenCalledWith(['/create-game']);
  });

  it('debería cerrar sesión y limpiar el almacenamiento', () => {
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Usuario de Prueba', role: 'admin', isAdmin: true }));
    servicio.logout();

    expect(localStorage.getItem('user')).toBeNull();
    expect(servicio.isAuthenticated()).toBeFalse();
    expect(gameServiceEspia.resetGameState).toHaveBeenCalled();
    expect(routerEspia.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería retornar true si el usuario es administrador', () => {
    const usuario: User = { id: '1', name: 'Usuario Admin', role: 'admin' };
    servicio.login(usuario);
    expect(servicio.isAdmin()).toBeTrue();
  });

  it('debería retornar false si el usuario no es administrador', () => {
    const usuario: User = { id: '2', name: 'Usuario Regular', role: 'player' };
    servicio.login(usuario);
    expect(servicio.isAdmin()).toBeFalse();
  });

  it('debería determinar correctamente si el usuario está autenticado', () => {
    servicio.logout();
    expect(servicio.isAuthenticated()).toBeFalse();
    servicio.login({ id: '1', name: 'Usuario de Prueba', role: 'player' });
    expect(servicio.isAuthenticated()).toBeTrue();
  });

  it('debería retornar observable isAdmin$ correctamente', (done) => {
    const usuario: User = { id: '1', name: 'Usuario Admin', role: 'admin' };
    servicio.login(usuario);
    servicio.isAdmin$().subscribe(esAdmin => {
      expect(esAdmin).toBeTrue();
      done();
    });
  });
});
