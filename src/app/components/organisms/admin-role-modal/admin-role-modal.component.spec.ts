import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleModalComponent } from './admin-role-modal.component';

describe('AdminRoleModalComponent', () => {
  let component: AdminRoleModalComponent;
  let fixture: ComponentFixture<AdminRoleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRoleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
