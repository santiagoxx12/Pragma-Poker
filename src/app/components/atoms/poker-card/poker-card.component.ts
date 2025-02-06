import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-poker-card',
  standalone: true,

  templateUrl: './poker-card.component.html',
  styleUrl: './poker-card.component.css'
})
export class PokerCardComponent {
  @Input() value!: string;
  @Input() selected = false;
  @Input() isSpectator = false;
  @Output() onSelect = new EventEmitter<string>();

  get cardClasses(): string {
    return `
      w-16 h-24 rounded-lg border-2
      ${this.isSpectator ? 'border-gray-300 bg-gray-100' : 'border-purple-500'}
      ${this.selected ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}
      flex items-center justify-center cursor-pointer
      transition-all duration-200 hover:scale-105
      ${this.isSpectator ? 'cursor-not-allowed' : ''}
    `;
  }
}
