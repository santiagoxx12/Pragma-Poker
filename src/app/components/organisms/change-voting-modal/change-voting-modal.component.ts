import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-voting-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-voting-modal.component.html',
  styleUrl: './change-voting-modal.component.css'
})
export class ChangeVotingModalComponent implements OnInit {
  @Input() currentSystem: 'fibonacci' | 'power' = 'fibonacci';
  @Output() close = new EventEmitter<void>();
  @Output() systemChanged = new EventEmitter<'fibonacci' | 'power'>();

  selectedSystem: 'fibonacci' | 'power';

  constructor() {
    this.selectedSystem = 'fibonacci';
  }


  ngOnInit() {
    this.selectedSystem = 'fibonacci';
  }

  onCancel() {
    this.close.emit();
  }

  onAccept() {
    this.systemChanged.emit(this.selectedSystem);
    this.close.emit();
  }
}
