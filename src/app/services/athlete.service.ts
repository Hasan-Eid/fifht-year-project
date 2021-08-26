import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyDataService } from './my-data.service';


@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  API_URL = ''

  constructor(private httpClient:HttpClient, private data: MyDataService) {
    this.API_URL = data.API_URL
   }
  
  
  editProfile(slug: string, formData: FormData) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.patch(this.API_URL+'athlete/'+slug, 
                                formData, 
                                {headers: headers})
  }


  getProfile(slug: String) {
    let headers = {'Authorization': 'Bearer ' + MyDataService.user.tokens.access}
    return this.httpClient.get(this.API_URL+`athlete/${slug}`, 
                              {headers: headers})
  }


  getProfileById(id:any) {
    return this.httpClient.get(this.API_URL +`athlete/retrieve/${id}`)
  }


  // getTrainerProfile(slug:any){
  //   return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' +`/athlete/retrieve/${slug}`)
  // }
  
}
