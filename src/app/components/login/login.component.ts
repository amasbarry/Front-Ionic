import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginEvent, ReqRep } from 'src/app/Models/DTO/ReqRep';
import { Utilisateur } from 'src/app/Models/Utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    RouterLink, 
    NgIf,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isPasswordVisible = false;
  Utilisateur: Utilisateur[] = [];

  @Output() loginEvent = new EventEmitter<LoginEvent>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');

    if (token) {
      // Rediriger vers le tableau de bord si déjà connecté
      this.router.navigate(['/accueil']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Inccorect, vérifier correctement tout les champs"
    }

    const loginRequest = this.loginForm.value;

    this.http
      // .post<ReqRep>('http://192.168.10.84:8080/api/auth/login', loginRequest)
      .post<ReqRep>('http://localhost:8080/api/auth/login', loginRequest)
      .subscribe((response) => {
        if (response.token) {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('Username', response.username);

          // Récupérer l'objet roleType complet

          const role = response.role;
          console.log('Token JWT:', response.token);
          console.log('Rôle utilisateur complet:', role);

          // Émettre l'événement de connexion
          this.loginEvent.emit({
            success: true,
            message: response.message,
          });
          this.router.navigate(['/accueil']);
        } else {
          console.error('Erreur de connexion:');

          this.loginEvent.emit({
            success: false,
            message: 'Erreur de connexion. Veuillez vérifier vos informations.',
          });
        }
      });
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

