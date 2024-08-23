import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8080/gestEvent/notif';

  constructor(private http: HttpClient) {}

  getAllNotif(id:any): Observable<{ id: number; message: string | null; dateEnvoi: string | null }[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Afficher/${id}`).pipe(
      map(notifications => notifications.map(notification => ({
        id: notification.id,
        message: notification.message,
        dateEnvoi: notification.dateEnvoi
      })))
    );
  }
}
