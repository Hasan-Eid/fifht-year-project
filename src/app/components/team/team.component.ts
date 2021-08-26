import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AthleteService } from 'src/app/services/athlete.service';
import { MyDataService, Profile, Team } from 'src/app/services/my-data.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team = {
    id: 0,
    admin_id: 0,
    admin_data: {name: '', image: ''},
    name: '',
    description: '',
    image: '',
    date: new Date(),
  }

  is_admin !: boolean
  is_team_member !: boolean

  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService, private athleteService: AthleteService, private modalService: NgbModal, private sanitizer: DomSanitizer) { 
    this.getTeamById()
  }

  ngOnInit(): void {
    
  }

  closeResult = '';

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getTeamById(){
    this.team.id = this.route.snapshot.paramMap.get('id') as any
    this.teamService.getTeamById(this.team.id).subscribe(res => {
      let admin_data = {name: '', image: ''}
      let e = (res as any)
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
      this.is_admin = this.team.admin_id === MyDataService.myProfile.id
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
      members.sort((a: Profile, b: Profile) => {
        if(a.first_name < b.first_name) return -1
        else if (a.first_name > b.first_name) return 1
        else return 0
      })
      if(members.includes(MyDataService.myProfile)){
        this.is_team_member = true
      } else {
        this.is_team_member = false
      }
    })
  }

  deleteTeam(){
    this.teamService.deleteTeam(this.team.id).subscribe(res => {
      this.router.navigate(['teams'])
    }, 
    err => {
      console.log(err)
    })
  }
}
