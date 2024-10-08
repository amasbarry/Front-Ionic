import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Lieu } from '../models/utilisateurmodel.component';
// import {Lieu} from "../Modules/Lieu";

@Injectable({
  providedIn: 'root',
})
export class LieuService {

  private baseUrl =  "http://localhost:8080/gestEvent/lieu";
  // private baseUrl =  "http://localhost:8080/gestEvent/lieu";

  constructor(private http: HttpClient) { }

  getLieuById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Afficher/${id}`);
  }

  getAllLieu(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  createLieu(Lieu: object){
    return this.http.post<object>(`${this.baseUrl}/Ajouter`, Lieu);
  }

  updateLieu(id: number, Lieu: Lieu): Observable<Lieu> {
    return this.http.put<Lieu>(`${this.baseUrl}/update/{id}`, Lieu);
  }

  deleteLieu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/{id}`);
  }
}
