import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
  
} from '@angular/forms';
import { VoyageService } from 'src/app/service/voyage-service.service';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Voyage } from 'src/app/Models/Voyage';
import { Reservation } from 'src/app/Models/Reservation';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
  standalone: true,
  imports: [
    // IonLabel,
    // IonItem,
    NavbarComponent,
    HeaderComponent,
    RouterLink,
    RouterOutlet,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    // IonicModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendrierComponent implements OnInit {
  lundi = true;
  mardi = false;
  mercredi = false;
  jeudi = false;
  vendredi = false;
  samedi = false;
  dimanche = false;

  currentStep: number = 1;
  erreur: String | null = null;
  erreurNum: String | null = null;
  Compagnie: String | undefined = undefined;
  region: String | undefined = undefined;

  Aujourdhui = 'Lundi';
  add = false;

  non = false;
  succes = false;

  voyageId: number = 0;
  voyages: Voyage[] = [];
  allVoyages: Voyage[] = []; // Pour stocker tous les voyages
  ReservationVoyage: Voyage[] = [];
  VoyageId?: number | null = null;
  token: string | null = null;
  ReservForm!: FormGroup;

  datesDisponibles: string[] = [];

  jour = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  VoyageJour: string | null = null;
  constructor(
    private voyageService: VoyageService,
    private route: ActivatedRoute,
    private form: FormBuilder,
    private crudService: CrudServiceService,
    private location: Location,
    private router: Router
  ) {
    // this.updateDate();
    this.ReservForm = this.form.group({
      DateVoyage: ['', [Validators.required]],
      numPayement: [
        ,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  goToNextStep() {
    const dateVoyageControl = this.ReservForm.get('DateVoyage');

    // Vérifie si le champ DateVoyage est valide
    if (dateVoyageControl?.valid) {
      this.currentStep++;
      this.erreur = null;
      this.erreurNum = null;
    } else {
      this.erreur = 'La date sélectionnée doit correspondre au jour du voyage';
      dateVoyageControl?.markAsTouched(); // Marque le champ comme touché pour afficher les erreurs
    }

    // if (this.currentStep === 1) {
    //   this.currentStep++;
    //   this.erreur = '';
    // } else {
    //   this.erreur = 'Remplissez les champs';
    // }
  }

  // Revenir à l'étape précédente
  goToPreviousStep() {
    this.erreur = '';
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  cacher() {
    this.add = false;
    this.ReservForm.reset();
    // this.succes = false;
    // this.non = false;
    this.erreur = null;
    this.hidePayement();
    this.currentStep = 1;
  }
  // show(voyage: Voyage) {
  //   if (this.token == null) {
  //     this.router.navigate(['/login']);
  //   }

  //   this.VoyageId = voyage.id; // Stockez l'ID du voyage pour la réservation
  //   this.VoyageJour = voyage.jour;
  //   this.add = true;

  //   this.ReservForm.get('DateVoyage')?.setValidators([
  //     Validators.required,
  //     this.validateDate(this.VoyageJour),
  //   ]);
  //   this.ReservForm.get('DateVoyage')?.updateValueAndValidity();
  // }

  show(voyage: Voyage) {
    if (this.token == null) {
      this.router.navigate(['/login']);
    }

    this.VoyageId = voyage.id;
    this.VoyageJour = voyage.jour;
    this.generateDates();
    this.add = true;
  }

  generateDates() {
    if (this.VoyageJour) {
      const dayIndex = this.jour.indexOf(this.VoyageJour);
      const today = new Date();
      this.datesDisponibles = [];

      for (let i = 0; i < 10; i++) {
        // Génère les 10 prochaines dates correspondant à VoyageJour
        const date = new Date(today);
        date.setDate(
          today.getDate() + ((7 + dayIndex - today.getDay()) % 7) + i * 7
        );
        this.datesDisponibles.push(date.toISOString().slice(0, 10)); // Format YYYY-MM-DD
      }
    }
  }

  ngOnInit() {
    this.voyageId = +this.route.snapshot.paramMap.get('id')!;
    this.getVoyage();
    this.token = localStorage.getItem('jwt');
  }

  // validateDate(voyageJour: string | null): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const dateValue = control.value;
  //     if (dateValue && voyageJour) {
  //       const selectedDay = new Date(dateValue).getDay();
  //       const expectedDay = this.jour.indexOf(voyageJour);
  //       return selectedDay === expectedDay ? null : { invalidDay: true };
  //     }
  //     return null;
  //   };
  // }

  Reservation() {
    if ((this.currentStep != 2, this.VoyageId)) {
      const reservation: Reservation = {
        numeropayement: this.ReservForm.get('numPayement')?.value,
        date: this.ReservForm.get('DateVoyage')?.value,
        voyage: { id: this.VoyageId } as Voyage,
        // date: this.currentDate, // Assurez-vous que vous passez l'ID du voyage
      };

      // Appel au service pour envoyer la réservation au backend
      if (this.ReservForm.get('numPayement')?.valid) {
        this.crudService.Reserver(reservation).subscribe({
          next: (res) => {
            this.ReservForm.reset();
            // console.log('Vous avez daeja reserver', res);
            this.succes = true;
          },
          error: (err) => {
            console.error('Erreur lors de la réservation :', err);
          },
        });
      } else {
        this.erreurNum = 'Numéro incorrect';
      }
    } else {
      this.erreur = 'formulaire invalide';
    }
  }

  hidePayement() {
    this.add = false;
    this.non = false;
    this.succes = false;
    // this.router.navigate(['/billet']);
    this.ReservForm.reset();
  }

  getVoyage() {
    // Récupérer tous les voyages
    this.crudService.getVoyageAgence(this.voyageId).subscribe({
      next: (data) => {
        this.allVoyages = data;
        // Stocker tous les voyages récupérés
        // if (data.length > 0) {
          this.Compagnie = this.allVoyages[0].compagnie?.nom; 
          this.region = this.allVoyages[0].agence?.region;
          console.error('bbbbbbbbbbbbbbbbbbbbb'+ this.Compagnie);
          console.error('bbbbbbbbbbbbbbbbbbbbb'+ this.region);
        // }
        this.filterVoyagesByDay();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages :', err);
      },
    });
  }

  filterVoyagesByDay() {
    this.voyages = []; // Réinitialiser le tableau des voyages filtrés

    // Vérifier chaque boolean et filtrer les voyages correspondants
    if (this.lundi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Lundi'));
    }
    if (this.mardi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Mardi'));
    }
    if (this.mercredi) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Mercredi')
      );
    }
    if (this.jeudi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Jeudi'));
    }
    if (this.vendredi) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Vendredi')
      );
    }
    if (this.samedi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Samedi'));
      console.log('Voyages après filtrage :', this.voyages);
    }
    if (this.dimanche) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Dimanche')
      );
      console.log('Voyages après filtrage :', this.voyages);
    }

    console.log('Voyages filtrés :', this.voyages);
  }

  // goToNextStep() {
  //   if (this.currentStep === 1) {
  //     this.currentStep++;
  //     this.erreur = '';
  //   } else {
  //     this.erreur = 'Remplissez les champs';
  //   }
  // }

  // // Revenir à l'étape précédente
  // goToPreviousStep() {
  //   this.erreur = '';
  //   if (this.currentStep > 1) {
  //     this.currentStep--;
  //   }
  // }

  Lundi() {
    this.lundi = true;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'lundi';

    this.filterVoyagesByDay();
  }
  Mardi() {
    this.lundi = false;
    this.mardi = true;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'mardi';

    this.filterVoyagesByDay();
  }
  Mercredi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = true;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'mercredi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Jeudi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = true;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'jeudi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Vendredi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = true;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'vendredi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Samedi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = true;
    this.dimanche = false;

    this.Aujourdhui = 'samedi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Dimanche() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = true;

    this.Aujourdhui = 'dimanche';

    // this.filterVoyagesByDay();
    this.getVoyage();
  }

  goBack() {
    this.location.back();
  }
}

