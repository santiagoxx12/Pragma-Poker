import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringSelectorComponent } from './scoring-selector.component';

describe('ScoringSelectorComponent', () => {
  let component: ScoringSelectorComponent;
  let fixture: ComponentFixture<ScoringSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoringSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoringSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
