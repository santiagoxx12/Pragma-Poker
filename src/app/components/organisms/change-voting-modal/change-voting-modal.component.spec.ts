import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeVotingModalComponent } from './change-voting-modal.component';

describe('ChangeVotingModalComponent', () => {
  let component: ChangeVotingModalComponent;
  let fixture: ComponentFixture<ChangeVotingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeVotingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeVotingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
