import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit , AfterViewInit{
  @Input() post: any;
 
  @ViewChild('viewMoreDiv')
  viewMoreDiv!: ElementRef<any>; 
  liked:boolean=false
  showImages:boolean=false
  shared:boolean=false
  previousState=false
  showMoreTimes=0
  showMoreVar=false

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
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
  toggled: boolean = false;
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

  share(sh:HTMLElement){
    if(this.shared==true)
    { 
      this.post.shares--
      this.shared=false
      sh.style.color='white'
    }
    else{
     this.post.shares++
     this.shared=true
     sh.style.color='chartreuse'
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
