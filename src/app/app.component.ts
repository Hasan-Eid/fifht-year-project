import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FriendshipService } from './services/friendship.service';
import { MyDataService } from './services/my-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  is_auth: boolean = false

  constructor(private router:Router, public as: AuthService){
    // this.go()
    
    // if(sessionStorage.getItem('friends')){
    //   FriendshipService.friends = JSON.parse(sessionStorage.getItem('friends') as string)
    // }
    // if(sessionStorage.getItem('my_sent_invites')){
    //   FriendshipService.my_sent_invites = JSON.parse(sessionStorage.getItem('my_sent_invites') as string)
    // }
    // if(sessionStorage.getItem('my_invites')){
    //   FriendshipService.my_sent_invites = JSON.parse(sessionStorage.getItem('my_invites') as string)
    // }
  }

  ngOnInit(){
    this.as.getUserFromSession()
    this.is_auth = this.as.isRouteAuthenticated()
    if(!this.as.isRouteAuthenticated()) this.router.navigate(['login'])
    else this.router.navigate(['/'])
  }


  title = 'app';
  go(){
  this.router.navigate(['login'])
  console.log('go')
  }
  
}

