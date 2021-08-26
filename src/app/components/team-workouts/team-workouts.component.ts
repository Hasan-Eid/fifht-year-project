import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AthleteService } from 'src/app/services/athlete.service';
import { AuthService } from 'src/app/services/auth.service';
import { Exercise, MyDataService, Team, Workout } from 'src/app/services/my-data.service';
import { TeamService } from 'src/app/services/team.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-team-workouts',
  templateUrl: './team-workouts.component.html',
  styleUrls: ['./team-workouts.component.css']
})
export class TeamWorkoutsComponent implements OnInit {

  profile_id = MyDataService.myProfile.id

  is_admin !: boolean

  team: Team = {
    id: 0,
    admin_id: 0,
    admin_data: {name: '', image: ''},
    name: '',
    description: '',
    image: '',
    date: new Date(),
  }

  @ViewChild("createWorkoutModal")
  createWorkoutModal!: ElementRef;
  createWorkoutModalRef!: NgbModalRef;

  team_id: any

  workouts: Workout[] = []
  exercises: Exercise[] = []

  constructor(private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private as:AuthService, private athleteService: AthleteService, private teamService: TeamService) { }

  ngOnInit(): void {
    let team_id = this.route.snapshot.paramMap.get('id') as any
    this.team_id = team_id
    this.getTeamById()
    this.getTeamExercises(team_id)
    this.getTeamWorkouts(team_id)
  }

  getTeamById(){
    this.team.id = this.route.snapshot.paramMap.get('id') as any
    this.teamService.getTeamById(this.team.id).subscribe(res => {
      let admin_data = {name: '', image: ''}
      let e = (res as any)
      this.team.admin_id = e.admin
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
      this.is_admin = this.profile_id === this.team.admin_id
    })
  }

  page: number = 1
  last_page: boolean = false 

  getTeamWorkouts(team_id: any){
    if(this.last_page)return
    this.teamService.getTeamWorkouts(team_id, this.page).subscribe(res => {
      if((res as any).next)this.page++
      else this.last_page = true
      for(let r of (res as any).workouts){
        let poster = {id: 0, type: ''}
        let poster_data = {name: '', image: ''}
        if(r.profile){
          poster.id = r.profile
          poster.type = 'profile'
          this.athleteService.getProfileById(poster.id).subscribe(res => {
            poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
            poster_data.image = (res as any).image
          })
        }
        let w: Workout = {
          id: r.id,
          poster: poster,
          poster_data: poster_data,
          title: r.title,
          description: r.description,
          exercises: [],
          date: r.updated
        }
        this.workouts.push(w)
      }
    }, 
    err => {
      alert('an error occured during get workouts')
    })
  }

  moreWorkouts(){
    this.getTeamWorkouts(this.team_id)
  }

  getTeamExercises(team_id: any){
    this.teamService.getTeamExercises(team_id).subscribe(res => {
      this.exercises = (res as any).exercises
    }, 
    err => {
      console.log(err)
      alert('an error occured during get exercises')
    })
  }

  showCreateWorkoutModal(){
    this.createWorkoutModalRef = this.modalService.open(this.createWorkoutModal)
    let modalContents:NodeListOf<Element> = document.querySelectorAll(".modal-content")
    let modalContent = (<HTMLElement>modalContents[0])
  
    modalContent.style.width="100%"
    modalContent.style.borderRadius='20px'
  
    let x=document.getElementsByTagName("ngb-modal-window");
  
    let y:HTMLDivElement=<HTMLDivElement>x[0].firstElementChild
    y.style.width="98%"
    y.style.marginTop='0px'
    y.style.maxWidth="98%"    
    y.style.maxHeight="100%"    
    y.style.position='absolute'
    y.style.left='50%'
    y.style.display='flex'
    y.style.justifyContent='center'
    y.style.transform='translate(-50%,0px)'
  }

  deleteWorkout(e:any,id:any){
    e.stopPropagation();
    this.teamService.deleteTeamWorkout(id).subscribe((res)=>{
      this.workouts = this.workouts.filter(w => w.id !== id)
    })
  }

  clickOnOptionMenu(e:any){
    e.stopPropagation();
  }

  goToWorkout(workout_id:any){
    this.router.navigate(['team/workout', workout_id])
  }


  createTeamWorkout(form: NgForm){
    let data = form.value
    let workout: any = {}
    workout.team = this.team_id
    workout.title = data.title
    workout.description = data.description
    let exercises: any[] = []
    this.exercises.forEach(e => {
      if(data['c'+e.id]){
        let exercise = {
          id: e.id,
          num_of_sets: data['s'+e.id],
          set_duration: data['d'+e.id],
          rest_duration: data['r'+e.id],
        }
        exercises.push(exercise)
      }
    })
    workout.exercises = exercises
    this.teamService.createTeamWorkout(workout).subscribe(res => {
      console.log(res)
    },
    err => {
      console.log(err)
    })
  }

}
