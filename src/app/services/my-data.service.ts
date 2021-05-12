import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  
   myProfile={
     id:'1',
     slug:'1',
     first_name:'hasan',
     last_name:'eid',
     career:'this is career',
     hobbies:"this is hobbies",
     image:'../../../assets/r3.jpg'
   }
  constructor(private httpClient:HttpClient) { }



}
