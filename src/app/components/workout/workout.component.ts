import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

 workout= {
    workout:{
             id:1,
             title:'workout1',
             profile:2,
             trainer:null,
             description:'description is here description is here description is here'
         },
    exercises:[
      {
      id:1,
      description:`exercise decicription exercise exercise decicription exercise decicription exercise decicription exercise decicription exercise decicription exercise decicription exercise decicr iptionexercise 
       decicription exercise decicription`,
      title:'exercise 1',
      profile:1,
      gif:'../../../assets/ex1.gif',
      num_of_sets:5,
      set_duration:10,
      rest_duration:5
    },{
      id:2,
      profile:5,
      description:'exercise decicription',
      title:'exercise 2',
      num_of_sets:2,
      set_duration:15,
      rest_duration:6,
      gif:'../../../assets/ex1.gif'
    }
  ]

}
currentSet=1
restCounter=0
restPeriod=false
counter=1
currentExercise:any=0
workoutProfile:any={
  first_name:'athlete',
  last_name:'a1',
  image:'../../../assets/r1.jpg'
}
workoutTrainer:any={
  page_name:'trainer 1',
  image:'../../../assets/r2.jpg'

}

constructor(private as:AthleteService) { }

ngOnInit(): void {
  
  //  if(this.workout.workout.profile){
  //       this.as.getProfileById(this.workout.workout.profile).subscribe((res)=>{
  //       this.workoutProfile= res
  //      })
  //  }
  //  else{
  //   this.as.getTrainerProfile(this.workout.workout.trainer).subscribe((res)=>{
  //     this.workoutProfile= res
  //    })
  //  }

  
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
  play(){
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
                            }
                          }              
                       }
            
                  },1000)

            
           }
         },1000)

  }


}
