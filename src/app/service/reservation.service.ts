import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080/gestEvent/reservation';

  constructor() { }

  /*CancelReservation(id: number): Observable<any> {
    const url = `${this.baseUrl}/AnnulerReservation?id=${id}`;
    return this.http.patch(url, {});
  }*/



}
