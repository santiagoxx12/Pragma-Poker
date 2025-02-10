import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerAvatarComponent } from './player-avatar.component';
import { AuthService } from '../../../utils/services/auth.service';
import { ViewModeService } from '../../../utils/services/view-mode.service';
import { GameService } from '../../../utils/services/game.service';
import { AdminService } from '../../../utils/services/admin.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ViewModeModalComponent } from '../../organisms/view-mode-modal/view-mode-modal.component';
import { AdminRoleModalComponent } from '../../organisms/admin-role-modal/admin-role-modal.component';

describe('Componente PlayerAvatarComponent', () => {
  let component: PlayerAvatarComponent;
  let fixture: ComponentFixture<PlayerAvatarComponent>;
  let authServiceMock: any;
  let viewModeServiceMock: any;
  let gameServiceMock: any;
  let adminServiceMock: any;
  let cdrMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isAdmin$: () => of(false),
      currentUser$: of({ name: 'testUser' }),
    };

    viewModeServiceMock = {
      viewMode$: of('player'),
    };

    gameServiceMock = {
      gameState$: of({
        players: [{ name: 'testUser', isAdmin: false, isOwner: false }],
        isVotingEnabled: true,
      }),
    };

    adminServiceMock = {
      assignAdminRole: jasmine
        .createSpy('assignAdminRole')
        .and.returnValue(of(null)),
    };

    cdrMock = {
      detectChanges: jasmine.createSpy('detectChanges'),
    };

    await TestBed.configureTestingModule({
      imports: [PlayerAvatarComponent, CommonModule, ViewModeModalComponent, AdminRoleModalComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ViewModeService, useValue: viewModeServiceMock },
        { provide: GameService, useValue: gameServiceMock },
        { provide: AdminService, useValue: adminServiceMock },
        { provide: ChangeDetectorRef, useValue: cdrMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerAvatarComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialización', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Método getInitials', () => {
    it('debería retornar las iniciales correctamente para nombres con dos palabras', () => {
      component.name = 'Juan Pérez';
      expect(component.getInitials()).toBe('JP');
    });

    it('debería retornar las dos primeras letras para un solo nombre', () => {
      component.name = 'Juan';
      expect(component.getInitials()).toBe('JU');
    });

    it('debería retornar una cadena vacía si el nombre no está definido', () => {
      component.name = '';
      expect(component.getInitials()).toBe('');
    });
  });

});
