import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private baseUrl = 'http://localhost:8080';  // Changez cette URL si nécessaire
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Méthode pour authentifier l'utilisateur
  authenticate(email: string, password: string): Observable<any> {
    const authHeader = btoa(email + ':' + password); // Encode email:password en base64
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + authHeader
    });

    return this.http.get<any>(`${this.baseUrl}/gestEvent/user/Users`, { headers }).pipe(
      map(users => {
        // Trouver l'utilisateur connecté
        const user = users.find((user: any) => user.email === email);
        if (user) {
          // Stocker le token d'authentification et le rôle de l'utilisateur
          sessionStorage.setItem('authToken', authHeader);
          this.storeUserRole(user.role.role);
          console.log('Authentification réussie, rôle:', user.role.role);
        }
        return user;
      })
    );
  }

  // Méthode pour obtenir les détails de l'utilisateur connecté
  getCurrentUser(): Observable<any> {
    const authHeader = sessionStorage.getItem('authToken');
    
    if (!authHeader) {
      console.error('Aucun token d\'authentification trouvé');
      throw new Error('Aucun token d\'authentification trouvé');
    }

    const headers = new HttpHeaders({
      'Authorization': `Basic ${authHeader}`
    });

    return this.http.get<any>(`${this.baseUrl}/gestEvent/user/currentSession`, { headers });
  }

  // Méthode pour stocker le rôle de l'utilisateur dans le stockage de session
  private storeUserRole(role: string): void {
    sessionStorage.setItem('userRole', role);
    this.userRoleSubject.next(role);
  }

  // Méthode pour obtenir le rôle de l'utilisateur stocké
  public getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }

  // Méthode pour déconnecter l'utilisateur
  public logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userRole');
    this.userRoleSubject.next(null);
    console.log('Déconnecté');
  }
}
