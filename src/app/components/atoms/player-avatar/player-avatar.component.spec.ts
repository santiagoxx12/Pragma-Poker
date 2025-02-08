import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerAvatarComponent } from './player-avatar.component';
import { CommonModule } from '@angular/common';

describe('PlayerAvatarComponent', () => {
  let component: PlayerAvatarComponent;
  let fixture: ComponentFixture<PlayerAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PlayerAvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería generar iniciales correctas para nombres con dos palabras', () => {
    component.name = 'Juan Pérez';
    expect(component.getInitials()).toBe('JP');
  });

  it('debería generar dos primeras letras para nombres con una sola palabra', () => {
    component.name = 'Mariana';
    expect(component.getInitials()).toBe('MA');
  });

  it('debería manejar nombres vacíos sin errores', () => {
    component.name = '';
    expect(component.getInitials()).toBe('');
  });
});
