import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { ExerciseOfWorkout, Workout } from 'src/app/services/my-data.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-workout',
  templateUrl: './team-workout.component.html',
  styleUrls: ['./team-workout.component.css']
})
export class TeamWorkoutComponent implements OnInit {
  
  currentSet=1
  restCounter=0
  restPeriod=false
  counter=1
  currentExercise=0

  

  workout: Workout = {
    id: 0,
    poster: {id: 0, type: ''},
    poster_data: {name: '', image: ''},
    title: '',
    description: '',
    exercises: [],
    date: new Date(),
  }

  constructor(private route: ActivatedRoute, private router: Router, private athleteService: AthleteService, private teamService: TeamService) { 
    let workout_id = route.snapshot.paramMap.get('id')
    this.getTeamWorkout(workout_id)
  }

  goToProfile(profile_id: any){
    this.router.navigate(['athlete', profile_id])
  }
  
  async getTeamWorkout(id: any){
    this.teamService.getTeamWorkout(id).subscribe(res => {
      let workout_data = (res as any).workout
      let exercises_data = (res as any).exercises
      console.log(exercises_data)
      let poster = {id: 0, type: ''}
      let poster_data = {name: '', image: ''}
      if(workout_data.profile){
        poster.id = workout_data.profile
        poster.type = 'profile'
        this.athleteService.getProfileById(poster.id).subscribe(res => {
          poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
          poster_data.image = (res as any).image
        })
      }
      let exercises: ExerciseOfWorkout[] = []
      exercises_data.forEach((e:any) => {
        console.log(e)
        let exercise: ExerciseOfWorkout = {
          id: e.data.id,
          title: e.data.title,
          description: e.data.description,
          gif: e.data.gif,
          num_of_sets: e.training.num_of_sets,
          set_duration: e.training.set_duration,
          rest_duration: e.training.rest_duration
        }
        exercises.push(exercise)
      });
      let w: Workout = {
        id: workout_data.id,
        poster: poster,
        poster_data: poster_data,
        title: workout_data.title,
        description: workout_data.description,
        exercises: exercises,
        date: workout_data.updated
      }
      this.workout = w
      console.log(w)
    }, 
    err => {
      alert('an error occured during get workout')
    })
  }
  
  ngOnInit(): void {
    }
  
  
    next(){
      if(this.currentExercise<this.workout.exercises.length-1)
         this.currentExercise++
      this.counter=this.workout.exercises[this.currentExercise].set_duration
      this.restCounter=this.workout.exercises[this.currentExercise].rest_duration
      this.currentSet=1
      this.restPeriod=false
    }

     previous(){
      if(this.currentExercise>0)
         this.currentExercise--
      this.counter=this.workout.exercises[this.currentExercise].set_duration
      this.restCounter=this.workout.exercises[this.currentExercise].rest_duration
      this.currentSet=1
      this.restPeriod=false
    }


    is_play: boolean = false

    play(){
      this.is_play = true
      this.currentExercise=0
      this.counter=this.workout.exercises[this.currentExercise].set_duration
      let interval=setInterval(()=>{
                this.counter--
                if(this.counter==0)
                { 
                   this.restPeriod=true
                   this.restCounter=this.workout.exercises[this.currentExercise].rest_duration
                   let restInterval=setInterval(()=>{
                        this.restCounter--
                        if(this.restCounter==0){
                           this.restPeriod=false
                           clearInterval(restInterval)
                           if(this.currentSet<this.workout.exercises[this.currentExercise].num_of_sets){
                            this.currentSet++
                            this.counter=this.workout.exercises[this.currentExercise].set_duration
           
                            }
                            else{
                          
                             if(this.currentExercise<this.workout.exercises.length-1){
                               
                                this.currentExercise++
                                this.counter=this.workout.exercises[this.currentExercise].set_duration
                                this.currentSet=1
           
                               }
                             else{
                               clearInterval(interval)
                               this.currentSet=1
                               this.currentExercise=0
                               this.counter=this.workout.exercises[0].set_duration
                               this.restCounter=0
                               this.is_play = false
                              }
                            }              
                         }
              
                    },1000)
  
              
             }
           },1000)
  
    }
  

}
