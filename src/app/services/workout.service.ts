import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyDataService } from './my-data.service';
import { isJSDocReturnTag } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  API_URL = ''
  

  constructor(private httpClient:HttpClient, data: MyDataService) {
    this.API_URL = data.API_URL
   }

  getExercises(){
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL + 'workout/exercise/list', 
                                  {headers: headers})
  }

 getExercise(id:any){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  let response = this.httpClient.get(this.API_URL + `workout/exercise/detail/${id}`, 
                                {headers: headers})
  return response
  }

deleteExercise(id:any){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  return this.httpClient.delete(this.API_URL + `workout/exercise/detail/${id}`, 
                                  {headers: headers})
}

getWorkouts(page: number){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  return this.httpClient.get(this.API_URL+`workout/workouts?page=${page}`, 
                                {headers: headers})
}

getAthleteWorkouts(athlete_id: any, page: number){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  return this.httpClient.get(this.API_URL+`workout/workouts/${athlete_id}?page=${page}`, 
                                {headers: headers})
}

getWorkout(id: string){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  return this.httpClient.get(this.API_URL + `workout/${id}`, 
                                {headers: headers})
}

deleteWorkout(id:any){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  return this.httpClient.delete(this.API_URL + `workout/delete/${id}`, 
                                  {headers: headers})
}

createExercise(exercise:any){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  return this.httpClient.post(this.API_URL + `workout/exercise/create/`, 
                                  exercise, 
                                  {headers: headers})
}

createWorkout(workout: any){
  let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
  return this.httpClient.post(this.API_URL + `workout/create`, 
                                  workout, 
                                  {headers: headers})
}

}
