import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Utilisateur } from '../models/utilisateurmodel.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/gestEvent/user';  // URL de votre backend

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string): Observable<Utilisateur | null> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password)
    });
  
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/Users`, { headers }).pipe(
      map(users => {
        console.log('Réponse API:', users);  // Affiche la réponse de l'API pour débogage
        const user = users.find(user => user.email === email) || null;
        if (user) {
          this.storeUser(user);
          console.log('authentification', user.nom);
        }
        return user;
      })
    );
  }
  getAuthToken(): string | null {
    const authToken = localStorage.getItem('authToken');
    return authToken ? authToken : null;
  }

  storeUser(user: Utilisateur): void {
    localStorage.setItem('InfoUser', JSON.stringify(user));
    console.log('Utilisateur stocké:', user);  // Affiche l'utilisateur stocké
  }
  
  getUser(): Utilisateur | null {
    const userJson = localStorage.getItem('InfoUser');
    console.log('Utilisateur récupéré du localStorage:', userJson);  // Affiche les données récupérées
    return userJson ? JSON.parse(userJson) : null;
  }
  
    // Méthode pour mettre à jour l'utilisateur dans localStorage
    updateStoredUser(updatedUser: Utilisateur): void {
      this.storeUser(updatedUser);
      console.log('Utilisateur mis à jour dans localStorage:', updatedUser);
    }

  clearUser(): void {
    localStorage.removeItem('InfoUser');
  }
}
