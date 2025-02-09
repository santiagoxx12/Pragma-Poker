import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-invite-modal',
  standalone: true,
  templateUrl: './invite-modal.component.html',
  styleUrl: './invite-modal.component.css'
})
export class InviteModalComponent {
  @Output() close = new EventEmitter<void>();

  iscopying = false;
  buttonText = 'Copiar invitación';

  get inviteUrl(): string {
    return window.location.href;
  }

  async copyInviteUrl(): Promise<void> {
    this.toggleCopyState('Copiando...');
    try {
      await navigator.clipboard.writeText(this.inviteUrl);
      this.toggleCopyState('¡Copiado!');
    } catch {
      this.toggleCopyState('Error al copiar');
    }
  }

  private toggleCopyState(text: string): void {
    this.iscopying = true;
    this.buttonText = text;
    setTimeout(() => {
      this.buttonText = 'Copiar invitación';
      this.iscopying = false;
    }, 2000);
  }
}
