import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  
  login(email: any, password: any) {
    // return fetch('https://peaceful-savannah-28414.herokuapp.com/' + 'auth/login', {
    //         method: 'post',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //           email: email,
    //           password: password
    //         })
    //       })
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'auth/login/',
                                {email: email,password: password})
          
  }
}
