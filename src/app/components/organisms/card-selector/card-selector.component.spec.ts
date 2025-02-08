import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSelectorComponent } from './card-selector.component';
import { CommonModule } from '@angular/common';

describe('CardSelectorComponent', () => {
  let component: CardSelectorComponent;
  let fixture: ComponentFixture<CardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSelectorComponent, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
