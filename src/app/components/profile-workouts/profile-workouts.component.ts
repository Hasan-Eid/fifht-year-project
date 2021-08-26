import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { Workout } from 'src/app/services/my-data.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-profile-workouts',
  templateUrl: './profile-workouts.component.html',
  styleUrls: ['./profile-workouts.component.css']
})
export class ProfileWorkoutsComponent implements OnInit {

  workouts: Workout[] = []

  athlete_id: any

  constructor(private router: Router, private route: ActivatedRoute, private athleteService: AthleteService, private ws: WorkoutService) { }

  ngOnInit(): void {
    this.athlete_id = this.route.snapshot.paramMap.get('id') as any
    this.getAthleteWorkouts(this.athlete_id)
  }

  page: number = 1
  last_page: boolean = false

  getAthleteWorkouts(athlete_id: any){
    if(this.last_page)return
    this.ws.getAthleteWorkouts(athlete_id, this.page).subscribe(res => {
      if((res as any).next)this.page++
      else this.last_page = true
      for(let r of (res as any).results){
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

  goToWorkout(workout_id:any){
    this.router.navigate(['workout', workout_id])
  }

  moreWorkouts(){
    this.getAthleteWorkouts(this.athlete_id)
  }

}
