import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { Router } from '@angular/router';
import { Exercise, MyDataService, Workout } from 'src/app/services/my-data.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  
  profile_id = MyDataService.myProfile.id
  
  @ViewChild("createWorkoutModal")
  createWorkoutModal!: ElementRef;
  createWorkoutModalRef!: NgbModalRef;

  exercises: Exercise[]=[
    {
      id:1,
      description:'exercise decicription',
      title:'exercise 1',
      gif:'../../../assets/ex1.gif'
    },{
      id:2,
      description:'exercise decicription',
      title:'exercise 2',
      gif:'../../../assets/ex1.gif'
    },{
      id:5,
      description:'exercise decicription',
      title:'exercise 2',
      gif:'../../../assets/ex1.gif'
    },{
      id:6,
      description:'exercise decicription',
      title:'exercise 2',
      gif:'../../../assets/ex1.gif'
    },{
      id:3,
      description:'exercise decicription',
      title:'exercise 3',
      gif:'../../../assets/ex1.gif'
    }
  ]

//   workouts:any[]=[{
//     id:1,
//     title:'workout1',
//     description:'description is here'
//   },{
//     id:2,
//     title:'workout2',
//     description:'description is here'
//   },{
//     id:3,
//     title:'workout3',
//     description:'description is here'
//   },{
//     id:4,
//     title:'workout4',
//     description:'description is here'
//   },{
//     id:5,
//     title:'workout5',
//     description:'description is here'
//   },{
//     id:6,
//     title:'workout6',
//     description:'description is here'
//   }
// ]

// next=1
// previous=1
// count=1
//   myProfile={}


  workouts: Workout[] = []

  constructor(private router: Router, private modalService: NgbModal, private as:AuthService, private athleteService: AthleteService, private trainerService: TrainerService, private ws:WorkoutService) {
    this.getLastWorkouts()
    this.getExercises()
   }

   goToTopScroll(){
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
  }

  page: number = 1
  last_page: boolean = false

  getLastWorkouts(){
    if(this.last_page)return
    this.ws.getWorkouts(this.page).subscribe(res => {
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
        } else if(r.trainer) {
          poster.id = r.trainer
          poster.type = 'trainer'
          this.trainerService.getTrainerById(poster.id).subscribe(res => {
            poster_data.name = (res as any).page_name
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

  moreWorkouts(){
    this.getLastWorkouts()
  }

  getExercises(){
    this.ws.getExercises().subscribe(res => {
      // console.log(res)
      this.exercises = (res as any).exercises
    }, 
    err => {
      console.log(err)
      alert('an error occured during get exercises')
    })
  }

  ngOnInit(): void {
    // this.myProfile= this.as.myProfile
  }

  

  deleteWorkout(e:any,id:any){
    e.stopPropagation();
    this.ws.deleteWorkout(id).subscribe((res)=>{
      this.workouts = this.workouts.filter(w => w.id !== id)
    })
   }


   clickOnOptionMenu(e:any){
     e.stopPropagation();
   }

   goToWorkout(workout_id:any){
   console.log('goToWorkout')
   this.router.navigate(['workout', workout_id])
   }

  createWorkout(form: NgForm){
    console.log(form.value)
    let data = form.value
    let workout: any = {}
    workout.title = data.title
    workout.description = data.description
    let exercises: any[] = []
    this.exercises.forEach(e => {
      if(data['c'+e.id]){
        let exercise = {
          id: e.id,
          num_of_sets: data['s'+e.id],
          set_duration: data['d'+e.id],
          rest_duration: data['r'+e.id],
        }
        exercises.push(exercise)
      }
    })
    workout.exercises = exercises
    console.log(workout)
    this.ws.createWorkout(workout).subscribe(res => {
      console.log(res)
    },
    err => {
      console.log(err)
    })
  }
  
  // createWorkout(form:any){
  //   let exercises=[]
  //   let checkboxs=document.getElementsByClassName('checkboxOfExercise')
  //     for(let i=0;i<checkboxs.length;i++){
  //       if((<HTMLInputElement>checkboxs[i]).checked){
  //         let parent=checkboxs[i].parentElement;
  //         let num_of_sets=parseInt((<HTMLInputElement>(<HTMLElement>parent).getElementsByClassName('numOfSets')[0]).value)
  //         let set_duration=parseInt((<HTMLInputElement>(<HTMLElement>parent).getElementsByClassName('duration')[0]).value)
  //         let rest_duration=parseInt((<HTMLInputElement>(<HTMLElement>parent).getElementsByClassName('restDuration')[0]).value)
  //         exercises.push({...this.exercises[i],num_of_sets,set_duration,rest_duration})
  //       }
  //     }
  //     let workout={...form.value,exercises}
  //   console.log(workout)

  //   this.ws.createWorkout(workout).subscribe((res)=>{
  //     console.log(res)
  //   })
  //   this.createWorkoutModalRef.close()
  // }


  showCreateWorkoutModal(){
    // this.ws.getExercises().subscribe((res)=>{
    //   console.log(res)
    //   // this.exercises=
    //   this.createWorkoutModalRef=this.modalService.open(this.createWorkoutModal)
    //   let modalContents:NodeListOf<Element>=document.querySelectorAll(".modal-content")
    //   let modalContent=(<HTMLElement>modalContents[0])
  
    //   modalContent.style.width="100%"
    //   modalContent.style.borderRadius='20px'
  
    //   let x=document.getElementsByTagName("ngb-modal-window");
  
    //   let y:HTMLDivElement=<HTMLDivElement>x[0].firstElementChild
    //   y.style.width="98%"
    //   y.style.marginTop='0px'
    //   y.style.maxWidth="98%"    
    //   y.style.maxHeight="98%"    
    //   y.style.position='absolute'
    //   y.style.left='50%'
    //   y.style.display='flex'
    //   y.style.justifyContent='center'
    //   y.style.transform='translate(-50%,0px)'
    

    // })

    this.createWorkoutModalRef=this.modalService.open(this.createWorkoutModal)
    let modalContents:NodeListOf<Element>=document.querySelectorAll(".modal-content")
    let modalContent=(<HTMLElement>modalContents[0])
  
    modalContent.style.width="100%"
    modalContent.style.borderRadius='20px'
  
    let x=document.getElementsByTagName("ngb-modal-window");
  
    let y:HTMLDivElement=<HTMLDivElement>x[0].firstElementChild
    y.style.width="98%"
    y.style.marginTop='0px'
    y.style.maxWidth="98%"    
    y.style.maxHeight="100%"    
    y.style.position='absolute'
    y.style.left='50%'
    y.style.display='flex'
    y.style.justifyContent='center'
    y.style.transform='translate(-50%,0px)'
  
  
    }
  

}
