import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(private httpClient:HttpClient) { }
  
  
  editProfile(data:any) {
    return this.httpClient.patch('https://peaceful-savannah-28414.herokuapp.com/' +'athlete/'+data.slug,data)
    
  }
  getProfile(slug:any) {
    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' +'athlete/'+slug)

  }
  getProfileById(id:any) {
    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' +`/athlete/retrieve/${id}`)

  }
  getTrainerProfile(slug:any){
    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' +`/athlete/retrieve/${slug}`)

  }
  
}
