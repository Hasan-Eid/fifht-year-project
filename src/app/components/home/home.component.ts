import { Component, OnInit, ViewChild, ElementRef, Sanitizer } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { timeout } from 'q';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stories=['r2.jpg','r3.jpg','r4.jpg','r5.jpg','user.png']
  posts=[
         {
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
          },
          {
             id:5,
           content:`post contentthis is post contentthis is post content this
            is post content`,
           images:['../../../assets/r5.jpg'],
           likes:144,
           comments:{num:200,comments:[]},
           shares:15
           }

        ]
  postContentModalRef!: NgbModalRef;

  @ViewChild("postContentModal")
  postContentModal!: ElementRef;
  postContent:any;
  imagesURLs: any[]=[];
  @ViewChild("createPost")
  createPost!: ElementRef<HTMLDivElement>;
  @ViewChild("images")
  images!: ElementRef<HTMLInputElement>;
  @ViewChild("sharingMyIdeasDiv")
  sharingMyIdeasDiv!: ElementRef<HTMLDivElement>;
  @ViewChild("mainDiv")
  mainDiv!: ElementRef<HTMLDivElement>; 
 
  constructor(private modalService: NgbModal,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   
  }
  goToTopScroll(){
    console.log(this.mainDiv.nativeElement.scrollTop)
    this.mainDiv.nativeElement.scrollTop=0
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
  storeImages(){
    this.imagesURLs=[]
    let files=(<FileList>this.images.nativeElement.files)
    for (let i=0 ; i<files.length;i++)
     {
      let url = URL.createObjectURL(files[i]);
      console.log(this.sanitizer.bypassSecurityTrustUrl(url))
       
      this.imagesURLs.push(this.sanitizer.bypassSecurityTrustUrl(url))
      
     }  
    
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
