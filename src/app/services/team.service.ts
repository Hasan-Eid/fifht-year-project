import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyDataService } from './my-data.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

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

  constructor(private httpClient:HttpClient, private data: MyDataService) { 
    this.API_URL = data.API_URL
  }

   getMyTeams(){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `team/my_teams`, {headers: headers})
   }
   
   getTeamsToJoin(){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `team/teams2join`, {headers: headers})
   }
  

  getTeamById(id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `team/retrieve/${id}`, {headers: headers})
  }


  createTeam(body: FormData){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'team/', 
                          body,
                          {headers: headers})
  }


  editTeam(id: any, formData: FormData) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.patch(this.API_URL+'team/'+id, 
                                formData, 
                                {headers: headers})
  }


  deleteTeam(team_id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.delete(this.API_URL+'team/'+team_id, 
                                {headers: headers})
  }


  getTeamMembers(team_id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    let response = this.httpClient.get(this.API_URL + `team/${team_id}/team_members`, {headers: headers})
    return response
  }


  addTeamMember(profile_id: any, team_id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    let body = {profile_id, team_id}
    let response = this.httpClient.post(this.API_URL + `team/add_team_member`, body, {headers: headers})
    return response
  }


  removeTeamMember(profile_id: any, team_id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    let body = {profile_id, team_id}
    let response = this.httpClient.post(this.API_URL + `team/remove_from_team`, body, {headers: headers})
    return response
  }


  getTeamPosts(team_id: any, page: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    let response = this.httpClient.get(this.API_URL + `team/${team_id}/posts?page=${page}`, {headers: headers})
    return response
  }


  createPost(body: FormData) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'team/post', 
                                body, 
                                {headers: headers})        
  }

  getLikes(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `team/post/like/${post_id}`, {headers: headers})
  }

  like_unlike(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.put(this.API_URL + `team/post/like/${post_id}`, {}, {headers: headers})
  }

  getShares(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `team/post/share/${post_id}`, {headers: headers})
  }

  share(post_id: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + `team/post/share/${post_id}`, {}, {headers: headers})
  }

  getComments(post_id: number){
    return this.httpClient.get(this.API_URL + `team/post/comments/${post_id}`)
  }

  addComment(profile: any, post: any, commentBody: any, parent: any) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    let body = {profile: profile, trainer: null, post: post, body: commentBody, parent: parent}
    return this.httpClient.post(this.API_URL + 'team/post/comment', 
                                body, 
                                {headers: headers})
  }

  deletePost(id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.delete(this.API_URL + `team/post/${id}`, 
                                {headers: headers})
  }


  getTeamExercises(team_id: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `team/${team_id}/exercise/list`, 
                                  {headers: headers})
  }


  getTeamWorkouts(team_id: any, page: number){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    let response = this.httpClient.get(this.API_URL + `team/${team_id}/workouts?page=${page}`, {headers: headers})
    return response
  }

  
  getTeamWorkout(id: string){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + `team/workout/retrieve/${id}`, 
                                  {headers: headers})
  }
  
  deleteTeamWorkout(id:any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.delete(this.API_URL + `team/workout/${id}`, 
                                    {headers: headers})
  }

  AdminDeleteTeamWorkout(id:any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.delete(this.API_URL + `team/workout/delete/${id}`, 
                                    {headers: headers})
  }
  
  createTeamExercise(exercise:any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + `team/exercise/create/`, 
                                    exercise, 
                                    {headers: headers})
  }
  
  createTeamWorkout(workout: any){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + `team/workout/create`, 
                                    workout, 
                                    {headers: headers})
  }

}
