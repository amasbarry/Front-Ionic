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
    path: 'ticket',
    loadComponent: () =>
      import('./components/ticket/ticket.component').then(
        (m) => m.TicketComponent
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./components/event-details/event-details.page').then((m) => m.EventDetailsPage),
  },
  {
    path: 'notification',
    loadComponent: () => import('./components/notification/notification.page').then((m) => m.NotificationPage),
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
    path: 'politique',
    loadComponent: () =>
      import('./components/politique/politique.page').then(
        (m) => m.PolitiquePage
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.page').then(
        (m) => m.LoginPage
      ),
  },
  {
    path: 'succes',
    loadComponent: () =>
      import('./components/succes/succes.component').then(
        (m) => m.SuccesComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./components/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage
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
    path: 'modifier',
    loadComponent: () =>
      import('./components/modifier-profile/modifier-profile.component').then(
        (m) => m.ModifierProfileComponent
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
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./components/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'notification',
    loadComponent: () => import('./components/notification/notification.page').then( m => m.NotificationPage)
  },
  {
    path: 'politique',
    loadComponent: () => import('./components/politique/politique.page').then( m => m.PolitiquePage)
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
