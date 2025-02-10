import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRoleModalComponent } from './admin-role-modal.component';

describe('AdminRoleModalComponent', () => {
  let component: AdminRoleModalComponent;
  let fixture: ComponentFixture<AdminRoleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoleModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRoleModalComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el evento cancel al llamar a onCancel', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('debería emitir el evento confirm al llamar a onConfirm', () => {
    spyOn(component.confirm, 'emit');
    component.onConfirm();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('debería recibir un nombre de jugador como input', () => {
    component.playerName = 'Juan Pérez';
    fixture.detectChanges();
    expect(component.playerName).toBe('Juan Pérez');
  });
});
