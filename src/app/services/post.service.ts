import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyDataService } from './my-data.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  API_URL = ''

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

  constructor(private httpClient:HttpClient, data: MyDataService) {
    this.API_URL = data.API_URL
   }


  getLastPosts(page: number){
    let response = this.httpClient.get(this.API_URL + `post/posts?page=${page}`)
    return response
  }

  getPostById(id: any){
    let response = this.httpClient.get(this.API_URL + `post/posts/${id}`)
    return response
  }

  getAthletePosts(athlete_id: any, page: number){
    let response = this.httpClient.get(this.API_URL + `post/athlete_posts/${athlete_id}?page=${page}`)
    return response
  }

  createPost(body: FormData) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'post/', 
                                body, 
                                {headers: headers})        
  }

  createPostWithAI(body: FormData) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'post/create', 
                                body, 
                                {headers: headers})        
  }

  getLikes(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `post/like/${post_id}`, {headers: headers})
  }

  like_unlike(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.put(this.API_URL + `post/like/${post_id}`, {}, {headers: headers})
  }

  getShares(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `post/share/${post_id}`, {headers: headers})
  }

  share(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + `post/share/${post_id}`, {}, {headers: headers})
  }

  getComments(post_id: number){
    return this.httpClient.get(this.API_URL + `post/comments/${post_id}`)
  }

  addComment(profile: any, post: any, commentBody: any, parent: any) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    let body = {profile: profile, trainer: null, post: post, body: commentBody, parent: parent}
    return this.httpClient.post(this.API_URL + 'post/comment', 
                                body, 
                                {headers: headers})
  }

  deletePost(id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.delete(this.API_URL + `post/${id}`, 
                                {headers: headers})
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
