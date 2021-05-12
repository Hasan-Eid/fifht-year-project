import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-switching',
  templateUrl: './trainer-switching.component.html',
  styleUrls: ['./trainer-switching.component.css']
})
export class TrainerSwitchingComponent implements OnInit {

  choose:string='trainers'
  trainer:any={}
  constructor( ) { }
  ngOnInit(): void {
  }
  change(e:any){
    console.log(e)
    this.choose=e
  }
  setTrainer(e:any){
    console.log(e)
   this.trainer=e
  }

}
