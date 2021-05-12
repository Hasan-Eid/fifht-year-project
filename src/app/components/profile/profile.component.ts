import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  choose:string='my'

  constructor( ) { }
  ngOnInit(): void {
  }
  change(e:any){
    console.log(e)
    this.choose=e
  }
   
}
