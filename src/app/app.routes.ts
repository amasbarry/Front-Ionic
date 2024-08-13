import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.page').then((m) => m.LoginPage),
  },
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
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./components/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage
      ),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
