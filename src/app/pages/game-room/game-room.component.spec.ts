import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameRoomComponent } from './game-room.component';
import { CreateUserModalComponent } from '../../components/organisms/create-user-modal/create-user-modal.component';
import { GameHeaderComponent } from '../../components/molecules/game-header/game-header.component';
import { GameTableComponent } from '../../components/organisms/game-table/game-table.component';
import { CardSelectorComponent } from '../../components/organisms/card-selector/card-selector.component';
import { GameService } from '../../utils/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('GameRoomComponent', () => {
  let component: GameRoomComponent;
  let fixture: ComponentFixture<GameRoomComponent>;
  let gameServiceMock: jasmine.SpyObj<GameService>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    gameServiceMock = jasmine.createSpyObj('GameService', ['updateRoomName', 'addCurrentUser', 'updatePlayerCard'], {
      gameState$: of({
        players: [
          { id: '1', name: 'Alice', isSpectator: false, isAdmin: false, selectedCard: null, position: 1 }
        ],
        currentVotingSystem: ['1', '2', '3', '5', '8'],
        roomName: 'TestRoom'
      })
    });

    activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', [], {
      paramMap: of({ get: (key: string) => (key === 'gameName' ? 'TestRoom' : null) })
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CreateUserModalComponent,
        GameHeaderComponent,
        GameTableComponent,
        CardSelectorComponent,
        GameRoomComponent
      ],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el nombre de la sala desde la ruta', () => {
    expect(component.roomName).toBe('TestRoom');
    expect(gameServiceMock.updateRoomName).toHaveBeenCalledWith('TestRoom');
  });

  it('debería actualizar los datos del estado del juego', () => {
    expect(component.players.length).toBe(1);
    expect(component.players[0].name).toBe('Alice');
    expect(component.votingSystem.length).toBe(5);
    expect(component.roomName).toBe('TestRoom');
  });

  it('debería manejar la creación de usuario correctamente', () => {
    const eventData = { name: 'Bob', viewMode: 'player', isAdmin: true };
    gameServiceMock.addCurrentUser.and.returnValue('123');

    component.onUserCreated(eventData);

    expect(component.isSpectator).toBeFalse();
    expect(component.currentUserName).toBe('Bob');
    expect(component.showUserModal).toBeFalse();
    expect(component.currentUserId).toBe('123');

    const storedUser = JSON.parse(localStorage.getItem('user') ?? '{}');
    expect(storedUser.name).toBe('Bob');
    expect(storedUser.viewMode).toBe('player');
    expect(storedUser.isAdmin).toBeTrue();
  });

  it('debería actualizar la carta seleccionada solo si el usuario no es espectador', () => {
    component.isSpectator = false;
    component.currentUserId = '123';
    component.onCardSelected('5');

    expect(gameServiceMock.updatePlayerCard).toHaveBeenCalledWith('123', '5');
  });

  it('no debería actualizar la carta si el usuario es espectador', () => {
    component.isSpectator = true;
    component.onCardSelected('5');

    expect(gameServiceMock.updatePlayerCard).not.toHaveBeenCalled();
  });
});
