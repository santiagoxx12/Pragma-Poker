import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameRoomComponent } from './game-room.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from '../../utils/services/game.service';
import { AuthService } from '../../utils/services/auth.service';
import { ViewModeService } from '../../utils/services/view-mode.service';
import { CommonModule } from '@angular/common';
import { CreateUserModalComponent } from '../../components/organisms/create-user-modal/create-user-modal.component';
import { GameHeaderComponent } from '../../components/molecules/game-header/game-header.component';
import { GameTableComponent } from '../../components/organisms/game-table/game-table.component';
import { CardSelectorComponent } from '../../components/organisms/card-selector/card-selector.component';
import { VoteResultsComponent } from '../../components/organisms/vote-results/vote-results.component';
import { GameState } from '../../interfaces/game.interface';

describe('GameRoomComponent', () => {
  let component: GameRoomComponent;
  let fixture: ComponentFixture<GameRoomComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockViewModeService: jasmine.SpyObj<ViewModeService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockGameState: GameState = {
    players: [],
    roomName: 'TestRoom',
    currentVotingSystem: [],
    selectedCards: {},
    isVotingEnabled: true,
    isRevealing: false,
    averageVote: null,
    voteCount: {}
  };

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService',
      ['updateRoomName', 'addCurrentUser', 'selectCard', 'resetGameState'],
      {
        gameState$: of(mockGameState)
      }
    );
    mockGameService.addCurrentUser.and.returnValue('user123');

    mockAuthService = jasmine.createSpyObj('AuthService',
      ['isAdmin$', 'logout'],
      {
        currentUser$: of(null)
      }
    );
    mockAuthService.isAdmin$.and.returnValue(of(false));

    mockViewModeService = jasmine.createSpyObj('ViewModeService',
      ['changeViewMode'],
      {
        viewMode$: of('player')
      }
    );

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      paramMap: of(convertToParamMap({ gameName: 'TestRoom' }))
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CreateUserModalComponent,
        GameHeaderComponent,
        GameTableComponent,
        CardSelectorComponent,
        VoteResultsComponent
      ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ViewModeService, useValue: mockViewModeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener el nombre de la sala desde la ruta', () => {
    expect(component.roomName).toBe('TestRoom');
    expect(mockGameService.updateRoomName).toHaveBeenCalledWith('TestRoom');
  });

  it('debería suscribirse a gameState$ y viewMode$', () => {
    expect(component.gameState).toEqual(mockGameState);
    expect(component.isSpectator).toBeFalse();
  });

  it('debería suscribirse a isAdmin$', (done) => {
    mockAuthService.isAdmin$.and.returnValue(of(true));

    component.ngOnInit();

    setTimeout(() => {
      expect(component.isAdmin).toBeTrue();
      done();
    });
  });

  it('debería manejar la creación de un usuario', () => {
    const userData = {
      name: 'Player1',
      viewMode: 'player',
      isAdmin: false,
      isOwner: true
    };

    component.onUserCreated(userData);

    expect(component.isSpectator).toBeFalse();
    expect(component.isAdmin).toBeFalse();
    expect(component.currentUserName).toBe('Player1');
    expect(component.showUserModal).toBeFalse();
    expect(mockGameService.addCurrentUser).toHaveBeenCalledWith(userData);
    expect(mockViewModeService.changeViewMode).toHaveBeenCalledWith('player');
  });

  it('debería seleccionar una carta si no es espectador', () => {
    component.currentUserId = 'user123';
    component.isSpectator = false;

    component.onCardSelected('Ace');

    expect(mockGameService.selectCard).toHaveBeenCalledWith('user123', 'Ace');
  });

  it('no debería seleccionar una carta si es espectador', () => {
    component.isSpectator = true;

    component.onCardSelected('Ace');

    expect(mockGameService.selectCard).not.toHaveBeenCalled();
  });

  it('debería desuscribirse al destruir el componente', () => {
    const unsubscribeSpy = spyOn(component['subscriptions'], 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('debería actualizar isAdmin cuando cambia el estado de admin', (done) => {
    mockAuthService.isAdmin$.and.returnValue(of(true));

    component.ngOnInit();

    setTimeout(() => {
      expect(component.isAdmin).toBeTrue();

      mockAuthService.isAdmin$.and.returnValue(of(false));
      component.ngOnInit();

      setTimeout(() => {
        expect(component.isAdmin).toBeFalse();
        done();
      });
    });
  });

});
