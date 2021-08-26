import { Component, Input, OnInit } from '@angular/core';
import { Comment, MyDataService, Post } from 'src/app/services/my-data.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-comment-reply',
  templateUrl: './add-comment-reply.component.html',
  styleUrls: ['./add-comment-reply.component.css']
})
export class AddCommentReplyComponent implements OnInit {

  @Input() post: Post = {
    id: 0,
    poster: {id: 0, type: ''},
    poster_data: {name: '', image: ''},
    title: '',
    content: '',
    images: [],
    date: new Date(),
    like: {likes: 0, isLiked: false},
    share: {shares: 0, isShared: false}
  }
  @Input() comment: Comment = {
    id: 0,
    commenter: {id: 0, name: ''},
    post: 0,
    parent: 0,
    body: '',
    date: new Date()
  }
  @Input() replies: Comment[] = []

  DateDiff = {

    now: function(){
      return new Date()
    },

    toDate: function(date: Date){
      return new Date(date)
    },

    inDays: function(d1: Date, d2: Date) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return Math.floor((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1: Date, d2: Date) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return Math.floor((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1: Date, d2: Date) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1: Date, d2: Date) {
        return d2.getFullYear()-d1.getFullYear();
    },

    diff: function(d1: Date, d2: Date){
      if(this.inDays(d1, d2) < 7) return this.inDays(d1, d2) + ' d'
      else if(this.inWeeks(d1, d2) < 5) return this.inWeeks(d1, d2) + ' w'
      else if(this.inMonths(d1, d2) < 12) return this.inMonths(d1, d2) + ' m'
      else return this.inYears(d1, d2) + ' y'
    }
  }

  constructor(private ps: PostService) { }

  ngOnInit(): void {
  }

  reply_comment: boolean = false

  toggleReply(){
    this.reply_comment = !this.reply_comment
  }

  commentInput(textarea:HTMLTextAreaElement){
    textarea.style.height='44px'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  addReply(e:any, textarea:HTMLTextAreaElement, parent: any){
    if(e.keyCode === 13){
      this.ps.addComment(MyDataService.myProfile.id, this.post.id, e.target.value, parent).subscribe(res=>{
        let r = res as any
        let reply: Comment
        reply =  {
          id: r.id,
          commenter: {id: r.profile? r.profile : r.trainer, name: r.profile? r.username : r.page_name},
          post: r.post,
          parent: r.parent,
          body: r.body,
          date: r.created
        }
        this.replies.push(reply)
      })
      textarea.value=''
      textarea.style.height='44px'
    }
  }

}
