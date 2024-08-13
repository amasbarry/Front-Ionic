import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavbarComponent,NgClass],
})

export class NavbarComponent implements OnInit {
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

  // setActive(event: any) {
  //   const allButtons = document.querySelectorAll('#navbar .btn');
  //   allButtons.forEach((btn) => {
  //     btn.classList.remove('active');
  //   });

  //   const clickedButton = event.currentTarget;
  //   clickedButton.classList.add('active');
  // }
}
