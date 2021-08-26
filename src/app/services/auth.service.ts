import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyDataService, Profile, User } from './my-data.service';
import { AthleteService } from './athlete.service';
import { Router } from '@angular/router';
import { FriendshipService } from './friendship.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  is_auth: boolean = false;

  authChange: Subject<boolean> = new Subject<boolean>();


  API_URL = ''

  public isAuthenticated: boolean = false
 
  refresh:string=''
  myProfile={
    id:'1',
    slug:'1',
    first_name:'hasan',
    last_name:'eid',
    career:'this is career',
    hobbies:"this is hobbies",
    image:'../../../assets/r3.jpg'
  }

  constructor(private httpClient:HttpClient, private router: Router, private data: MyDataService, private athleteService: AthleteService, private friendshipService: FriendshipService) {
    this.API_URL = data.API_URL
    this.authChange.subscribe((value) => {
      this.is_auth = value
    });
  }

  chagneAuth() {
    this.authChange.next(!this.is_auth);
  }

  isRouteAuthenticated(){
    return this.isAuthenticated
  }


  refreshToken(){
    let body = {refresh: MyDataService.user.tokens.refresh}
    return this.httpClient.post(this.API_URL + 'auth/token/refresh/', body)
  }


  async getUserFromSession(){
    let user_json = sessionStorage.getItem('user') as string
    if(user_json){
      this.isAuthenticated = true
      let user = JSON.parse(user_json)
      MyDataService.user = user
      await this.refreshToken().subscribe((res) => {
        user.tokens.access = (res as any).access
        MyDataService.user = user
      }, 
      (err) => {
        alert(err.error.detail)
        this.router.navigate(['/login'])
      })
      await this.athleteService.getProfile(MyDataService.user.username).subscribe((response) => {
        MyDataService.myProfile = response as Profile
      }, 
      (err) => {
        console.log(err)
      })
    }
  }

  
  login(email: String, password: String) {
    return this.httpClient.post(this.API_URL + 'auth/login/', 
                                {email: email, password: password})
          .subscribe((response)=>{
            this.chagneAuth()
            this.isAuthenticated = true
            MyDataService.user = response as User
            sessionStorage.setItem('user', JSON.stringify(MyDataService.user))
            this.athleteService.getProfile(MyDataService.user.username).subscribe((response) => {
              MyDataService.myProfile = response as Profile
              this.router.navigate(['/']);
            })
          }, 
          (err) => {
            alert(err.error.detail)
          })
  }


  signUp(username: String, email: String, password: String) {
    return this.httpClient.post(this.API_URL + 'auth/register/', 
                                {username: username, email: email, password: password})        
  }


  logout(){
    this.isAuthenticated = false
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'auth/logout/', 
                                {refresh: MyDataService.user.tokens.refresh}, 
                                {headers: headers})
  }
  

}
