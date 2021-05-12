import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPostComponent } from './team-post.component';

describe('TeamPostComponent', () => {
  let component: TeamPostComponent;
  let fixture: ComponentFixture<TeamPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
