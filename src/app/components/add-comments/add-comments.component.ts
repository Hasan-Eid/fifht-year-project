import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Post, Comment, MyDataService } from 'src/app/services/my-data.service';
import { PostService } from 'src/app/services/post.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
export class AddCommentsComponent implements OnInit {

  @Input() post: any;

  constructor(private ps:PostService, private teamService: TeamService) {
    // console.log(this.DateDiff.diff(new Date(2021, 5, 28), this.DateDiff.now()))
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

  // commentsCount: number = 0

  // msgToParent(commentsCount: number){
  //   this.commentsCount = commentsCount
  // }

  @Output() callParent = new EventEmitter();

  currentMsgToParent = 0;

  msgToParent() {
    this.currentMsgToParent = this.comments.length
    this.callParent.emit(this.currentMsgToParent);
  }

  
//   comments=[
//     {
//       userName:'Hasan Eid',
//       body:'comment content is here',
//       parent:1,
//       id:3,
//       image:'../../../assets/r4.jpg'
//     },
//     {
//       userName:'Hasan Eid',
//       id:1,
//       body:'comment content is here',
//       parent:null,
//       image:'../../../assets/r4.jpg'
//     },
//     {
//       userName:'Hasan Eid',
//       body:'comment content is here',
//       id:4,
//       parent:1,
//       image:'../../../assets/r4.jpg'
//     },
//     {
//       userName:'Hasan Eid',
//       body:'comment content is here',
//       parent:2,
//       id:5,
//       image:'../../../assets/r4.jpg'
//     },
//     {
//       userName:'Hasan Eid',
//       body:'comment content is here',
//       parent:null,
//       id:6,
//       image:'../../../assets/r4.jpg'
//     },{
//       userName:'Hasan Eid',
//       body:'comment content is here',
//       parent:4,
//       id:7,
//       image:'../../../assets/r4.jpg'
//     },
// ]

  ngOnInit(): void {
    this.getComments()
  }

  getComments(){
    this.ps.getComments(this.post.id).subscribe(res => {
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
      this.ps.addComment(MyDataService.myProfile.id, this.post.id, e.target.value, null).subscribe(res=>{
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

  

//   back(replySection:any,reply:HTMLElement,back:HTMLElement){
//       replySection.innerHTML=''
//       back.style.display='none'
//       reply.style.display='initial'
//   }

//   reply(commentId:any,replySection:HTMLDivElement,reply:HTMLElement,back:HTMLElement){
//     console.log(commentId)
//     back.style.display='initial'
//     reply.style.display='none'

//    for(let comment of this.comments){
//      if(comment.parent==commentId){
       
//      let userName=document.createElement('h6')
//      userName.textContent=comment.commenter.name

//      let time=document.createElement('span')
//      time.classList.add('time')
//      time.innerHTML=`<i class="bi bi-watch"></i>
//                     <span> 1h</span>`
//     let commentHeader=document.createElement('div')
//     commentHeader.classList.add('commentHeader')
//     commentHeader.appendChild(userName)
//     commentHeader.appendChild(time)


//     let commentContent=document.createElement('div')
//     commentContent.classList.add('commentContent')
//     commentContent.textContent=comment.body

    
//     let likeIcon=document.createElement('i')
//     likeIcon.classList.add('bi','bi-hand-thumbs-up','like')
//     likeIcon.onclick=()=>{
//       this.like()
//     }

//     let replyLink=document.createElement('a')
//     replyLink.textContent='reply'
//     replyLink.onclick=()=>{
//       this.reply(comment.id,replySectionDiv,replyLink,backLink) 
//        }
//     let backLink=document.createElement('a')
//     backLink.textContent='back'
//     backLink.style.display='none'
//     backLink.onclick=()=>{
//       this.back(replySectionDiv,replyLink,backLink) 
//           }
   
//     let likeComment=document.createElement('div')
//     likeComment.classList.add('likeComment')
//     likeComment.appendChild(likeIcon)
//     likeComment.appendChild(replyLink)
//     likeComment.appendChild(backLink)
    
//     let secondDiv=document.createElement('div')
//     secondDiv.appendChild(commentHeader)
//     secondDiv.appendChild(commentContent)
//     secondDiv.appendChild(likeComment)

    
//     let img=document.createElement('img')
//     img.classList.add('atheletImage')
//     // img.src=comment.image

//     let commentDiv=document.createElement('div')
//     commentDiv.classList.add('commentDiv','secondaryCommentDiv')
//     commentDiv.appendChild(img)
//     commentDiv.appendChild(secondDiv)


//     let replySectionDiv=document.createElement('div')
//     replySectionDiv.classList.add('secondaryCommentDiv')
    
//     let secondary=document.createElement('div')
//     secondary.appendChild(commentDiv)
//     secondary.appendChild(replySectionDiv)
    

//     replySection.appendChild(secondary)


//      }
     
//    }
                          
// let textarea=document.createElement('textarea')
// textarea.classList.add('secondaryCommentTextarea')

// textarea.placeholder="write comment ..."
// textarea.oninput=()=>{
//                      this.commentInput(textarea)
//                   }
// textarea.onkeyup=(e)=>{
//  this.addComment(e,textarea)

// }
// let emoji=document.createElement('i')
// emoji.classList.add("bi", "bi-emoji-smile" ,"emojiIcom")

//  let commentDiv=document.createElement('div')
//  commentDiv.appendChild(textarea)
//  commentDiv.appendChild(emoji)
 

//    let commentOnReply=document.createElement('div')
//    commentOnReply.classList.add('secondaryCommentDiv','secondaryWriteCommentSection')
//    commentOnReply.appendChild(commentDiv)
//      replySection.appendChild(commentOnReply)
    
//   }

  like(){
    
  }
  
  // calcHeight(value:any) {
  //   return (value.match(/\n/g) || []).length;
    
  // }
  
}
