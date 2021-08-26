import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWorkoutsComponent } from './profile-workouts.component';

describe('ProfileWorkoutsComponent', () => {
  let component: ProfileWorkoutsComponent;
  let fixture: ComponentFixture<ProfileWorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileWorkoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
