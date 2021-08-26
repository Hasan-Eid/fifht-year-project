import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddCommentsComponent } from './team-add-comments.component';

describe('TeamAddCommentsComponent', () => {
  let component: TeamAddCommentsComponent;
  let fixture: ComponentFixture<TeamAddCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAddCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
