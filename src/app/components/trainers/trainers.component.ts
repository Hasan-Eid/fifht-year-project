import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {
  @Output() chooseTrainer = new EventEmitter<string>();
  @Output() trainer = new EventEmitter<any>();

pageSuggestions=1
pageYouFollow=1
numTrainers=0
numSuggestions=0
trainers:any[]=[]
suggestions:any[]=[]

constructor(private ts:TrainerService) { }

ngOnInit(): void {
  this.numTrainers=this.ts.getNumOfTrainers()
  this.numSuggestions=this.ts.getNumOfSuggestions()
  this.trainers=this.ts.getTrainers(1)
  this.suggestions=this.ts.getSuggestions(1)
}


 goToTrainerPage(trainerObj:any){
   this.chooseTrainer.emit('trainer')
   this.trainer.emit(trainerObj)

 }
getNextTrainers(e:any){
 console.log(e)
 this.trainers=this.ts.getTrainers(e)
}
getNextSuggestions(e:any){
  console.log(e)
  this.suggestions=this.ts.getSuggestions(e)

 }

 
}
