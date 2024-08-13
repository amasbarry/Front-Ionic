// src/app/app.routes.ts
import { Routes } from '@angular/router';
import {Component} from "@angular/core";
import {PaiementEffectuerComponent} from "./components/paiement-effectuer/paiement-effectuer.component";
import {PaiementComponent} from "./components/paiement/paiement.component";

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
    loadComponent: () =>
      import('./components/paiement/paiement.component').then(
        (m) => m.PaiementComponent
      ),
  },
  {
    path: 'paiementeffectuer',
    loadComponent: () =>
      import('./components/paiement-effectuer/paiement-effectuer.component').then(
        (m) => m.PaiementEffectuerComponent
      ),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },




// Redirige toutes les autres routes vers 'home'
];
