import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { MyDataService, Profile, Team } from 'src/app/services/my-data.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  team: Team = {
    id: 0,
    admin_id: 0,
    admin_data: {name: '', image: ''},
    name: '',
    description: '',
    image: '',
    date: new Date()
  }

  members : Profile[] = []
  friends : Profile[] = []

  is_admin: boolean = false

  constructor(private teamService: TeamService, private friendshipService: FriendshipService, private athleteService: AthleteService, private router: Router, private route: ActivatedRoute) {
    this.getTeamById()
    this.getTeamMembers()
    friendshipService.getFriendsProfiles()
  }

  ngOnInit(): void {
    this.friends = FriendshipService.friends
  }

  getTeamById(){
    this.team.id = this.route.snapshot.paramMap.get('id') as any
    this.teamService.getTeamById(this.team.id).subscribe(res => {
      let admin_data = {name: '', image: ''}
      let e = (res as any)
      this.team.admin_id = e.admin
      this.is_admin = e.admin === MyDataService.myProfile.id
      this.athleteService.getProfileById(e.admin).subscribe(res => {
        admin_data.name = (res as any).first_name + ' ' + (res as any).last_name
        admin_data.image = (res as any).image
      })
      this.team = {
        id: e.id, 
        admin_id: e.admin, 
        admin_data: admin_data, 
        name: e.name, 
        description: e.description, 
        image: e.image, 
        date: e.created
      }
    })
  }

  getTeamMembers(){
    this.teamService.getTeamMembers(this.team.id).subscribe(res => {
      let members: Profile[] = []
      for(let m of (res as any).members){
        let profile: Profile = {
          id: m.id, 
          first_name: m.first_name,
          last_name: m.last_name,
          hobbies: m.hobbies,
          carear: m.carear,
          image: m.image,
          slug: m.slug
        }
        members.push(profile)
      }
      this.members = members.sort((a: Profile, b: Profile) => {
        if(a.first_name < b.first_name) return -1
        else if (a.first_name > b.first_name) return 1
        else return 0
      })
    })
  }

  goToProfile(profile_id: any){
    this.router.navigate(['athlete', profile_id])
  }

  addTeamMember(profile_id: any){
    this.teamService.addTeamMember(profile_id, this.team.id).subscribe(res => {
      if((res as any).added){
        this.members.unshift(this.friends.filter(f => f.id === profile_id)[0])
      }
    })
  }

  removeTeamMember(profile_id: any){
    this.teamService.removeTeamMember(profile_id, this.team.id).subscribe(res => {
      if((res as any).remove){
        this.members = this.members.filter(m => m.id !== profile_id)
      }
    })
  }

  isTeamMember(id: any){
    return this.members.filter(m => m.id === id).length === 1
  }

}
