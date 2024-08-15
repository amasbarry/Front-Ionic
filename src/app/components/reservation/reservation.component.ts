import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  imports: 
  [
    RouterModule,
    RouterOutlet,
    RouterLink,
    NgClass,
    NavbarComponent
  ],
})
export class ReservationComponent  implements OnInit {

  activeRoute: string = '';
  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }


  ngOnInit() {
    // Set the initial active route
    this.activeRoute = this.router.url;
  }
}
