import { Routes } from '@angular/router';

import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { LoginPage } from './login/login.page';
import { AcceuilComponent } from './acceuil/acceuil.component';

export const routes: Routes = [
  {path:"", component: LoginPage },
  {path:"register", component:UtilisateurComponent },
  {path:"acceuil", component:AcceuilComponent },
];
