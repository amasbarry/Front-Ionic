import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // For template-driven forms
import { CommonModule } from '@angular/common'; // For common Angular directives
import { IonicModule } from '@ionic/angular';  // For Ionic components
import { Router, RouterModule } from '@angular/router';  // For routing
import { AuthService } from '../service/auth.service';


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

  constructor(private authService: AuthService, private router: Router) {}

 login() {
    this.authService.authenticate(this.email, this.password).subscribe(
      (user: any) => {
        
          console.log('je suis dans login', user);
          // Redirige en fonction du rôle de l'utilisateur
          if (user) {
            console.log('je suis avant====',user.role);
  
            if (user.role.role === 'CLIENT') {
              console.log('je suis CLIENT');
              this.router.navigate(['/acceuil']);
            } else if (user.role.role === 'ADMIN') {
              this.router.navigate(['/acceuil']);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
      (error) => {
        console.error('Erreur de connexion', error);
      }
    );
  }
}
