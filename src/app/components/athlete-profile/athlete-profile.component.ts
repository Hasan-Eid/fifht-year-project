import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { MyDataService, Profile } from 'src/app/services/my-data.service';

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.css']
})
export class AthleteProfileComponent implements OnInit {

  myProfile = MyDataService.myProfile

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

  constructor(private route: ActivatedRoute, private router: Router, private athleteService: AthleteService, private friendshipService: FriendshipService) { }

  ngOnInit(): void {
    this.profile.id = this.route.snapshot.paramMap.get('id') as any
    this.athleteService.getProfileById(this.profile.id).subscribe(res => {
      this.profile = res as any
    })
    this.friends = FriendshipService.friends
    this.my_sent_invites = FriendshipService.my_sent_invites
    this.my_invites = FriendshipService.my_invites
  }
  
  sendInvite(slug:string){
    this.friendshipService.sendInvite(slug).subscribe(res => {
      if((res as any).status === 'send'){
        FriendshipService.my_sent_invites.push(this.profile)
        this.my_sent_invites.push(this.profile)
        sessionStorage.setItem('my_sent_invites', JSON.stringify(this.my_sent_invites))
      }
    })
  }

  removeInvite(slug:string){
    this.friendshipService.removeInvite(slug).subscribe(res => {
      if((res as any).status === 'remove'){
        FriendshipService.my_sent_invites = this.my_sent_invites = this.my_sent_invites.filter(e => e !== this.profile)
        sessionStorage.setItem('my_sent_invites', JSON.stringify(this.my_sent_invites))
      }
    })
  }
  
  removeFriend(slug:string){
    this.friendshipService.removeFriend(slug).subscribe(res => {
      if((res as any).remove){
        FriendshipService.friends = this.friends = this.friends.filter(e => e != this.profile)
        sessionStorage.setItem('friends', JSON.stringify(this.friends))
      }
    })
  }

  accept(slug: string){
    this.friendshipService.accept(slug).subscribe(res => {
      if((res as any).status === 'accepted'){
        FriendshipService.my_invites = this.my_invites = this.my_invites.filter(e => e !== this.profile)
        FriendshipService.friends.push(this.profile)
        this.friends.push(this.profile)
        sessionStorage.setItem('friends', JSON.stringify(this.friends))
        sessionStorage.setItem('my_invites', JSON.stringify(this.my_invites))
      }
    })
  }

  reject(slug: string){
    this.friendshipService.reject(slug).subscribe(res => {
      if((res as any).reject){
        FriendshipService.my_invites = this.my_invites = this.my_invites.filter(e => e !== this.profile)
        sessionStorage.setItem('my_invites', JSON.stringify(this.my_invites))
      }
    })
  }

}
