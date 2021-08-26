import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { AuthService } from 'src/app/services/auth.service';
import { MyDataService, Profile, User } from 'src/app/services/my-data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private as:AuthService, private athleteService: AthleteService) { }

  ngOnInit(): void {
  }
  signUp(form:NgForm){
    let data = form.value;
    this.as.signUp(data.name, data.email, data.password)
    .subscribe(res=>{
      this.as.login(data.email, data.password)
      this.router.navigate(['/profile/edit'])
    }, 
    (err) => {
      alert(err.error.detail)
    })
    
  }

}
