import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';  // URL de votre backend

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password)
    });

    return this.http.get<any[]>(`${this.baseUrl}/gestEvent/user/Users`, { headers }).pipe(
      map(users => {
        // Trouvez l'utilisateur connecté et définissez son rôle
        const user = users.find(user => user.email === email);
        if (user) {
          this.storeUserRole(user.role.role);
          console.log('authentification', user.role.role);
        }
        return user;
      })
    );
  }

  private storeUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  public getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
