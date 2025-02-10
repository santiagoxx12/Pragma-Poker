import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSelectorComponent } from './card-selector.component';

describe('CardSelectorComponent', () => {
  let component: CardSelectorComponent;
  let fixture: ComponentFixture<CardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSelectorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSelectorComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar selectedCard como null', () => {
    expect(component.selectedCard).toBeNull();
  });

  it('debería establecer selectedCard en null cuando las cartas cambian', () => {
    component.cards = ['A', 'B', 'C'];
    fixture.detectChanges();
    component.ngOnChanges({ cards: { previousValue: [], currentValue: ['A', 'B', 'C'], firstChange: false, isFirstChange: () => false } });
    expect(component.selectedCard).toBeNull();
  });

  it('debería emitir el evento cardSelected al seleccionar una carta', () => {
    spyOn(component.cardSelected, 'emit');
    const carta = 'A';
    component.selectCard(carta);
    expect(component.selectedCard).toBe(carta);
    expect(component.cardSelected.emit).toHaveBeenCalledWith(carta);
  });

  it('debería actualizar selectedCard al seleccionar una carta', () => {
    const carta = 'B';
    component.selectCard(carta);
    expect(component.selectedCard).toBe(carta);
  });
});
