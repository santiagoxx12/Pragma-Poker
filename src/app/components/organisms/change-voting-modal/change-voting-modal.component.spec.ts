import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeVotingModalComponent } from './change-voting-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ChangeVotingModalComponent', () => {
  let component: ChangeVotingModalComponent;
  let fixture: ComponentFixture<ChangeVotingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ChangeVotingModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeVotingModalComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialización del componente', () => {
    it('debería crearse correctamente', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('debería inicializar `selectedSystem` como "fibonacci"', () => {
      fixture.detectChanges();
      expect(component.selectedSystem).toBe('fibonacci');
    });

    it('debería asignar el sistema actual recibido por @Input', async () => {
      component.currentSystem = 'power';
      fixture.detectChanges();

      await fixture.whenStable();
      expect(component.currentSystem).toBe('power');
    });
  });

  describe('Interacciones del usuario', () => {
    it('debería emitir el evento `close` al cancelar', () => {
      spyOn(component.close, 'emit');
      component.onCancel();
      expect(component.close.emit).toHaveBeenCalled();
    });

    it('debería emitir `systemChanged` con el sistema seleccionado al aceptar', () => {
      spyOn(component.systemChanged, 'emit');
      spyOn(component.close, 'emit');

      component.selectedSystem = 'power';
      component.onAccept();

      expect(component.systemChanged.emit).toHaveBeenCalledWith('power');
      expect(component.close.emit).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    beforeEach(async () => {
      component.currentSystem = 'power';
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('debería mostrar siempre fibonacci en el input', async () => {
      component.currentSystem = 'power';
      fixture.detectChanges();
      await fixture.whenStable();

      const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('.voting-select');
      expect(selectElement.value).toBe('fibonacci');
    });

    it('debería llamar a `onCancel` cuando se haga clic en el botón de cancelar', () => {
      spyOn(component, 'onCancel');

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-cancel');
      button.click();

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('debería llamar a `onAccept` cuando se haga clic en el botón de aceptar', () => {
      spyOn(component, 'onAccept');

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-confirm');
      button.click();

      fixture.detectChanges();
      expect(component.onAccept).toHaveBeenCalled();
    });
  });
});
