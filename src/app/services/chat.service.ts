import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    
    messages= [
          
      {
        id:2,
        content: "HTML symbol, character and entity codes, ASCII, CSS and HEX values for Multiplication Sign, plus a panoply of others.",
        sender: {
          image:'../../../assets/r1.jpg',
          name:'Hasan Eid',
          slug:'1'
        },
        date: "2020-07-05T08:23:02"
      },{
        id:3,
        content: "agg",
        sender: {
          image:'../../../assets/r1.jpg',
          name:'Hasan Eid',
          slug:'3'
        },
        date: "2020-06-05T08:23:02"
      },
      {
        id:4,
        content: "Is a JavaScript runtime built on Chrome`s V8 JavaScript engine",
        sender: {
          image:'../../../assets/r2.jpg',
          name:'Hasan Eid',
          slug:'1'
        },
        date: "2020-08-05T08:23:07"
      },
      {
        id:5,
        content: "hello hasan",
        sender: {
          image:'../../../assets/r2.jpg',
          name:'Hasan Eid',
          slug:'22'
        },
        date: "2020-08-05T08:23:07"
      },
      {
        id:6,
        content: "The file will be downloaded from secure FileHorse servers",
        sender: {
          image:'../../../assets/r2.jpg',
          name:'Hasan Eid',
          slug:'22'
        },
        date: "2020-08-05T08:23:07"
      },
      {
        id:7,
        content: "hello hasan",
        sender: {
          image:'../../../assets/r2.jpg',
          name:'Hasan Eid',
          slug:'22'
        },
        date: "2020-08-05T08:23:07"
      },
      {
        id:8,
        content: "The file will be downloaded from secure FileHorse servers",
        sender: {
          image:'../../../assets/r2.jpg',
          name:'Hasan Eid',
          slug:'1'
        },
        date: "2020-08-05T08:23:07"
      }
    ]
  
    friends=[{
      image:'../../../assets/r2.jpg',
      name:'Ibrahim Eid',
      slug:'22'
    },{
      image:'../../../assets/r1.jpg',
      name:'Hasan Eid',
      slug:'21'
    },{
      image:'../../../assets/r4.jpg',
      name:'Hasan Eid',
      slug:'20'
    },{
      image:'../../../assets/r5.jpg',
      name:'Mohammad Eid',
      slug:'25'
    }]
    teams=[{
      image:'../../../assets/r2.jpg',
      name:'team 1',
      id:'22'
    },{
      image:'../../../assets/r1.jpg',
      name:'team 7',
      id:'21'
    },{
      image:'../../../assets/r4.jpg',
      name:'team 8',
      id:'20'
    },{
      image:'../../../assets/r5.jpg',
      name:'team 4',
      id:'25'
    }]
  constructor(private httpClient:HttpClient) {
   }

addMessage(msg:any){

}
deleteMessage(id:any){

   }


getFriends(slug:any){
    // return     this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + `/${slug}/`)
    return this.friends
 }
getTeams(slug:any){
  // return     this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + `/${slug}/`)
  return this.teams
}
getPersonalMessages(slug:string){
// return     this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + `chat/personal_messages/${slug}/`)
   return this.messages
}
getTeamMessages(team_id:any){
  // return     this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + `chat/team_messages/${team_id}/`)
     return this.messages
  }
  
getCurrentUser(){
   return this.httpClient.get<any>("/currentUser")
  }
  
    
}
