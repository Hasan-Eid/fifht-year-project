import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApolloServiceService } from 'src/app/services/apollo-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { MyDataService } from 'src/app/services/my-data.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  is_auth !: boolean

  isOpen: boolean = false;
  isClose: boolean = true;

  constructor(public as: AuthService, private router: Router, private apolloService: ApolloServiceService) {
    this.is_auth = as.is_auth;
   }

  ngOnInit(): void {
    // this.is_auth = this.as.isRouteAuthenticated()
  }

  toggleNavbar(){
    this.isOpen = !this.isOpen;
    this.isClose = !this.isClose;
  }

  logout(){
    this.as.chagneAuth()
    this.is_auth = false
    this.as.logout().subscribe(res => {
      sessionStorage.clear()
      MyDataService.user = {
        username: '', 
        email: '', 
        tokens: {
          access: '', 
          refresh: ''
        }
      }
      this.router.navigate(['/login'])
      console.log('logout')
    }, 
    err => {
      console.log(err)
    })
  }

  keyword: string = ''
  search_results: any = {workouts: [], profiles: [], posts: []}

  search(){
    this.apolloService.search(this.keyword)
    this.search_results = this.apolloService.search_results
  }

}
