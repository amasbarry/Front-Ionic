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
    path: 'agence',
    loadComponent: () =>
      import('./components/agence/agence.component').then(
        (m) => m.AgenceComponent
      ),
  },

  {
    path: 'billet',
    loadComponent: () =>
      import('./components/billet/billet.component').then(
        (m) => m.BilletComponent
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
    path: 'sousagence/:id',
    loadComponent: () =>
      import('./components/agence-region/agence-region.component').then(
        (m) => m.AgenceRegionComponent
      ),
  },

  {
    path: 'calendrier/:id',
    loadComponent: () =>
      import('./components/calendrier/calendrier.component').then(
        (m) => m.CalendrierComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'inscription',
    loadComponent: () =>
      import('./components/inscription/inscription.component').then(
        (m) => m.InscriptionComponent
      ),
  },
  {
    path: 'Voyage_detail',
    loadComponent: () =>
      import('./components/voyage-detail/voyage-detail.component').then(
        (m) => m.VoyageDetailComponent
      ),
  },

  {
    path: 'billet_detail/:id',
    loadComponent: () =>
      import('./components/billet-detail/billet-detail.component').then(
        (m) => m.BilletDetailComponent
      ),
  },

  {
    path: 'notification',
    loadComponent: () =>
      import('./components/notif/notif.component').then(
        (m) => m.NotifComponent
      ),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Redirige toutes les autres routes vers 'home'
];
