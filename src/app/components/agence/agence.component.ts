import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompagnieService } from 'src/app/service/compagnie.service';
import { Compagnie } from 'src/app/Models/Compagnie';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    RouterOutlet,
    RouterLink,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
})
export class AgenceComponent implements OnInit {
  compagnie: Compagnie[] = [];
  constructor(private comagnieservice: CompagnieService) {}

  ngOnInit() {
    this.getCompagnie();
  }

  // Méthode pour récupérer la liste des admins (fonction à implémenter selon ta logique)
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
}
