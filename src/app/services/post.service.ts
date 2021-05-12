import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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
     },{
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
   photos=['../../../assets/r2.jpg','../../../assets/r1.jpg','../../../assets/r3.jpg','../../../assets/r5.jpg',
   '../../../assets/r5.jpg','../../../assets/r3.jpg','../../../assets/r4.jpg',
   '../../../assets/r5.jpg','../../../assets/r5.jpg','../../../assets/r4.jpg',
    '../../../assets/r2.jpg','../../../assets/r1.jpg','../../../assets/r4.jpg']

  constructor(private httpClient:HttpClient) { }

  createPost(profile:any,trainer:any,title:any,content:any) {
   
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'post/',{profile:profile,trainer:trainer,title:title,content:content})
          
  }
  addComment(profile:any,trainer:any,post:any,body:any,parent:any) {
   
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'post/comment',{profile:profile,trainer:trainer,post:post,body:body,parent:parent})
          
  }

  getTrainerPosts(slug:any){

    return this.posts

  }
  getTrainerPhotos(slug:any){

    return this.photos

  }
  getTrainerVideos(slug:any){

    return this.posts

  }
  getTrainerWorkouts(slug:any){

    return this.posts

  }
}
