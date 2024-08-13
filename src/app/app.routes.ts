// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'accueil',
    loadComponent: () =>
      import('./components/accueil/accueil.component').then(
        (m) => m.AccueilComponent
      ),
  },

  {
    path: 'events',
    loadComponent: () =>
      import('./components/events/events.component').then(
        (m) => m.EventsComponent
      ),
  },

  {
    path: 'search',
    loadComponent: () =>
      import('./components/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'paiement',
    loadComponent: () => import('./paiement/paiement.page').then( m => m.PaiementPage)
  },
  {
    path: 'paiementeffectuer',
    loadComponent: () => import('./paiement-effectue/paiement-effectue.page').then( m => m.PaiementEffectuePage)
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },


// Redirige toutes les autres routes vers 'home'
];
