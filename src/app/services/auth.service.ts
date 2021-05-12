import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
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
  constructor(private httpClient:HttpClient) { }

  
  login(email: any, password: any) {
   
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'auth/login/',{email: email,password: password})
          
  }
  signUp(username:any,email: any, password: any) {
   
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'auth/register/',{username:username,email: email,password: password})
          
  }
  logout(refresh:any){
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'auth/logout/',{refresh:refresh})
  }
  

}
