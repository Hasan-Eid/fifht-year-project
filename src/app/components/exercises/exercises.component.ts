import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  @ViewChild("createExerciseModal")
  createExerciseModal!: ElementRef;
  createExerciseModalRef!: NgbModalRef;
  
  exercises:any[]=[
    {
      id:1,
      description:`exercise decicription exercise exercise decicription exercise decicript ionexercise decicription exercise decicriptionexercise decicriptionexercise decicriptionexercise decicriptionexercise 
      decicriptionexercise decicriptionexercise decicription`,
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
  imageURL:any=''
   myProfile={id:1}
  constructor(private modalService: NgbModal,private sanitizer: DomSanitizer,private ws:WorkoutService) { }

  ngOnInit(): void {
  }
  closeModal(modal:any){
    modal.close()
    this.imageURL=''
  }
  deleteExercise(id:any){
      this.ws.deleteExercise(id).subscribe((res)=>{
      console.log(res)
      this.exercises=this.exercises.filter(e=>e.id!=id)
    })

  }
  createExercise(form:any,gif:any){
    this.createExerciseModalRef.close()
    this.imageURL=''
    console.log(form.value)
    console.log(gif.files)
    this.ws.createExercise({tilte:form.title,description:form.decicription,profile:this.myProfile.id}).subscribe((res)=>{
     console.log(res)
     this.exercises.push(res)
    })

  }

  selectImage(e:any){
    let files=(<FileList>e.target.files)
    let url=URL.createObjectURL(files[0])
    this.imageURL=this.sanitizer.bypassSecurityTrustUrl(url)
  }
  showCreateExerciseModal(){
    this.createExerciseModalRef=this.modalService.open(this.createExerciseModal)
    let modalContents:NodeListOf<Element>=document.querySelectorAll(".modal-content")
    let modalContent=(<HTMLElement>modalContents[0])
  
    modalContent.style.width="100%"
    modalContent.style.borderRadius='20px'
  
    let x=document.getElementsByTagName("ngb-modal-window");
  
    let y:HTMLDivElement=<HTMLDivElement>x[0].firstElementChild
    y.style.width="50%"
    y.style.marginTop='3%'
    y.style.maxWidth="50%"    
    y.style.maxHeight="85%"    
    y.style.position='absolute'
    y.style.left='50%'
    y.style.display='flex'
    y.style.justifyContent='center'
    y.style.transform='translate(-50%,0px)'
  
  
    }
  
  }
