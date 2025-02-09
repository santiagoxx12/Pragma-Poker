import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-role-modal',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './admin-role-modal.component.html',
  styleUrl: './admin-role-modal.component.css'
})
export class AdminRoleModalComponent {
  @Input() playerName!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
