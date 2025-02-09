import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameRoomComponent } from './game-room.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from '../../utils/services/game.service';
import { CommonModule } from '@angular/common';
import { CreateUserModalComponent } from '../../components/organisms/create-user-modal/create-user-modal.component';
import { GameHeaderComponent } from '../../components/molecules/game-header/game-header.component';
import { GameTableComponent } from '../../components/organisms/game-table/game-table.component';
import { CardSelectorComponent } from '../../components/organisms/card-selector/card-selector.component';

class MockGameService {
  gameState$ = of({
    players: [],
    currentVotingSystem: [],
    roomName: 'Test Room',
  });

  updateRoomName = jasmine.createSpy('updateRoomName');
  addCurrentUser = jasmine.createSpy('addCurrentUser').and.returnValue('user123');
  selectCard = jasmine.createSpy('selectCard');
  resetGameState = jasmine.createSpy('resetGameState');
  triggerDefaultPlayersSelection = jasmine.createSpy('triggerDefaultPlayersSelection');
}

describe('GameRoomComponent', () => {
  let component: GameRoomComponent;
  let fixture: ComponentFixture<GameRoomComponent>;
  let gameService: MockGameService;

  beforeEach(async () => {
    gameService = new MockGameService();
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        GameRoomComponent,
        CreateUserModalComponent,
        GameHeaderComponent,
        GameTableComponent,
        CardSelectorComponent,
      ],
      providers: [
        { provide: GameService, useValue: gameService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => 'Test Room' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with room name from route', () => {
    expect(component.roomName).toBe('Test Room');
    expect(gameService.updateRoomName).toHaveBeenCalledWith('Test Room');
  });

  it('should handle user creation', () => {
    const userData = { name: 'Alice', viewMode: 'player', isAdmin: false, isOwner: true };
    component.onUserCreated(userData);

    expect(component.isSpectator).toBeFalse();
    expect(component.currentUserName).toBe('Alice');
    expect(component.showUserModal).toBeFalse();
    expect(gameService.addCurrentUser).toHaveBeenCalledWith(userData);
  });

  it('should trigger spectator actions on user creation', () => {
    const userData = { name: 'Bob', viewMode: 'spectator', isAdmin: false , isOwner: true};
    component.onUserCreated(userData);

    expect(component.isSpectator).toBeTrue();
    expect(gameService.triggerDefaultPlayersSelection).toHaveBeenCalled();
  });

  it('should handle card selection', () => {
    component.currentUserId = 'user123';
    component.isSpectator = false;
    component.onCardSelected('Ace');
    expect(gameService.selectCard).toHaveBeenCalledWith('user123', 'Ace');
  });

  it('should not select card if user is spectator', () => {
    component.isSpectator = true;
    component.onCardSelected('Ace');
    expect(gameService.selectCard).not.toHaveBeenCalled();
  });

});
