import { Component, OnInit, ViewChild, ElementRef, Sanitizer } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { timeout } from 'q';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/app/services/post.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { Post } from 'src/app/services/my-data.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stories=['r2.jpg','r3.jpg','r4.jpg','r5.jpg','user.png']

  posts: Post[] = []

  msg: any;

  getMsgFromBaby($event: any) {
    this.msg = $event;
    this.posts = this.posts.filter(p => p.id !== this.msg.id)
  }
  
  // posts: any = [
  //        {
  //          id:3,
  //         content:`post contentthis is post contentthis is post contentthis
  //         post contentthis is post contentthis is post contentthis
  //         post contentthis is post contentthis is post contentthis
  //         post contentthis is post contentthis is post contentthis
  //         post contentthis is post contentthis is post contentthis
  //         post contentthis is post contentthis is post contentthis
  //         post contentthis is post contentthis is post contentthis
  //         post contentthis is post contentthis is post contentthis
  //          is post content`,
  //         images:['../../../assets/sports.jpg','../../../assets/r2.jpg','../../../assets/r5.jpg',],
  //         likes:144,
  //         comments:{num:200,comments:[]},
  //         shares:15
  //         },
  //         {
  //            id:5,
  //          content:`post contentthis is post contentthis is post content this
  //           is post content`,
  //          images:['../../../assets/r5.jpg'],
  //          likes:144,
  //          comments:{num:200,comments:[]},
  //          shares:15
  //          }
  //       ]

  postContentModalRef!: NgbModalRef;

  @ViewChild("postContentModal")
  postContentModal!: ElementRef;
  postContent:any;
  imagesURLs: any[] = [];
  @ViewChild("createPost")
  createPost!: ElementRef<HTMLDivElement>;
  @ViewChild("images")
  images!: ElementRef<HTMLInputElement>;
  @ViewChild("sharingMyIdeasDiv")
  sharingMyIdeasDiv!: ElementRef<HTMLDivElement>;
  @ViewChild("mainDiv")
  mainDiv!: ElementRef<HTMLDivElement>; 
 
  constructor(private as: AuthService, private ps: PostService, private athleteService: AthleteService, private trainerService: TrainerService, private modalService: NgbModal, private sanitizer: DomSanitizer) {
    console.log(this.as.isRouteAuthenticated())
    this.getLastPosts()
   }

   closeResult = '';

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
  }

  page: number = 1
  last_page: boolean = false

  getLastPosts(){
    if(this.last_page)return
    this.ps.getLastPosts(this.page).subscribe(res => {
      if((res as any).next){
        this.page++
      }
      else {
        this.last_page = true
      }
      for(let r of (res as any).results){
        let poster = {id: 0, type: ''}
        let poster_data = {name: '', image: ''}
        if(r.profile){
          poster.id = r.profile
          poster.type = 'profile'
          this.athleteService.getProfileById(poster.id).subscribe(res => {
            poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
            poster_data.image = (res as any).image
          })
        } else if(r.trainer) {
          poster.id = r.trainer
          poster.type = 'trainer'
          this.trainerService.getTrainerById(poster.id).subscribe(res => {
            poster_data.name = (res as any).page_name
            poster_data.image = (res as any).image
          })
        }
        let like = {likes: 0, isLiked: false}
        this.ps.getLikes(r.id).subscribe((res) => {
          like.likes = (res as any).likes
          like.isLiked = (res as any).value === 'Like'? true : false
        })
        let share = {shares: 0, isShared: false}
        this.ps.getShares(r.id).subscribe((res) => {
          share.shares = (res as any).shares
          share.isShared = (res as any).isShared
        })
        let p: Post = {
          id: r.id,
          poster: poster,
          poster_data: poster_data,
          title: r.title,
          content: r.content,
          images: [r.image],
          date: r.created,
          like: like,
          share: share
        }
        this.posts.unshift(p)
      }
    }, 
    err => {
      alert('an error occured during get posts')
    })
  }

  goToTopScroll(){
    console.log(this.mainDiv.nativeElement.scrollTop)
    this.mainDiv.nativeElement.scrollTop=0
    //
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
  }

  postImage: any
  // setImage(file: any){
  // this.image = file;
  // }

  storeImages(){
    this.imagesURLs=[]
    let files=(<FileList>this.images.nativeElement.files)
    this.postImage = files[0]
    for (let i=0; i<files.length; i++){
      let url = URL.createObjectURL(files[i]);
      console.log(this.sanitizer.bypassSecurityTrustUrl(url))     
      this.imagesURLs.push(this.sanitizer.bypassSecurityTrustUrl(url))
    }  
  }
 
  publishPost(form: NgForm){
    let values = form.value
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    if(this.postImage)
      formData.append('image', this.postImage);
    this.ps.createPost(formData).subscribe(res => {
      let p = res as any
      let poster = {id: 0, type: ''}
      let poster_data = {name: '', image: ''}
      if(p.profile){
        poster.id = p.profile
        poster.type = 'profile'
        this.athleteService.getProfileById(poster.id).subscribe(res => {
          poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
          poster_data.image = (res as any).image
        })
      } else if(p.trainer) {
        poster.id = p.trainer
        poster.type = 'trainer'
        this.trainerService.getTrainerById(poster.id).subscribe(res => {
          poster_data.name = (res as any).page_name
          poster_data.image = (res as any).image
        })
      }
      let like = {likes: 0, isLiked: false}
      this.ps.getLikes(p.id).subscribe((res) => {
        like.likes = (res as any).likes
        like.isLiked = (res as any).value === 'Like'? true : false
      })
      let share = {shares: 0, isShared: false}
      this.ps.getShares(p.id).subscribe((res) => {
        share.shares = (res as any).shares
        share.isShared = (res as any).isShared
      })
      let post: Post = {
        id: p.id,
        poster: poster,
        poster_data: poster_data,
        title: p.title,
        content: p.content,
        images: [p.image],
        date: p.created,
        like: like,
        share: share
      }
      this.posts.unshift(post)
    })
  }



  publishPostWithAI(form: NgForm){
    let values = form.value
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    if(this.postImage)
      formData.append('image', this.postImage);
    this.ps.createPostWithAI(formData).subscribe(res => {
      console.log(res)
      if((res as any).rejected){
        alert((res as any).msg)
        return
      } 
      else {
        let p = (res as any).post
        let poster = {id: 0, type: ''}
        let poster_data = {name: '', image: ''}
        if(p.profile){
          poster.id = p.profile
          poster.type = 'profile'
          this.athleteService.getProfileById(poster.id).subscribe(res => {
            poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
            poster_data.image = (res as any).image
          })
        } else if(p.trainer) {
          poster.id = p.trainer
          poster.type = 'trainer'
          this.trainerService.getTrainerById(poster.id).subscribe(res => {
            poster_data.name = (res as any).page_name
            poster_data.image = (res as any).image
          })
        }
        let like = {likes: 0, isLiked: false}
        this.ps.getLikes(p.id).subscribe((res) => {
          like.likes = (res as any).likes
          like.isLiked = (res as any).value === 'Like'? true : false
        })
        let share = {shares: 0, isShared: false}
        this.ps.getShares(p.id).subscribe((res) => {
          share.shares = (res as any).shares
          share.isShared = (res as any).isShared
        })
        let post: Post = {
          id: p.id,
          poster: poster,
          poster_data: poster_data,
          title: p.title,
          content: p.content,
          images: [p.image],
          date: p.created,
          like: like,
          share: share
        }
        this.posts.unshift(post)
      }
    })
  }


