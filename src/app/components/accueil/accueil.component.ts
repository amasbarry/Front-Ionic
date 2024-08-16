import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/service/auth.service';
import { Billet, Categorie_Billet, Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { NgFor, NgIf } from '@angular/common';

import { EventServiceService } from 'src/app/service/event-service.service';
import { Evenement } from 'src/app/models/Evenement';
import { forkJoin, map } from 'rxjs';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: 
  [
    RouterLink,
    RouterOutlet,
    NavbarComponent,
    NgIf,
    NgFor
  ],
})
export class AccueilComponent  implements OnInit {

  user: Utilisateur | null = null;
  event: Evenement[] = [];
  prixMap: Map<number, number> = new Map(); // Map pour stocker les prix associés aux événements

  constructor(
    private authService: AuthService,
    private eventService: EventServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser(); // Récupérer les informations de l'utilisateur

    // Récupérer les événements
    this.eventService.getEvents().subscribe(
      (events: Evenement[]) => {
        this.event = events;
        console.log("events:", events);

        // Récupérer les prix pour chaque événement
        const priceObservables = this.event.map(event =>
          this.eventService.getPrixBillet(event.id).pipe(
            map(prixData => ({ eventId: event.id, prix: prixData }))
          )
        );

        // Attendre que tous les prix soient récupérés
        forkJoin(priceObservables).subscribe(prices => {
          prices.forEach(priceData => {
            this.prixMap.set(priceData.eventId, priceData.prix); // Stocker les prix dans le Map
          });
          console.log("events with prices:", this.prixMap);
        });
      }
    );
  }

  getPrixForEvent(eventId: number): number | undefined {
    return this.prixMap.get(eventId);
  }
  Deconnexion(){
    this.authService.clearUser();
    this.router.navigate(['/home']);
    console.log('déconnexion');
  }

}
