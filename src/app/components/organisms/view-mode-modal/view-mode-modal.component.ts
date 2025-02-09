import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViewModeService } from '../../../utils/services/view-mode.service';
import { RadioButtonComponent } from '../../atoms/radio-button/radio-button.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { GameService } from '../../../utils/services/game.service';

@Component({
  selector: 'app-view-mode-modal',
  standalone: true,
  imports: [RadioButtonComponent, ButtonComponent, ReactiveFormsModule], 
  templateUrl: './view-mode-modal.component.html',
  styleUrl: './view-mode-modal.component.css'
})
export class ViewModeModalComponent {
  @Output() close = new EventEmitter<void>();

  viewModeControl = new FormControl<'player' | 'spectator'>('player');
  viewModeForm = new FormGroup({
    viewMode: this.viewModeControl,
  });

  constructor(
    private readonly viewModeService: ViewModeService,
    private readonly gameService: GameService
  ) {
    this.viewModeControl.setValue(this.viewModeService.getCurrentViewMode());
  }

  onContinue() {
    if (this.viewModeForm.valid) {
      const newMode = this.viewModeControl.value as 'player' | 'spectator';
      this.viewModeService.changeViewMode(newMode);
      
      if (newMode === 'spectator') {
        setTimeout(() => {
          this.gameService.triggerDefaultPlayersSelection();
          setTimeout(() => {
            this.gameService.checkAndAutoReveal();
          }, 3000);
        }, 1000);
      }
      
      this.close.emit();
    }
  }
}