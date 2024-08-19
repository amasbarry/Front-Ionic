import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // For template-driven forms
import { CommonModule } from '@angular/common'; // For common Angular directives
import { IonicModule } from '@ionic/angular';  // For Ionic components
import { Router, RouterModule } from '@angular/router';  // For routing
import { AuthService } from 'src/app/service/auth.service';
import { Utilisateur } from 'src/app/models/utilisateurmodel.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule,       // Import IonicModule here
    CommonModule,      // Import CommonModule here
    FormsModule,       // Import FormsModule here
    RouterModule       // Import RouterModule here
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';
  rememberMe = true;

  constructor(private authService: AuthService,
    private router: Router) {}

  // constructor(private authService: AuthService,
  //    private router: Router) {}

  login() {
    this.authService.authenticate(this.email, this.password).subscribe(
      (user: Utilisateur| null) => {
        if (user) {
          console.log('je suis dans login', user);
          console.log('Bravo connexion réussie', this.email);
          this.authService.storeUser(user); // Stocker les informations utilisateur
          this.router.navigate(['/accueil']);
        } else {
          console.error('Utilisateur non trouvé');
        }
      },
      (error) => {
        console.error('Erreur de connexion', error);
      }
    );
  }

  getUserInfo() {
    const user = this.authService.getUser();
    console.log('User Info:', user);
  }
}