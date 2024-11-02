import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Client } from 'src/app/Models/Client';
import { NgIf } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [NavbarComponent, NgIf],
})
export class ProfileComponent implements OnInit {
  client: Client | null = null;
  Username: string = '';

  constructor(
    private router: Router,
    private crudService: CrudServiceService,
    private location: Location,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    if (token == null || this.Username == null) {
      this.router.navigate(['/login']);
    }
    this.GetCurrentUser();
  }

  GetCurrentUser() {
    this.crudService.getCurrentUser().subscribe((data) => {
      this.client = data;
    });
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    // Empêcher la mise en cache de la page
    this.location.replaceState('/login');
    // Rediriger vers la page de login en remplaçant l'URL dans l'historique
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
