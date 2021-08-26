import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, MyDataService } from 'src/app/services/my-data.service';
import { PostService } from 'src/app/services/post.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-add-comments',
  templateUrl: './team-add-comments.component.html',
  styleUrls: ['./team-add-comments.component.css']
})
export class TeamAddCommentsComponent implements OnInit {

  @Input() post: any;
  @Input() team_id: any

  constructor(private teamService: TeamService) {
   }
  
  hide_comments: boolean = true
  comments: Comment[] = []
  replies: Comment[] = []

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

  @Output() callParent = new EventEmitter();

  currentMsgToParent = 0;

  msgToParent() {
    this.currentMsgToParent = this.comments.length
    this.callParent.emit(this.currentMsgToParent);
  }

  ngOnInit(): void {
    this.getComments()
  }

  getComments(){
    this.teamService.getComments(this.post.id).subscribe(res => {
      for(let c of (res as any).comments){
        let comment: Comment
        comment =  {
          id: c.id,
          commenter: {id: c.profile? c.profile : c.trainer, name: c.profile? c.username : c.page_name},
          post: c.post,
          parent: c.parent,
          body: c.body,
          date: c.created
        }
        this.comments.push(comment)
      }
      for(let r of (res as any).replies){
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
      }
      
      this.msgToParent()
    }, 
    err => {
      console.log(err)
    })
  }
  
  toggleComments(){
    this.hide_comments = !this.hide_comments
  }

  

  commentInput(textarea:HTMLTextAreaElement){
    textarea.style.height='44px'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  addComment(e:any, textarea:HTMLTextAreaElement){
    if(e.keyCode === 13){
      this.teamService.addComment(MyDataService.myProfile.id, this.post.id, e.target.value, null).subscribe(res=>{
        let c = res as any
        let comment: Comment
        comment =  {
          id: c.id,
          commenter: {id: c.profile? c.profile : c.trainer, name: c.profile? c.username : c.page_name},
          post: c.post,
          parent: c.parent,
          body: c.body,
          date: c.created
        }
        this.comments.push(comment)
        this.msgToParent()
      })
      textarea.value=''
      textarea.style.height='44px'
    }
  }

}
