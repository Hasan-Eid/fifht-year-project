import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSwitchingComponent } from './trainer-switching.component';

describe('TrainerSwitchingComponent', () => {
  let component: TrainerSwitchingComponent;
  let fixture: ComponentFixture<TrainerSwitchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerSwitchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSwitchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
