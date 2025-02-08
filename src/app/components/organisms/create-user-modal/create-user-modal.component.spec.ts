import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserModalComponent } from './create-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { RadioButtonComponent } from '../../atoms/radio-button/radio-button.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';

describe('CreateUserModalComponent', () => {
  let component: CreateUserModalComponent;
  let fixture: ComponentFixture<CreateUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        InputFieldComponent,
        RadioButtonComponent,
        ButtonComponent,
        CommonModule,
        CreateUserModalComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserModalComponent);
    component = fixture.componentInstance;
    localStorage.removeItem('user');
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    expect(component.nameControl.value).toBe('');
    expect(component.viewModeControl.value).toBe('player');
  });

  it('debería cargar el usuario desde localStorage si existe', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'TestUser' }));
    component.ngOnInit();
    expect(component.nameControl.value).toBe('TestUser');
  });

  it('debería validar que el formulario es inválido si el nombre no cumple las reglas', () => {
    component.nameControl.enable();
    component.nameControl.setValue('ab');
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalse();
  });


  it('debería emitir el evento userCreated con los datos correctos al enviar el formulario', () => {
    spyOn(component.userCreated, 'emit');
    spyOn(component.close, 'emit');

    component.nameControl.setValue('ValidUser');
    component.viewModeControl.setValue('admin');
    fixture.detectChanges();

    component.onSubmit();

    expect(component.userCreated.emit).toHaveBeenCalledWith({
      name: 'ValidUser',
      viewMode: 'admin',
      isAdmin: true,
    });

    expect(component.close.emit).toHaveBeenCalled();
  });

});
