import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyDataService, Profile } from './my-data.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  API_URL = ''

  static friends: Profile[] = []
  static my_sent_invites: Profile[] = []
  static my_invites: Profile[] = []

  constructor(private httpClient:HttpClient, data: MyDataService) {
    this.API_URL = data.API_URL
   }
  
  reject(slug: String) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'friendship/my-invites/reject/',
                                {slug:slug}, 
                                {headers: headers}
    )
  }
  
  accept(slug: String) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'friendship/my-invites/acctept/', 
                                {slug:slug}, 
                                {headers: headers})    
  }

  getFriends() {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + 'friendship/friends/', 
                                {headers: headers})   
  }

  myInvites() {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + 'friendship/my-invites/', 
                                {headers: headers})       
  }

  mySentInvites() {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + 'friendship/my-sent-invites/', 
                                {headers: headers})       
  }

 removeFriend(slug:string) {
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'friendship/remove-friend/', 
                                {slug:slug}, 
                                {headers: headers})
  }

  sendInvite(slug:string) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'friendship/send-invite/', 
                                {slug:slug}, 
                                {headers: headers})        
  }

  removeInvite(slug:string) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.post(this.API_URL + 'friendship/remove-invite/', 
                                {slug:slug}, 
                                {headers: headers})        
  }

  toInvite() {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + '/friendship/to-invite/', 
                                {headers: headers})
          
  }

  getFriendships(){
    this.getFriendsProfiles()
    this.getMySentInvites()
    this.getMyInvites()
  }


  getFriendsProfiles(){
    FriendshipService.friends = []
    this.getFriends().subscribe(res => {
      (res as any).friends.forEach((e: any) => {
        let p: Profile = {
          id: e.id,
          first_name: e.first_name,
          last_name: e.last_name,
          hobbies: e.hobbies,
          carear: e.carear,
          image: e.image,
          slug: e.slug
        }
        FriendshipService.friends.push(p)
      });
      sessionStorage.setItem('friends', JSON.stringify(FriendshipService.friends))
    })
  }

  getMySentInvites(){
    this.mySentInvites().subscribe(res => {
      (res as any).invites.forEach((e: any) => {
        let p: Profile = {
          id: e.id,
          first_name: e.first_name,
          last_name: e.last_name,
          hobbies: e.hobbies,
          carear: e.carear,
          image: e.image,
          slug: e.slug
        }
        FriendshipService.my_sent_invites.push(p)
      });
      sessionStorage.setItem('my_sent_invites', JSON.stringify(FriendshipService.my_sent_invites))
    })
  }

  getMyInvites(){
    this.myInvites().subscribe(res => {
      (res as any).invites.forEach((e: any) => {
        let p: Profile = {
          id: e.id,
          first_name: e.first_name,
          last_name: e.last_name,
          hobbies: e.hobbies,
          carear: e.carear,
          image: e.image,
          slug: e.slug
        }
        FriendshipService.my_invites.push(p)
      });
      sessionStorage.setItem('my_invites', JSON.stringify(FriendshipService.my_invites))
    })
  }
  
}
