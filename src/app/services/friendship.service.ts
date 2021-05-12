import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private httpClient:HttpClient) { }
  
  reject(slug:string) {
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/my-invites/reject/',{slug:slug})
          
  }
  accept(slug:string) {
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/my-invites/acctept/',{slug:slug})
          
  }
  getFriends() {
    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/friends/')
          
  }
  myInvites() {
    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/my-invites/')
          
  }
 removeFriend(slug:string) {
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/remove-friend/',{slug:slug})
          
  }
  sendInvite(slug:string) {
    return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/send-invite/',{slug:slug})
          
  }
  toInvite() {
    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + '/friendship/to-invite/')
          
  }
  
  
  
}
