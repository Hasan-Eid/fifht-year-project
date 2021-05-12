import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
export class AddCommentsComponent implements OnInit {
  @Input() postID: any;
  constructor(private ps:PostService) { }
  
  comments=[
    {
      userName:'Hasan Eid',
      body:'comment content is here',
      parent:1,
      id:3,
      image:'../../../assets/r4.jpg'
    },
    {
      userName:'Hasan Eid',
      id:1,
      body:'comment content is here',
      parent:null,
      image:'../../../assets/r4.jpg'
    },
    {
      userName:'Hasan Eid',
      body:'comment content is here',
      id:4,
      parent:1,
      image:'../../../assets/r4.jpg'
    },
    {
      userName:'Hasan Eid',
      body:'comment content is here',
      parent:2,
      id:5,
      image:'../../../assets/r4.jpg'
    },
    {
      userName:'Hasan Eid',
      body:'comment content is here',
      parent:null,
      id:6,
      image:'../../../assets/r4.jpg'
    },{
      userName:'Hasan Eid',
      body:'comment content is here',
      parent:4,
      id:7,
      image:'../../../assets/r4.jpg'
    },
]

  ngOnInit(): void {
  }
  
  showPreviousComments(){
    console.log(this.postID +'s')
    

  }
  addComment(e:any,textarea:HTMLTextAreaElement){
    
    if(e.keyCode === 13){
      textarea.style.height='44px'
      // console.log(e.target.value);
      // this.ps.addComment(profile,trainer,post,body,parent).subscribe(res=>{
      //   console.log(res)
      // })
      console.log(textarea.value.trim()+'d')
      textarea.value=''
      textarea.style.height='44px'
    }
  }

  back(replySection:any,reply:HTMLElement,back:HTMLElement){
      replySection.innerHTML=''
      back.style.display='none'
      reply.style.display='initial'
  }

  reply(commentId:any,replySection:HTMLDivElement,reply:HTMLElement,back:HTMLElement){
    console.log(commentId)
    back.style.display='initial'
    reply.style.display='none'

   for(let comment of this.comments){
     if(comment.parent==commentId){
       
     let userName=document.createElement('h6')
     userName.textContent=comment.userName

     let time=document.createElement('span')
     time.classList.add('time')
     time.innerHTML=`<i class="bi bi-watch"></i>
                    <span> 1h</span>`
    let commentHeader=document.createElement('div')
    commentHeader.classList.add('commentHeader')
    commentHeader.appendChild(userName)
    commentHeader.appendChild(time)


    let commentContent=document.createElement('div')
    commentContent.classList.add('commentContent')
    commentContent.textContent=comment.body

    
    let likeIcon=document.createElement('i')
    likeIcon.classList.add('bi','bi-hand-thumbs-up','like')
    likeIcon.onclick=()=>{
      this.like()
    }

    let replyLink=document.createElement('a')
    replyLink.textContent='reply'
    replyLink.onclick=()=>{
      this.reply(comment.id,replySectionDiv,replyLink,backLink) 
       }
    let backLink=document.createElement('a')
    backLink.textContent='back'
    backLink.style.display='none'
    backLink.onclick=()=>{
      this.back(replySectionDiv,replyLink,backLink) 
          }
   
    let likeComment=document.createElement('div')
    likeComment.classList.add('likeComment')
    likeComment.appendChild(likeIcon)
    likeComment.appendChild(replyLink)
    likeComment.appendChild(backLink)
    
    let secondDiv=document.createElement('div')
    secondDiv.appendChild(commentHeader)
    secondDiv.appendChild(commentContent)
    secondDiv.appendChild(likeComment)

    
    let img=document.createElement('img')
    img.classList.add('atheletImage')
    img.src=comment.image

    let commentDiv=document.createElement('div')
    commentDiv.classList.add('commentDiv','secondaryCommentDiv')
    commentDiv.appendChild(img)
    commentDiv.appendChild(secondDiv)


    let replySectionDiv=document.createElement('div')
    replySectionDiv.classList.add('secondaryCommentDiv')
    
    let secondary=document.createElement('div')
    secondary.appendChild(commentDiv)
    secondary.appendChild(replySectionDiv)
    

    replySection.appendChild(secondary)


     }
     
   }
                          
let textarea=document.createElement('textarea')
textarea.classList.add('secondaryCommentTextarea')

textarea.placeholder="write comment ..."
textarea.oninput=()=>{
                     this.commentInput(textarea)
                  }
textarea.onkeyup=(e)=>{
 this.addComment(e,textarea)

}
let emoji=document.createElement('i')
emoji.classList.add("bi", "bi-emoji-smile" ,"emojiIcom")

 let commentDiv=document.createElement('div')
 commentDiv.appendChild(textarea)
 commentDiv.appendChild(emoji)
 

   let commentOnReply=document.createElement('div')
   commentOnReply.classList.add('secondaryCommentDiv','secondaryWriteCommentSection')
   commentOnReply.appendChild(commentDiv)
     replySection.appendChild(commentOnReply)
    
  }

  like(){
    
  }
  
  // calcHeight(value:any) {
  //   return (value.match(/\n/g) || []).length;
    
  // }
  commentInput(textarea:HTMLTextAreaElement){
    textarea.style.height='44px'
    textarea.style.height = textarea.scrollHeight + 'px'
        
  }
}
