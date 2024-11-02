import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderComponent } from "../header/header.component";
import { Router, RouterLink } from '@angular/router';
import { VoyageService } from 'src/app/service/voyage-service.service';
import { ville, Voyage } from 'src/app/Models/Voyage';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reservation } from 'src/app/Models/Reservation';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { CompagnieService } from 'src/app/service/compagnie.service';
import { Compagnie } from 'src/app/Models/Compagnie';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    RouterLink,
    NgIf,
    NgFor,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AccueilComponent implements OnInit {
  currentDate!: Date;
  today!: string;
  day!: number;
  month!: string;
  year!: number;
  voyages: Voyage[] = [];
  non = false;
  succes = false;

  Message: number | null = null;

  ReservationVoyage: Voyage[] = [];
  VoyageId?: number | null = null;
  payemant = false;
  ReservForm!: FormGroup;
  token: string | null = null;
  Erreur: string | null = null;

  compagnie: Compagnie[] = [];
  villes: ville[] = [];
  filteredVoyages: Voyage[] = [];
  filterForm!: FormGroup;

  constructor(
    private voyageService: VoyageService,
    private formbuilder: FormBuilder,
    private crudeService: CrudServiceService,
    private router: Router,
    private comagnieservice: CompagnieService
  ) {
    this.updateDate();
    this.ReservForm = this.formbuilder.group({
      numPayement: [
        ,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });

    // this.filterForm = this.formbuilder.group({
    //   depart: [''],
    //   arrivee: [''],
    //   agence: [''],
    // });
  }

  ngOnInit(): void {
    this.getVoyages();
    this.token = localStorage.getItem('jwt');
    this.getCompagnie();
    this.getville();

    // Initialisation du formulaire de filtre
    this.filterForm = this.formbuilder.group({
      depart: [''],
      arrivee: [''],
      agence: [''],
    });

    // Détecter les changements dans les champs de filtre
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  Rafraichir(){
    this.filterForm.reset({
      depart: '',
      arrivee: '',
      agence: '',
    });
  }

  applyFilters(): void {
    const { depart, arrivee, agence } = this.filterForm.value;

    // Filtrage des voyages en fonction des sélections
    this.filteredVoyages = this.voyages.filter((voyage) => {
      return (
        (!depart || voyage.ville_depart === depart) &&
        (!arrivee || voyage.ville_arrivee === arrivee) &&
        (!agence || voyage.compagnie?.nom === agence)
      );
    });
  }

  getVoyages(): void {
    this.voyageService.getVoyages().subscribe({
      next: (data) => {
        this.voyages = data.map((voyage: any) => {
          return {
            ...voyage,
            bloquer: voyage.statut === 'Bloque',
          };
        });
        this.filteredVoyages = [...this.voyages]; // Initialement, tous les voyages
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages : ', err);
      },
    });
  }

  ReserverVoyage(voyage: Voyage) {
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
    this.VoyageId = voyage.id; // Stockez l'ID du voyage pour la réservation
    this.payemant = true;
  }

  Reserver() {
    if (this.ReservForm.valid && this.VoyageId) {
      const reservation: Reservation = {
        numeropayement: this.ReservForm.get('numPayement')?.value,
        voyage: { id: this.VoyageId } as Voyage,
        date: this.currentDate, // Assurez-vous que vous passez l'ID du voyage
      };

      // Appel au service pour envoyer la réservation au backend
      this.crudeService.Reserver(reservation).subscribe({
        next: (res) => {
          // this.Message = res;
          // if (res === 200) {
          this.payemant = false;
          this.succes = true;
          this.ReservForm.reset();
          console.log('Vous avez daeja reserver', res);
          // }

          // console.log('Réservation effectuée avec succès !', res);

          this.getVoyages(); // Actualise la liste des voyages après la réservation
          // this.hidePayement(); // Cache la section paiement
          this.ReservForm.reset(); // Réinitialise le formulaire
          this.Erreur = null;
        },
        error: (err) => {
          this.non = true;
          this.Erreur = null;
          console.error('Erreur lors de la réservation :', err);
        },
      });
    } else {
      this.Erreur = 'Numéro incorrect';
    }
  }

  updateDate() {
    this.currentDate = new Date();
    this.today = this.jour[this.currentDate.getDay()]; // Récupère le jour
    this.day = this.currentDate.getDate(); // Récupère le jour
    this.month = this.mois[this.currentDate.getMonth() + 1]; // Récupère le mois (0-indexé donc +1)
    this.year = this.currentDate.getFullYear(); // Récupère l'année
  }

  // ngOnInit() {}

  getCompagnie() {
    this.comagnieservice.getCompagnie().subscribe({
      next: (data) => {
        // On récupère la liste des compagnies et on ajoute la propriété `bloquer` à chaque compagnie
        this.compagnie = data.map((compagnie: any) => {
          return {
            ...compagnie,
            bloquer: compagnie.statut === 'Bloque', // Si le statut est 'Bloqué', on définit bloquer à true
          };
        });

        console.log('Compagnies récupérées avec succès :', this.compagnie);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des compagnies :', err);
      },
    });
  }

  getville(): void {
    this.voyageService.getville().subscribe({
      next: (data) => {
        console.log(data);
        this.villes = data; // Met à jour la liste des voyages
      },
    });
  }

  jour: string[] = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];

  mois: string[] = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Aoû',
    'Sep',
    'Oct',
    'Nov',
    'Déc',
  ];

  hidePayement() {
    this.payemant = false;
    this.non = false;
    this.succes = false;
    this.ReservForm.reset();
    this.Erreur = null;
  }
  ShowPayement() {
    this.payemant = true;
  }
}
