import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddCommentReplyComponent } from './team-add-comment-reply.component';

describe('TeamAddCommentReplyComponent', () => {
  let component: TeamAddCommentReplyComponent;
  let fixture: ComponentFixture<TeamAddCommentReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAddCommentReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddCommentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