getMorePosts(){
  this.getLastPosts()
}








  publishingCancle(){
    this.postContent=''
    this.imagesURLs=[]
    this.images.nativeElement.value=''
    this.createPost.nativeElement.style.display='none'
    this.sharingMyIdeasDiv.nativeElement.style.display='flex'
  }

  publish(){
    let imagesList=this.images.nativeElement.files
    console.log(imagesList)

    this.images.nativeElement.value=''
    this.createPost.nativeElement.style.display='none'
    this.postContent=''
    this.imagesURLs=[]
    this.sharingMyIdeasDiv.nativeElement.style.display='flex'
  }

  

  showCreationDiv(){
    this.createPost.nativeElement.style.display='flex'
    this.sharingMyIdeasDiv.nativeElement.style.display='none'
  }

  addPostContent(postContent:HTMLTextAreaElement){
    this.postContent=postContent.value
    this.postContentModalRef.close()
  }

  showPostContent(){
    this.postContentModalRef=this.modalService.open(this.postContentModal,{backdropClass:'lightBlueBackdrop'})
    let modalContents:NodeListOf<Element>=document.querySelectorAll(".modal-content")
    let modalContent=(<HTMLElement>modalContents[0])
    modalContent.style.marginTop="125px"
    modalContent.style.width="400px"
    modalContent.style.border='solid white'
    modalContent.style.borderRadius='20px'
    modalContent.style.background='linear-gradient(0, white,black, white)'
    let x=document.getElementsByTagName("ngb-modal-window");
    let y:HTMLDivElement=<HTMLDivElement>x[0].firstElementChild
    y.style.maxWidth="400px"
    y.style.animation="example"
    y.style.animationDuration=".5s"
  }

  close(){
    let storyShowSection=<HTMLDivElement>document.getElementsByClassName('storyShowSection').item(0)
    storyShowSection.style.display='none'
  }

  showStory(imgStory:HTMLElement){
    // let storyShowSection=<HTMLDivElement>document.getElementsByClassName('storyShowSection').item(0)
    // storyShowSection.style.display='block'
    // console.log(imgStory)
    // if(imgStory instanceof HTMLImageElement)
    // {
    //    let time=0
    //   let img=<HTMLImageElement>document.createElement('img')
    //   let src=imgStory.src;
    //   let imgChild=<HTMLImageElement>storyShowSection.firstElementChild;
    //   imgChild.src=src
    //   imgChild.style.display='initial';
    //   let timeline=<HTMLElement>storyShowSection.children.item(2)
    //   console.log(timeline.style.width)
    //   setInterval(()=>{
    //     time++
    //     if(time==100)
    //     {
    //       storyShowSection.style.display='none'
    //     }
    //     else{
    //       timeline.style.width=(time/100)*80 +'%'

    //     }
    //   } ,100)
      
    // }

  }

}
