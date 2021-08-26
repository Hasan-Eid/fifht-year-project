import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWorkoutsComponent } from './team-workouts.component';

describe('TeamWorkoutsComponent', () => {
  let component: TeamWorkoutsComponent;
  let fixture: ComponentFixture<TeamWorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamWorkoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
