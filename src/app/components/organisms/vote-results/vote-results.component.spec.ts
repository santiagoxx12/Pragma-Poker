import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoteResultsComponent } from './vote-results.component';
import { CommonModule } from '@angular/common';

describe('Componente VoteResultsComponent', () => {
  let component: VoteResultsComponent;
  let fixture: ComponentFixture<VoteResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, VoteResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crearse correctamente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Propiedad voteCount', () => {
    it('debería inicializarse como un objeto vacío', () => {
      expect(component.voteCount).toEqual({});
    });
  });

  describe('Propiedad averageVote', () => {
    it('debería inicializarse como null', () => {
      expect(component.averageVote).toBeNull();
    });
  });

  describe('Método votesArray', () => {
    it('debería devolver un array vacío si voteCount está vacío', () => {
      expect(component.votesArray).toEqual([]);
    });

    it('debería devolver un array de objetos con las claves y valores de voteCount', () => {
      component.voteCount = { 'A': 3, 'B': 5 };
      expect(component.votesArray).toEqual([
        { card: 'A', count: 3 },
        { card: 'B', count: 5 }
      ]);
    });
  });
});
