import {NgClass, NgForOf} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {DataService} from "../../service/DataTransfer";
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
  }


  private baseUrl = 'http://localhost:8080/gestEvent/reservation/';

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) {
    // Subscribe to route changes
    //
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }


  ngOnInit() {
    // Set the initial active route
    this.authService.getUser();
    this.activeRoute = this.router.url;
    this.getReservation(this.currentUser?.email)
  }

  /*async getReservation() {
   try {
     const res = await fetch(`${this.baseUrl}/ListReservation`);

     ///******Vérifie si la requête a réussi******
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
 }*/
  async getReservation(email: any): Promise<any> {
    try {
      const res = await fetch(`${this.baseUrl}userReservation?email=`+ email +``);

      ///******Vérifie si la requête a réussi******/
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

  stockBookingIds(e:any){
    this.Ids.eventId = e;
  }

  /*Envoie des donnéés de la reservation au composant ticket*/
  sendData() {
    this.dataService.changeData(this.Ids);
  }

}
