import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  // For template-driven forms
import { CommonModule } from '@angular/common'; // For common Angular directives
import { IonicModule, AlertController } from '@ionic/angular'; 
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController  // Inject AlertController
  ) {}

  async login(form: NgForm) {
    if (form.valid) {
      this.authService.authenticate(this.email, this.password).subscribe(
        async (user: Utilisateur | null) => {
          if (user) {
            console.log('Bravo connexion réussie', this.email);
            this.authService.storeUser(user); // Stocker les informations utilisateur
            this.router.navigate(['/accueil']);
          } else {
            await this.showAlert('Erreur', 'Utilisateur non trouvé');
          }
        },
        async (error) => {
          console.error('Erreur de connexion', error);
          await this.showAlert('Erreur', 'Mot de passe ou email incorrecte');
        }
      );
    } else {
      await this.showAlert('Erreur', 'Veuillez entrer des informations valides');
    }
  }

  // Méthode pour afficher un popup d'alerte
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  getUserInfo() {
    const user = this.authService.getUser();
    console.log('User Info:', user);
  }
}