import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompagnieService } from 'src/app/service/compagnie.service';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Compagnie } from 'src/app/Models/Compagnie';
import { Agence } from 'src/app/Models/Agence';

@Component({
  selector: 'app-agence-region',
  templateUrl: './agence-region.component.html',
  styleUrls: ['./agence-region.component.scss'],
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
export class AgenceRegionComponent implements OnInit {
  // compagnie: Compagnie[] = [];
  compagnie: number = 0;
  sousAgences: Agence[] = [];
  CompagnieName: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudServiceService
  ) {}

  ngOnInit() {
    // Récupérer l'ID de la compagnie à partir de l'URL
    this.compagnie = +this.route.snapshot.paramMap.get('id')!;
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' + this.compagnie);
    // Charger les sous-agences pour cette compagnie
    this.getAgence();
  }

  getAgence() {
    this.crudService.getAgenceComp(this.compagnie).subscribe({
      next: (data) => {
        // On récupère la liste des compagnies et on ajoute la propriété `bloquer` à chaque compagnie
        this.sousAgences = data;
        if (data.length > 0) {
          this.CompagnieName = this.sousAgences[0].compagnie?.nom; // ou une autre logique pour choisir l'agence
        }

        console.log('Compagnies récupérées avec succès :', this.compagnie);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des compagnies :', err);
      },
    });
  }
}
