import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyDataService } from './my-data.service';

@Injectable({
  providedIn: 'root'
})
export class InjuryService {

  API_URL = ''

  constructor(private httpClient:HttpClient, data: MyDataService) { 
    this.API_URL = data.API_URL
  }

  predictRecoveryPeriod(injury_data: any) {
    return this.httpClient.post(this.API_URL+'injury', 
                                injury_data)
  }
}
