import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-post',
  templateUrl: './team-post.component.html',
  styleUrls: ['./team-post.component.css']
})
export class TeamPostComponent implements OnInit {

post: any={
  id:3,
 content:`post contentthis is post contentthis is post contentthis
 post contentthis is post contentthis is post contentthis
 post contentthis is post contentthis is post contentthis
 post contentthis is post contentthis is post contentthis
 post contentthis is post contentthis is post contentthis
 post contentthis is post contentthis is post contentthis
 post contentthis is post contentthis is post contentthis
 post contentthis is post contentthis is post contentthis
  is post content`,
 images:['../../../assets/sports.jpg','../../../assets/r2.jpg','../../../assets/r5.jpg',],
 likes:144,
 comments:{num:200,comments:[]},
 shares:15
 };
 
  @ViewChild('viewMoreDiv')
  viewMoreDiv!: ElementRef<any>; 
  liked:boolean=false
  showImages:boolean=false
  shared:boolean=false
  previousState=false
  showMoreTimes=0
  showMoreVar=false
  toggled: boolean = false;
  constructor(private cdr: ChangeDetectorRef,private ts:TeamService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  deletePost(){
    this.ts.deletePost(this.post.id).subscribe((res)=>{
      console.log(res)
    })


  }

  contentHeight(p:HTMLParagraphElement){
    if(this.showMoreVar==false){
      this.showMoreVar =(Math.ceil((p.scrollHeight/24))>7)
      console.log((Math.ceil((p.scrollHeight/24))>7)+' from contentheight() '+this.post.id)
      return (Math.ceil((p.scrollHeight/24))>7)
    }
    
    return true
  }

  showComment(postId:any){
    console.log(postId)
 }  

commentInput(textarea:HTMLTextAreaElement){
    textarea.style.height='44px'
    textarea.style.height = textarea.scrollHeight + 'px'
        
  }
 
  handleSelection(event:any,textarea:HTMLTextAreaElement) {
    textarea.value+=event.char
    console.log(event.char);
  }
  
  addComment(e:any,textarea:HTMLTextAreaElement){
  
    if(e.keyCode === 13){
      console.log(textarea.value.trim())
      textarea.value=''
      textarea.style.height='44px'
    }
  }

  like(lk:HTMLElement){
    if(this.liked==true)
     { 
       this.post.likes--
       this.liked=false
       lk.style.color='white'
     }
     else{
      this.post.likes++
      this.liked=true
      lk.style.color='chartreuse'
     }
  }

 

  viewMore(p:HTMLParagraphElement,viewMore:HTMLElement){
    if(viewMore.textContent=='.. viewLess ..')
    {
      p.style.display='-webkit-box';
      viewMore.textContent='.. viewMore ..'
    }
    else
    {
      p.style.display='flex';
      viewMore.textContent='.. viewLess ..'
    }
  }


  back(secondSectionOfPost:HTMLSpanElement,viewMoreDiv:HTMLDivElement,p:HTMLParagraphElement){
    this.showImages=false
    secondSectionOfPost.style.display='initial'
    if(viewMoreDiv.classList.contains('shown')){
      viewMoreDiv.style.display='block'
    }
  
  }
  

  
  goTocarousel(secondSectionOfPost:HTMLSpanElement,viewMoreDiv:HTMLDivElement){
    this.showImages=true;
    secondSectionOfPost.style.display='none'
    viewMoreDiv.style.display='none';
     
  
  }


}
