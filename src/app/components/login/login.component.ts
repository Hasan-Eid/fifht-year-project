import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { AuthService } from 'src/app/services/auth.service';
import { MyDataService, Profile, User } from 'src/app/services/my-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private as: AuthService, private athleteService: AthleteService) { }

  ngOnInit(): void {
    console.log(this.as.isRouteAuthenticated())
  }

  onSubmit(form:NgForm){
    this.login(form)
  }

  login(form: any){
    let data = form.value;
    this.as.login(data.email, data.password)
  }


}
