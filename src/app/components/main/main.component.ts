import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ApolloServiceService } from 'src/app/services/apollo-service.service';
import { FriendshipService } from 'src/app/services/friendship.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
   friendsDiv: any;
  persons:any=[]
 notifications:any[]=[
   {
   image:"../../../assets/r1.jpg",
   content:"mohammad and 5 other like your post",
   type :'normal',
   slug:null
  },
   {
    image:"../../../assets/r2.jpg",
    content:"Hasan send friendship request ",
    type :'friendshipRequest',
    slug:"1"
   },
   {
    image:"../../../assets/r3.jpg",
    content:"Ibrahim send friendship request",
    type :'friendshipRequest',
    slug:"2"
   },
   {
    image:"../../../assets/r4.jpg",
    content:"Hasan and 8 other like your post",
    type :'normal',
    slug:null

   },
   {
    image:"../../../assets/r5.jpg",
    content:"Hasan and 8 other like your post",
    type :'normal',
    slug:null

   },
   {
    image:"../../../assets/r4.jpg",
    content:"Hasan and 8 other like your post Ibrahim send friendship request",
    type :'normal',
    slug:null

   },
   {
    image:"../../../assets/r3.jpg",
    content:"Ibrahim send friendship request",
    type :'friendshipRequest',
    slug:"3"
   },
   {
    image:"../../../assets/r2.jpg",
    content:"Hasan and 8 other like your post Ibrahim send friendship request",
    type :'friendshipRequest',
    slug:"3"
   }
  ]

  @ViewChild("notificationsDiv")
  notificationsDiv!: ElementRef<HTMLDivElement>; 

  constructor( private as:ApolloServiceService,private fshipService:FriendshipService) { }

  ngOnInit(): void { 
   let body=document.getElementsByTagName('body')[0];
   body.style.backgroundImage="url('../../../assets/sports.jpg')";
    body.style.backgroundAttachment="fixed";
    body.style.backgroundSize= 'cover';
    body.style.filter='drop-shadow(2px 5px 8px black)'
    body.style.overflow="auto"


    // this.as.getFriends().valueChanges.subscribe(({ data }) => {
    //    this.persons= data.friendship.friends
    //   console.log(this.persons)
      
    // })
    //  this.friendsDiv = <HTMLDivElement>document.getElementById('friendsDiv');
    //  this.friendsDiv.style.display='none'
    // document.onclick = (e)=>{
    //      if(this.friendsDiv.style.display!='none')
    //              if(!(<HTMLElement>e.target).classList.contains('friendsHide') ){
    //                   // console.log((<HTMLElement>e.target).classList.contains('friendsHide'))
    //                   this.friendsDiv.style.display ='none';
    //                }
    //    };

    document.onclick = (e)=>{
           if(this.notificationsDiv.nativeElement.style.display!='none')
                   if(!(<HTMLElement>e.target).classList.contains('notificationHide') ){
                        this.notificationsDiv.nativeElement.style.display ='none';
                     }
         };

  }

  showNotifications(e:any){
    e.stopPropagation();
    this.notificationsDiv.nativeElement.style.display='block'
  }

  reject(slug:string){
    this.fshipService.reject(slug).subscribe((res)=>{
      console.log(res)
    })
  }
  accept(slug:string){
   console.log(slug)
   this.fshipService.accept(slug).subscribe((res)=>{
     console.log(res)
   })
  }
  searchFun(search:NgModel,e:any){
    e.stopPropagation();
    console.log(this.friendsDiv );
    (this.friendsDiv.style.display =='none')?this.friendsDiv.style.display ='inline':{};
  }


}
