import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AthleteService } from 'src/app/services/athlete.service';
import { Team } from 'src/app/services/my-data.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  my_teams: Team[] = []
  teams_to_join: Team[] = []

  constructor(private teamService: TeamService, private athleteService: AthleteService, private router: Router, private modalService: NgbModal, private sanitizer: DomSanitizer) { 
    this.getMyTeams()
    // this.getTeamsToJoin()
  }

  ngOnInit(): void {

  }

  goToTeam(team_id: any){
    this.router.navigate(['team', team_id])
  }
  

  getMyTeams(){
    this.teamService.getMyTeams().subscribe(res => {
      (res as any).results.forEach((e: any) => {
        let admin_data = {name: '', image: ''}
        this.athleteService.getProfileById(e.admin).subscribe(res => {
          admin_data.name = (res as any).first_name + ' ' + (res as any).last_name
          admin_data.image = (res as any).image
        })
        let team: Team = {
          id: e.id, 
          admin_id: e.admin, 
          admin_data: admin_data, 
          name: e.name, 
          description: e.description, 
          image: e.image, 
          date: e.created
        }
        this.my_teams.push(team)
      });
    })
  }

  getTeamsToJoin(){
    this.teamService.getTeamsToJoin().subscribe(res => {
      (res as any).teams.forEach((e: any) => {
        let admin_data = {name: '', image: ''}
        this.athleteService.getProfileById(e.admin).subscribe(res => {
          admin_data.name = (res as any).first_name + ' ' + (res as any).last_name
          admin_data.image = (res as any).image
        })
        let team: Team = {
          id: e.id, 
          admin_id: e.admin, 
          admin_data: admin_data, 
          name: e.name, 
          description: e.description, 
          image: e.image, 
          date: e.created
        }
        this.teams_to_join.push(team)
      });
    })
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


  @ViewChild("image")
  imageElement!: ElementRef<HTMLInputElement>;
  teamImage: any
  imageUrl: any

  storeImage(){
    let files=(<FileList>this.imageElement.nativeElement.files)
    this.teamImage = files[0]
    let url = URL.createObjectURL(files[0]);     
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(url)
  }


  createTeam(form: NgForm){
    let values = form.value
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    if(this.teamImage)
      formData.append('image', this.teamImage);
    this.teamService.createTeam(formData).subscribe(res => {
      let t = res as any
      let admin_id = 0
      let admin_data = {name: '', image: ''}
      admin_id = t.admin
      this.athleteService.getProfileById(admin_id).subscribe(res => {
        admin_data.name = (res as any).first_name + ' ' + (res as any).last_name
        admin_data.image = (res as any).image
      })
      let team: Team = {
        id: t.id,
        admin_id: admin_id,
        admin_data: admin_data,
        name: t.title,
        description: t.description,
        image: t.image,
        date: t.created,
      }
      this.my_teams.unshift(team)
    })
  }


}
