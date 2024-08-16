import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {NavigationEnd, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-politique',
  templateUrl: './politique.page.html',
  styleUrls: ['./politique.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class PolitiquePage implements OnInit {

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
