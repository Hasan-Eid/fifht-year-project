import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentReplyComponent } from './add-comment-reply.component';

describe('AddCommentReplyComponent', () => {
  let component: AddCommentReplyComponent;
  let fixture: ComponentFixture<AddCommentReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
