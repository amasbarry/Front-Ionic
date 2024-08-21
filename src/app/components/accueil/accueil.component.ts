import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/service/auth.service';
import { Billet, Categorie_Billet, Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    NgFor,
    FormsModule
  ],
})
export class AccueilComponent  implements OnInit {
  EVENTE: string = '';
  user: Utilisateur | null = null;
  event: Evenement[] = [];
  filteredEvents: Evenement[] = [];
  nevent: Evenement | null = null;
  selectedCategory: string | null = null;
  prixMap: Map<number, number> = new Map(); // Map pour stocker les prix associés aux événements

  constructor(
    private authService: AuthService,
    private eventService: EventServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    // Récupérer le prochain événement
    this.eventService.getNextEvent().subscribe(
      (event: Evenement) => {
        this.nevent = event;
      },
      (error) => {
        console.error('Erreur lors de la récupération du prochain événement:', error);
      }
    );

    // Récupérer tous les événements
    this.eventService.getEvents().subscribe(
      (events: Evenement[]) => {
        this.event = events;

        // Récupérer les prix pour chaque événement
        const priceObservables = this.event.map(event =>
          this.eventService.getPrixBillet(event.id).pipe(
            map(prixData => ({ eventId: event.id, prix: prixData }))
          )
        );

        forkJoin(priceObservables).subscribe(prices => {
          prices.forEach(priceData => {
            this.prixMap.set(priceData.eventId, priceData.prix);
          });

          // Appliquer les filtres après que tous les prix soient récupérés
          this.filterEvents();
        });
      }
    );
  }

  filterEvents() {
    this.filteredEvents = this.event.filter(event =>
      (this.selectedCategory ? event.category.category === this.selectedCategory : true) &&
      (event.nom.toLowerCase().includes(this.EVENTE.toLowerCase()) ||
       event.description.toLowerCase().includes(this.EVENTE.toLowerCase()) ||
       event.lieu.toLowerCase().includes(this.EVENTE.toLowerCase()))
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterEvents(); // Appliquer le filtre dès que la catégorie change
  }

  getPrixForEvent(eventId: number): number | undefined {
    return this.prixMap.get(eventId);
  }

  Deconnexion() {
    this.authService.clearUser();
    this.router.navigate(['/home']);
    console.log('Déconnexion');
  }

  goToEventDetail(eventId: number) {
    this.router.navigate(['/details', eventId]);
  }
}
