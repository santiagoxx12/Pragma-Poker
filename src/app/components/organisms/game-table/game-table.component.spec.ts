import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameTableComponent } from './game-table.component';
import { PlayerAvatarComponent } from '../../atoms/player-avatar/player-avatar.component';
import { CommonModule } from '@angular/common';

describe('GameTableComponent', () => {
  let component: GameTableComponent;
  let fixture: ComponentFixture<GameTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PlayerAvatarComponent, GameTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTableComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener los jugadores en la parte superior', () => {
    component.players = [
      { id: '1', name: 'Alice', isSpectator: false, isAdmin: false, selectedCard: null, position: 1 },
      { id: '2', name: 'Bob', isSpectator: false, isAdmin: false, selectedCard: null, position: 2 },
      { id: '3', name: 'Charlie', isSpectator: false, isAdmin: false, selectedCard: null, position: 3 }
    ];
    expect(component.topPlayers.length).toBe(2);
    expect(component.topPlayers[0].name).toBe('Alice');
    expect(component.topPlayers[1].name).toBe('Bob');
  });

  it('debería obtener los jugadores en la parte inferior', () => {
    component.players = [
      { id: '6', name: 'Eve', isSpectator: false, isAdmin: false, selectedCard: null, position: 6 },
      { id: '7', name: 'Mallory', isSpectator: false, isAdmin: false, selectedCard: null, position: 7 },
      { id: '5', name: 'Trent', isSpectator: false, isAdmin: false, selectedCard: null, position: 5 }
    ];
    expect(component.bottomPlayers.length).toBe(2);
    expect(component.bottomPlayers[0].name).toBe('Eve');
    expect(component.bottomPlayers[1].name).toBe('Mallory');
  });

  it('debería obtener el jugador en la posición izquierda', () => {
    component.players = [
      { id: '3', name: 'Charlie', isSpectator: false, isAdmin: false, selectedCard: null, position: 3 },
      { id: '4', name: 'Dave', isSpectator: false, isAdmin: false, selectedCard: null, position: 4 }
    ];
    expect(component.leftPlayer?.name).toBe('Charlie');
  });

  it('debería obtener el jugador en la posición derecha', () => {
    component.players = [
      { id: '5', name: 'Trent', isSpectator: false, isAdmin: false, selectedCard: null, position: 5 },
      { id: '6', name: 'Eve', isSpectator: false, isAdmin: false, selectedCard: null, position: 6 }
    ];
    expect(component.rightPlayer?.name).toBe('Trent');
  });

  it('debería retornar undefined si no hay jugadores en la izquierda o derecha', () => {
    component.players = [
      { id: '1', name: 'Alice', isSpectator: false, isAdmin: false, selectedCard: null, position: 1 },
      { id: '2', name: 'Bob', isSpectator: false, isAdmin: false, selectedCard: null, position: 2 }
    ];
    expect(component.leftPlayer).toBeUndefined();
    expect(component.rightPlayer).toBeUndefined();
  });
});
