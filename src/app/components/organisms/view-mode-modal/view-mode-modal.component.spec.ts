import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModeModalComponent } from './view-mode-modal.component';

describe('ViewModeModalComponent', () => {
  let component: ViewModeModalComponent;
  let fixture: ComponentFixture<ViewModeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewModeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewModeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