/*

import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import {
  ActivatedRoute,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoyageService } from 'src/app/service/voyage-service.service';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Voyage } from 'src/app/Models/Voyage';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    RouterLink,
    RouterOutlet,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
})
export class CalendrierComponent implements OnInit {
  lundi = true;
  mardi = false;
  mercredi = false;
  jeudi = false;
  vendredi = false;
  samedi = false;
  dimanche = false;

  Aujourdhui = 'Lundi';

  voyageId: number = 0;
  voyages: Voyage[] = [];
  allVoyages: Voyage[] = []; // Pour stocker tous les voyages

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudServiceService,
    private location: Location
  ) {}

  ngOnInit() {
    this.voyageId = +this.route.snapshot.paramMap.get('id')!;
    this.getVoyage();
  }

  getVoyage() {
    // Récupérer tous les voyages
    this.crudService.getVoyageAgence(this.voyageId).subscribe({
      next: (data) => {
        this.allVoyages = data; // Stocker tous les voyages récupérés
        this.filterVoyagesByDay();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages :', err);
      },
    });
  }

  filterVoyagesByDay() {
    this.voyages = []; // Réinitialiser le tableau des voyages filtrés

    // Vérifier chaque boolean et filtrer les voyages correspondants
    if (this.lundi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Lundi'));
    }
    if (this.mardi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Mardi'));
    }
    if (this.mercredi) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Mercredi')
      );
    }
    if (this.jeudi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Jeudi'));
    }
    if (this.vendredi) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Vendredi')
      );
    }
    if (this.samedi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Samedi'));
      console.log('Voyages après filtrage :', this.voyages);
    }
    if (this.dimanche) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Dimanche')
      );
      console.log('Voyages après filtrage :', this.voyages);
    }

    console.log('Voyages filtrés :', this.voyages);
  }

  Lundi() {
    this.lundi = true;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'lundi';

    this.filterVoyagesByDay();
  }
  Mardi() {
    this.lundi = false;
    this.mardi = true;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'mardi';

    this.filterVoyagesByDay();
  }
  Mercredi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = true;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'mercredi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Jeudi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = true;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'jeudi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Vendredi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = true;
    this.samedi = false;
    this.dimanche = false;

    this.Aujourdhui = 'vendredi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Samedi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = true;
    this.dimanche = false;

    this.Aujourdhui = 'samedi';

    this.filterVoyagesByDay();
    // this.getVoyage();
  }
  Dimanche() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = true;

    this.Aujourdhui = 'dimanche';

    // this.filterVoyagesByDay();
    this.getVoyage();
  }

  goBack() {
    this.location.back();
  }
}

*/
