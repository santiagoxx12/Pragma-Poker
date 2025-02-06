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
  @Input() availableCards: string[] = [];
  @Input() selectedCard: string | null = null;
  @Input() isSpectator = false;
  @Output() onCardSelect = new EventEmitter<string>();

  selectCard(card: string) {
    if (!this.isSpectator) {
      this.onCardSelect.emit(card);
    }
  }
}
