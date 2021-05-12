import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private as:AuthService) { }

  ngOnInit(): void {
  }
  signUp(form:NgForm){
    let data = form.value;
    console.log(data.email)

    this.as.signUp(data.name,data.email,data.password)
    .subscribe(res=>{
      console.log(res)
    })
    
  }

}
