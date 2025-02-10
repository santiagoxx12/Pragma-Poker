import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ViewModeModalComponent } from './view-mode-modal.component';
import { ViewModeService } from '../../../utils/services/view-mode.service';
import { GameService } from '../../../utils/services/game.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from '../../atoms/radio-button/radio-button.component';
import { ButtonComponent } from '../../atoms/button/button.component';

describe('Componente ViewModeModal', () => {
  let component: ViewModeModalComponent;
  let fixture: ComponentFixture<ViewModeModalComponent>;
  let mockViewModeService: jasmine.SpyObj<ViewModeService>;
  let mockGameService: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    mockViewModeService = jasmine.createSpyObj('ViewModeService', ['getCurrentViewMode', 'changeViewMode']);
    mockGameService = jasmine.createSpyObj('GameService', ['triggerDefaultPlayersSelection', 'checkAndAutoReveal']);

    mockViewModeService.getCurrentViewMode.and.returnValue('player');

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RadioButtonComponent, ButtonComponent, ViewModeModalComponent],
      providers: [
        { provide: ViewModeService, useValue: mockViewModeService },
        { provide: GameService, useValue: mockGameService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crearse', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar el formulario con el modo de vista actual', () => {
      expect(component.viewModeControl.value).toBe('player');
    });
  });

  describe('Método onContinue', () => {
    it('debería cambiar el modo de vista si el formulario es válido', () => {
      component.viewModeControl.setValue('spectator');
      component.onContinue();

      expect(mockViewModeService.changeViewMode).toHaveBeenCalledWith('spectator');
    });

    it('debería llamar a triggerDefaultPlayersSelection y checkAndAutoReveal si el modo es espectador', fakeAsync(() => {
      component.viewModeControl.setValue('spectator');
      component.onContinue();
      tick(1000);
      expect(mockGameService.triggerDefaultPlayersSelection).toHaveBeenCalled();
      tick(3000);
      expect(mockGameService.checkAndAutoReveal).toHaveBeenCalled();
    }));

    it('debería emitir el evento close después de continuar', () => {
      spyOn(component.close, 'emit');
      component.onContinue();
      expect(component.close.emit).toHaveBeenCalled();
    });
  });
});
