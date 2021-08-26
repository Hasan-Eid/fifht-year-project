import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, of } from 'rxjs';
import { from } from 'zen-observable';
import { MyDataService } from './my-data.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  API_URL = ''

  trainers=[{
    id:1,
    profile:5,
    page_name:'Top Sport',
    career:"career",
    image:'../../../assets/r1.jpg',
    slug:'1',
    follow:true
  },{
    id:2,
    profile:5,
    page_name:'Top Sport',
    career:"career",
    image:'../../../assets/r5.jpg',
    slug:'2',
    follow:false
  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r4.jpg',
    slug:'3',
    follow:true
  },{
    id:2,
    profile:5,
    page_name:'Top Sport',
    career:"career",
    image:'../../../assets/r2.jpg',
    slug:'4',
    follow:true
  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r4.jpg',
    slug:'5',
    follow:false

  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r1.jpg',
    slug:'6',
    follow:true

  },{
    id:2,
    profile:5,
    page_name:'Top Sport',
    career:"career",
    image:'../../../assets/r3.jpg',
    slug:'7',
    follow:true
  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r1.jpg',
    slug:'8',
    follow:false

  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r4.jpg',
    slug:'9',
    follow:false

  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r4.jpg',
    slug:'10',
    follow:false

  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r1.jpg',
    slug:'11',
    follow:true

  },{
    id:2,
    profile:5,
    page_name:'Top Sport',
    career:"career",
    image:'../../../assets/r3.jpg',
    slug:'12',
    follow:true

  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r1.jpg',
    slug:'13',
    follow:false

  },{
    id:2,
    profile:5,
    page_name:'Top Sport',
    career:"career",
    image:'../../../assets/r2.jpg',
    slug:'14',
    follow:false
  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r5.jpg',
    slug:'15',
    follow:true
  },{
    id:2,
    profile:5,
    page_name:'Top Sport',
    career:"career",
    image:'../../../assets/r4.jpg',
    slug:'16',
    follow:true
  },{
    id:13,
    profile:2,
    page_name:'Top Sport2',
    career:"career",
    image:'../../../assets/r3.jpg',
    slug:'17',
    follow:false
  }
  ]
  constructor(private httpClient:HttpClient, private data: MyDataService) {
    this.API_URL = data.API_URL
   }

  getTrainerById(id: any){
    return this.httpClient.get(this.API_URL +`trainer/retrieve/${id}`)
  }
  
  getTrainers(page:any) {
    let pageOfTrainers=[]
    if(8*page<=this.trainers.length)
    {
       pageOfTrainers=this.trainers.slice(8*(page-1),8*page)
    } 
    else{
       pageOfTrainers=this.trainers.slice(8*(page-1))
    }
    return pageOfTrainers
    
  }

  getSuggestions(page:any){

    let pageOfTrainers=[]
    if(8*page<=this.trainers.length)
    {
       pageOfTrainers=this.trainers.slice(8*(page-1),8*page)
    } 
    else{
       pageOfTrainers=this.trainers.slice(8*(page-1))
    }
    return pageOfTrainers
  }

  getNumOfSuggestions() {
     return     this.trainers.length
  }
  getNumOfTrainers(){
   return this.trainers.length
  }

  follow(slug:any){
   this.trainers.forEach((t)=>{
     (t.slug==slug)?t.follow=true:{}
    })
   return  this.trainers.filter(t=>t.slug==slug)[0]
  }
  unFollow(slug:any){
    this.trainers.forEach((t)=>{
      (t.slug==slug)?t.follow=false:{}
     })
    return  this.trainers.filter(t=>t.slug==slug)[0]
  }




  // follow(slug:any){
  //   return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/send-invite/',{slug:slug})
  // }
  // unFollow(slug:any){
  //   return this.httpClient.post('https://peaceful-savannah-28414.herokuapp.com/' + 'friendship/send-invite/',{slug:slug})
  // }
//  getNumOfSuggestions() {
//      return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' )
//  }

// getSuggestions(page:any){
  //    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' +'trainer/?size=8&page='+page)
  // }
// getTrainers(page:any) {
  //    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' +'trainer/?size=8&page='+page)
  // }

  // getNumOfTrainers(){
  //    return this.httpClient.get('https://peaceful-savannah-28414.herokuapp.com/' )
  //  }
}
