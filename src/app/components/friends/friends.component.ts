import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendshipService } from 'src/app/services/friendship.service';
import { Profile } from 'src/app/services/my-data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: Profile[] = []
  my_sent_invites: Profile[] = []
  my_invites: Profile[] = []

  profile: Profile = {
    id: 0,
    first_name: '',
    last_name: '',
    hobbies: '',
    carear: '',
    image: '',
    slug: ''
  };

  constructor(private router: Router, private friendshipService: FriendshipService) { 
    friendshipService.getFriendships()
  }

  ngOnInit(): void {
    this.friends = FriendshipService.friends
    this.my_sent_invites = FriendshipService.my_sent_invites
    this.my_invites = FriendshipService.my_invites
  }

  goToProfile(profile_id: any){
    this.router.navigate(['athlete', profile_id])
  }

  sendInvite(slug:string, profile: Profile){
    this.friendshipService.sendInvite(slug).subscribe(res => {
      if((res as any).status === 'send'){
        FriendshipService.my_sent_invites.push(profile)
        this.my_sent_invites = FriendshipService.my_sent_invites
        sessionStorage.setItem('my_sent_invites', JSON.stringify(this.my_sent_invites))
      }
    })
  }

  removeInvite(slug:string, profile: Profile){
    this.friendshipService.removeInvite(slug).subscribe(res => {
      if((res as any).status === 'remove'){
        FriendshipService.my_sent_invites = this.my_sent_invites = this.my_sent_invites.filter(e => e !== profile)
        sessionStorage.setItem('my_sent_invites', JSON.stringify(this.my_sent_invites))
      }
    })
  }
  
  removeFriend(slug:string, profile: Profile){
    this.friendshipService.removeFriend(slug).subscribe(res => {
      if((res as any).remove){
        FriendshipService.friends = this.friends = this.friends.filter(e => e != profile)
        sessionStorage.setItem('friends', JSON.stringify(this.friends))
      }
    })
  }

  accept(slug: string, profile: Profile){
    this.friendshipService.accept(slug).subscribe(res => {
      if((res as any).status === 'accepted'){
        FriendshipService.my_invites = this.my_invites = this.my_invites.filter(e => e !== profile)
        FriendshipService.friends.push(profile)
        this.friends = FriendshipService.friends
        sessionStorage.setItem('friends', JSON.stringify(this.friends))
        sessionStorage.setItem('my_invites', JSON.stringify(this.my_invites))
      }
    })
  }

  reject(slug: string, profile: Profile){
    this.friendshipService.reject(slug).subscribe(res => {
      if((res as any).reject){
        FriendshipService.my_invites = this.my_invites = this.my_invites.filter(e => e !== profile)
        sessionStorage.setItem('my_invites', JSON.stringify(this.my_invites))
      }
    })
  }

}
