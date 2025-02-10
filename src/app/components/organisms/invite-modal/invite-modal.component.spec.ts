import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InviteModalComponent } from './invite-modal.component';

describe('Componente InviteModal', () => {
  let component: InviteModalComponent;
  let fixture: ComponentFixture<InviteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización del componente', () => {
    it('debería crearse', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar con el texto del botón "Copiar invitación"', () => {
      expect(component.buttonText).toBe('Copiar invitación');
    });
  });

  describe('Método inviteUrl', () => {
    it('debería devolver la URL actual de la página', () => {
      expect(component.inviteUrl).toBe(window.location.href);
    });
  });

  describe('Método copyInviteUrl', () => {
    it('debería cambiar el texto del botón a "Copiando..." mientras copia', async () => {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
      component.copyInviteUrl();
      expect(component.buttonText).toBe('Copiando...');
    });

    it('debería cambiar el texto del botón a "¡Copiado!" después de copiar con éxito', async () => {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
      await component.copyInviteUrl();
      expect(component.buttonText).toBe('¡Copiado!');
    });

    it('debería cambiar el texto del botón a "Error al copiar" si ocurre un error', async () => {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject(new Error('Fallo en la copia')));
      await component.copyInviteUrl();
      expect(component.buttonText).toBe('Error al copiar');
    });

  });


  describe('Método toggleCopyState', () => {
    it('debería actualizar el estado de copia y restaurarlo después de 2 segundos', (done) => {
      component.toggleCopyState('Copiando...');
      expect(component.iscopying).toBeTrue();
      expect(component.buttonText).toBe('Copiando...');

      setTimeout(() => {
        expect(component.buttonText).toBe('Copiar invitación');
        expect(component.iscopying).toBeFalse();
        done();
      }, 2000);
    });
  });

  describe('Evento close', () => {
    it('debería emitir el evento close cuando se llame', () => {
      spyOn(component.close, 'emit');
      component.close.emit();
      expect(component.close.emit).toHaveBeenCalled();
    });
  });
});
