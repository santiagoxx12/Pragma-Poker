import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-selector.component.html',
  styleUrl: './card-selector.component.css'
})
export class CardSelectorComponent {
  @Input() cards: string[] = [];
  @Output() cardSelected = new EventEmitter<string>();
  selectedCard: string | null = null;

  selectCard(card: string) {
    this.selectedCard = card;
    this.cardSelected.emit(card);
  }

}
