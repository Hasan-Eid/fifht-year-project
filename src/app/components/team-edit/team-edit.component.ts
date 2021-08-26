import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApolloServiceService } from 'src/app/services/apollo-service.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { MyDataService, Profile, Team } from 'src/app/services/my-data.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  myProfile: Profile = MyDataService.myProfile

  @Input() team !: Team

  @Output() chooseProfile = new EventEmitter<string>();
  
  @ViewChild("img")
  img!: ElementRef<HTMLImageElement>;

  constructor( private apolloService: ApolloServiceService,private athleteService:AthleteService, private teamService: TeamService, private router: Router) { }
  
  ngOnInit(): void {
  }

  toMy(){
    this.chooseProfile.emit('my')
  }
  
  image: any
  setImage(file: any){
  this.image = file;
  }

  fileUpload(images:any){
    let image=images.files[0];
    this.image = image
    let url = URL.createObjectURL(image);
    this.img.nativeElement.src=url
  }  
 
  editTeam(form: NgForm){
    let values = form.value
    const formData = new FormData();
    formData.append('name', values.name);
    if(values.description)
      formData.append('description', values.description);
    if(this.image)
      formData.append('image', this.image);
    this.teamService.editTeam(this.team.id, formData).subscribe((res) => {
      this.router.navigate(['team', this.team.id])
    }, 
    (err) => {
      console.log(err)
    })
  }


}
