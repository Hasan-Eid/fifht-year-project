import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  @ViewChild("createWorkoutModal")
  createWorkoutModal!: ElementRef;
  createWorkoutModalRef!: NgbModalRef;

  exercises:any[]=[
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
  workouts:any[]=[{
    id:1,
    title:'workout1',
    description:'description is here'
  },{
    id:2,
    title:'workout2',
    description:'description is here'
  },{
    id:3,
    title:'workout3',
    description:'description is here'
  },{
    id:4,
    title:'workout4',
    description:'description is here'
  },{
    id:5,
    title:'workout5',
    description:'description is here'
  },{
    id:6,
    title:'workout6',
    description:'description is here'
  }
]

next=1
previous=1
count=1
  myProfile={}
  constructor(private router: Router,private modalService: NgbModal,private as:AuthService,private ws:WorkoutService) { }

  ngOnInit(): void {
    this.myProfile= this.as.myProfile
    // this.ws.getWorkouts(1).subscribe((res)=>{
    //   console.log(res)
    //   this.workouts=
    //   this.count=
    //   this.previous=
    //   this.next=
    // })


  }
  moreWorkouts(){
    // this.ws.getWorkouts(this.next).subscribe((res)=>{
    //   console.log(res)
    //   this.workouts=this.workouts.concat(res.)
    //     this.count=
    //     this.previous=
    //     this.next=

    // })

  }

  deleteWorkout(e:any,id:any){
    e.stopPropagation();
    this.ws.deleteWorkout(id).subscribe((res)=>{
      console.log(res)
    })
   }


   clickOnOptionMenu(e:any){
     e.stopPropagation();

   }

   goToWorkout(workout:any){
   console.log('goToWorkout')
   this.router.navigate(['workout'])
   }
  
  createWorkout(form:any){
    let exercises=[]
    let checkboxs=document.getElementsByClassName('checkboxOfExercise')
      for(let i=0;i<checkboxs.length;i++){
        if((<HTMLInputElement>checkboxs[i]).checked){
          let parent=checkboxs[i].parentElement;
          let num_of_sets=parseInt((<HTMLInputElement>(<HTMLElement>parent).getElementsByClassName('numOfSets')[0]).value)
          let set_duration=parseInt((<HTMLInputElement>(<HTMLElement>parent).getElementsByClassName('duration')[0]).value)
          let rest_duration=parseInt((<HTMLInputElement>(<HTMLElement>parent).getElementsByClassName('restDuration')[0]).value)
          exercises.push({...this.exercises[i],num_of_sets,set_duration,rest_duration})
        }
      }
      let workout={...form.value,exercises}
    console.log(workout)

    this.ws.createWorkout(workout).subscribe((res)=>{
      console.log(res)
    })
    this.createWorkoutModalRef.close()

  }
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
