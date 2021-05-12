import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private httpClient:HttpClient) { }

  getExercises(){
    return     this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + 'workout/exercise/list/')
 }
 getExercise(id:any){
  return     this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' + `workout/exercise/detail/${id}`)
}
deleteExercise(id:any){
  return     this.httpClient.delete('https://peaceful-savannah-28414.herokuapp.com/' + `workout/exercise/detail/${id}`)
}
getWorkouts(page:any){
  return     this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/'+`workout/workouts?page=${page}`)
}
deleteWorkout(id:any){
  return     this.httpClient.delete('https://peaceful-savannah-28414.herokuapp.com/' + `workout/delete/${id}`)
}

createExercise(exercise:any){
  return     this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + `workout/exercise/create/`,exercise)

}
createWorkout(Workout:any){
  return     this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + `workout/create/`,Workout)

}


}
