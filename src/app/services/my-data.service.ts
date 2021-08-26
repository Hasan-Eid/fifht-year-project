import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface User {
  username: string;
  email: string;
  tokens: {access: string, refresh: string};
}

export interface Profile{
  id: number,
  first_name: string,
  last_name: string,
  hobbies: string,
  carear: string,
  image: string,
  slug: string
}


export interface Comment{
  id: number,
  commenter: {id: number, name: string},
  post: number,
  parent: number,
  body: string,
  date: Date
}

export interface Post{
  id: number,
  poster: {id: number, type: string},
  poster_data: {name: string, image: string},
  title: string,
  content: string,
  images: string[],
  date: Date,
  like: {likes: number, isLiked: boolean},
  share: {shares: number, isShared: boolean}
}

export interface Exercise{
  id: number,
  title: string,
  description: string,
  gif: string
}

export interface ExerciseOfWorkout{
  id: number,
  title: string,
  description: string,
  gif: string,
  num_of_sets: number,
  set_duration: number,
  rest_duration: number
}

export interface Workout{
  id: number,
  poster: {id: number, type: string},
  poster_data: {name: string, image: string},
  title: string,
  description: string,
  exercises: ExerciseOfWorkout[],
  date: Date,
}


export interface Team{
  id: number,
  admin_id: number,
  admin_data: {name: string, image: string},
  name: string,
  description: string,
  image: string,
  date: Date,
}


export interface Message{
  id: number,
  sender: {id: number, slug: string, name: string, image: string},
  receiver: {id: number, slug: string, name: string, image: string},
  content: string,
  date: Date,
}


export interface TeamMessage{
  id: number,
  sender: {id: number, slug: string, name: string, image: string},
  team_id: number,
  content: string,
  date: Date,
}


@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  // API_URL = 'https://peaceful-savannah-28414.herokuapp.com/'
  API_URL = 'http://localhost:8000/'

  static user: User = {
    username: '', 
    email: '', 
    tokens: {
      access: '', 
      refresh: ''
    }
  }
  
  static myProfile: Profile = {
    id: 0,
    slug: '',
    first_name: '',
    last_name: '',
    carear: '',
    hobbies: '',
    image: ''
   }


  constructor(private httpClient:HttpClient) { }



}
