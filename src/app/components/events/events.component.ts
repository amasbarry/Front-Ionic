import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { Evenement } from 'src/app/models/Evenement';
import { AuthService } from 'src/app/service/auth.service';
import { EventServiceService } from 'src/app/service/event-service.service';
import { forkJoin, map } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports:
   [
    RouterOutlet, 
    RouterLink,
    NgIf,
    NgFor,
    NavbarComponent,
    FormsModule
  ],
})
export class EventsComponent implements OnInit {
  EVENTE: string = '';
  user: Utilisateur | null = null;
  event: Evenement[] = [];
  filteredEvents: Evenement[] = [];
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

          // Appliquer les filtres après que tous les prix soient récupérés
          this.filterEvents();
        });
      }
    );
  }

  filterEvents() {
    this.filteredEvents = this.event.filter(event =>
      event.nom.toLowerCase().includes(this.EVENTE.toLowerCase()) ||
      event.description.toLowerCase().includes(this.EVENTE.toLowerCase()) ||
      event.lieu.toLowerCase().includes(this.EVENTE.toLowerCase())
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
