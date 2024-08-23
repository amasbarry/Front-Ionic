import {NgClass, NgForOf} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {DataService} from "../../service/DataService";
import {AuthService} from "../../service/auth.service";
import {Utilisateur} from "../../models/utilisateurmodel.component";


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
      NavbarComponent,
      NgForOf
    ],
})
export class ReservationComponent  implements OnInit {
  currentUser = this.authService.getUser();
  activeRoute: string = '';
  reservation: any[] = [];
  Ids = {
    eventId: 0
  };

  private baseUrl = 'http://localhost:8080/gestEvent/reservation/';

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) {
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
    if (this.currentUser) {
      this.getReservation(this.currentUser.email);
    } else {
      this.router.navigate(['/login']); // Redirection si l'utilisateur n'est pas connecté
    }
  }

  async getReservation(email: any): Promise<any> {
    try {
      const res = await fetch(`${this.baseUrl}userReservation?email=${email}`);

      // Vérifie si la requête a réussi
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const results = await res.json();
      this.reservation = results;

      console.log(results);
      console.log(this.reservation);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  stockBookingIds(e: any) {
    this.Ids.eventId = e;
  }

  onReservationClick(reservationId: number) {
    if (this.currentUser) {
      this.stockBookingIds(reservationId);
      this.sendData();
      this.router.navigate(['/ticket']); // Redirection vers la page ticket
    } else {
      this.router.navigate(['/login']); // Redirection vers la page login si non connecté
    }
  }

  sendData() {
    this.dataService.changeData(this.Ids);
  }

}
