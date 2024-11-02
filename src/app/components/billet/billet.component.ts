import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Reservation } from 'src/app/Models/Reservation';

@Component({
  selector: 'app-billet',
  templateUrl: './billet.component.html',
  styleUrls: ['./billet.component.scss'],
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
export class BilletComponent implements OnInit {
 reservation : Reservation[] = [];

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudServiceService
  ) {}

  ngOnInit() {
    this.getReservation();
  }

  getReservation() {
    // Récupérer tous les voyages
    this.crudService.getReservation().subscribe({
      next: (data) => {
        this.reservation = data; // Stocker tous les voyages récupérés
        // this.filterVoyagesByDay();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages :', err);
      },
    });
  }
}
