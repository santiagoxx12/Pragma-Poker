import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-scoring-selector',
  standalone: true,

  templateUrl: './scoring-selector.component.html',
  styleUrl: './scoring-selector.component.css'
})
export class ScoringSelectorComponent {
  @Output() onScoringChange = new EventEmitter<'default' | 'fibonacci' | 'tshirt'>();

  isOpen = false;

  scoringSystems: { label: string; value: 'default' | 'fibonacci' | 'tshirt' }[] = [
    { label: 'Planning Poker', value: 'default' },
    { label: 'Fibonacci', value: 'fibonacci' },
    { label: 'Tallas', value: 'tshirt' }
  ];


  onSystemSelect(system: 'default' | 'fibonacci' | 'tshirt') {
    this.onScoringChange.emit(system);
    this.isOpen = false;
  }
}
