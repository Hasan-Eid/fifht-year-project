import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWorkoutComponent } from './team-workout.component';

describe('TeamWorkoutComponent', () => {
  let component: TeamWorkoutComponent;
  let fixture: ComponentFixture<TeamWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
