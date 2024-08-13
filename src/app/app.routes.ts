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
      import('./components/acceuil/acceuil.component').then(
        (m) => m.AcceuilComponent
      ),
  },
  {
    path: 'detail',
    loadComponent: () => import('./components/event-details/event-details.page').then((m) => m.EventDetailsPage),
  },

  {
    path: 'events',
    loadComponent: () =>
      import('./components/events/events.component').then(
        (m) => m.EventsComponent
      ),
  },

  {
    path: 'reservation',
    loadComponent: () =>
      import('./components/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },
  {
    path: 'paiement',
    loadComponent: () =>
      import('./components/paiement/paiement.component').then(
        (m) => m.PaiementComponent
      ),
  },
  {
    path: 'paiement-effectuer',
    loadComponent: () =>
      import('./components/paiement-effectuer/paiement-effectuer.component').then(
        (m) => m.PaiementEffectuerComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/reservation/reservation.component').then(
        (m) => m.ReservationComponent
      ),
  },
  {
    path: 'ticket-details',
    loadComponent: () =>
      import('./components/ticket-detail/ticket-detail.page').then(
        (m) => m.TicketDetailPage
      ),
  },

  // {
  //   path: 'profile',
  //   loadComponent: () =>
  //     import('./components/profile/profile.page').then(
  //       (m) => m.ProfilePage
  //     ),
  // },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'ticket-detail',
    loadComponent: () => import('./components/ticket-detail/ticket-detail.page').then( m => m.TicketDetailPage)
  },

  // {
  //   path: 'profile',
  //   loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  // },

  // { path: '**', redirectTo: 'home', pathMatch: 'full' },   {
  //   path: 'event-details',
  //   loadComponent: () => import('./event-details/event-details.page').then( m => m.EventDetailsPage)
  // },
// Redirige toutes les autres routes vers 'home'
];
