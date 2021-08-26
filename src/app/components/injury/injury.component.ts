import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InjuryService } from 'src/app/services/injury.service';

@Component({
  selector: 'app-injury',
  templateUrl: './injury.component.html',
  styleUrls: ['./injury.component.css']
})
export class InjuryComponent implements OnInit {

  injury_data = {
    calorie: 2000, 
    age: 20, 
    weight: 60, 
    gender: 0, 
    injury: 0, 
    type: 1
  }

  recovery_period: number = 0

  constructor(private injuryService: InjuryService) { }

  ngOnInit(): void {
  }

  predictRecoveryPeriod(){
    this.injuryService.predictRecoveryPeriod(this.injury_data).subscribe(res => {
      this.recovery_period = (res as any).ans
    })
  }

}
