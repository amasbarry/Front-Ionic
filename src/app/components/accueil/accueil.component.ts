import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/service/auth.service';
import { Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { NgFor, NgIf } from '@angular/common';

import { EventServiceService } from 'src/app/service/event-service.service';
import { Evenement } from 'src/app/Models/Evenement';

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
  event:Evenement[]=[];

  constructor(
    private authService: AuthService,
    private eventService: EventServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser(); // Récupérer les informations de l'utilisateur
    this.eventService.getEvents().subscribe(
      (data: any) => {
        this.event = data;
        console.log("event:",data);
      },
  )}
}
