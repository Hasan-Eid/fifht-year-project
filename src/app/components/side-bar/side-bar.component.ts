import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sidebar_active: boolean = false
  toggleSidebar(){
    this.sidebar_active = !this.sidebar_active
  }

  goToTopScroll(){
    window.scroll(0,0);
  }

}
