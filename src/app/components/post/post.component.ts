import { Component, OnInit, EventEmitter, Input, ElementRef, ChangeDetectorRef, ViewChild, AfterViewInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MyDataService, Post, Profile } from 'src/app/services/my-data.service';
import { PostService } from 'src/app/services/post.service';
import { AddCommentsComponent } from '../add-comments/add-comments.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit , AfterViewInit{
  
  @Input() post: Post = {
    id: 0,
    poster: {id: 0, type: ''},
    poster_data: {name: '', image: ''},
    title: '',
    content: '',
    images: [''],
    date: new Date(),
    like: {likes: 0, isLiked: false},
    share: {shares: 0, isShared: false}
  }

  commentsCount: number = 0;
 
  @ViewChild('viewMoreDiv')
  viewMoreDiv!: ElementRef<any>; 
  liked:boolean=false
  showImages:boolean=false
  shared:boolean=false
  previousState=false
  showMoreTimes=0
  showMoreVar=false

  @Output() callParent = new EventEmitter();

  currentMsgToParent: any;

  msgToParent() {
    this.currentMsgToParent = this.post
    this.callParent.emit(this.currentMsgToParent);
  }

  constructor(private cdr: ChangeDetectorRef, private ps: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  msg: number = 0;

  getMsgFromBaby($event: any) {this.msg = $event;}

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

  goToProfile(profile_id: any){
    this.router.navigate(['athlete', profile_id])
  }

  contentHeight(p:HTMLParagraphElement){
    if(this.showMoreVar==false){
      this.showMoreVar =(Math.ceil((p.scrollHeight/24))>7)
      // console.log((Math.ceil((p.scrollHeight/24))>7)+' from contentheight() '+this.post.id)
      return (Math.ceil((p.scrollHeight/24))>7)
    }  
    return true
  }

  showComment(postId:any){
    // console.log(postId)
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

  // like(lk:HTMLElement){
  //   if(this.liked==true)
  //    { 
  //      this.post.likes--
  //      this.liked=false
  //      lk.style.color='white'
  //    }
  //    else{
  //     this.post.likes++
  //     this.liked=true
  //     lk.style.color='chartreuse'
  //    }
  // }

  like_unlike(){
    this.ps.like_unlike(this.post.id).subscribe((res) => {
      this.post.like.likes = (res as any).likes
      this.post.like.isLiked = (res as any).value === 'Like' ? true : false
    })
  }

  // share(sh:HTMLElement){
  //   if(this.shared==true)
  //   { 
  //     this.post.share.shares--
  //     this.shared=false
  //     sh.style.color='white'
  //   }
  //   else{
  //    this.post.share.shares++
  //    this.shared=true
  //    sh.style.color='chartreuse'
  //   }   
  // }

  share(){
    this.ps.share(this.post.id).subscribe((res) => {
      this.post.share.isShared = true
      if((res as any).share) this.post.share.shares++
      alert((res as any).msg)
    })
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

  myProfile: Profile = MyDataService.myProfile

  clickOnOptionMenu(e:any){
    e.stopPropagation();
  }

  deletePost(){
    this.ps.deletePost(this.post.id).subscribe(res => {
      console.log(res)
    })
  }

}
