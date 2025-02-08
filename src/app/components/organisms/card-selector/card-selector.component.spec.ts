import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSelectorComponent } from './card-selector.component';
import { CommonModule } from '@angular/common';

describe('CardSelectorComponent', () => {
  let componente: CardSelectorComponent;
  let fixture: ComponentFixture<CardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CardSelectorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSelectorComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar con una lista vacía de cartas', () => {
    expect(componente.cards).toEqual([]);
  });

  it('debería emitir un evento cuando se selecciona una carta', () => {
    spyOn(componente.cardSelected, 'emit');
    const carta = 'As de Espadas';
    componente.selectCard(carta);
    expect(componente.selectedCard).toBe(carta);
    expect(componente.cardSelected.emit).toHaveBeenCalledWith(carta);
  });

  it('debería permitir seleccionar una carta de la lista', () => {
    componente.cards = ['Rey de Corazones', 'Dama de Tréboles', 'As de Espadas'];
    const cartaSeleccionada = 'Dama de Tréboles';

    componente.selectCard(cartaSeleccionada);

    expect(componente.selectedCard).toBe(cartaSeleccionada);
  });

  it('debería manejar correctamente una selección vacía', () => {
    componente.selectCard('');
    expect(componente.selectedCard).toBe('');
  });
});
