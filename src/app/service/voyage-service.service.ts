
import { Injectable } from '@angular/core'; // Le service CRUD générique
import { Observable } from 'rxjs';
import { jour, ville, Voyage } from '../Models/Voyage';
import { CrudServiceService } from './crud-service.service';

@Injectable({
  providedIn: 'root',
})
export class VoyageService {
  private endpoint = 'client/voyage'; // L'endpoint spécifique pour les voyages

  constructor(private crudService: CrudServiceService) {}

  /**
   * Récupère la liste de tous les voyages.
   *
   * @return {Observable<Voyage[]>} Un observable qui émet la liste des voyages.
   */
  getVoyages(): Observable<Voyage[]> {
    return this.crudService.get(this.endpoint);
  }

  /**
   * Ajoute un nouveau voyage.
   *
   * @param {Voyage} voyage - Le voyage à ajouter.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  ajouterVoyage(voyage: Voyage): Observable<Object> {
    return this.crudService.post(this.endpoint, voyage);
  }

  /**
   * Met à jour un voyage existant.
   *
   * @param {number} id - L'ID du voyage à mettre à jour.
   * @param {Voyage} voyage - Les données mises à jour du voyage.
   * @return {Observable<Object>} Un observable qui émet le voyage mis à jour.
   */
  modifierVoyage(id: number, voyage: Voyage): Observable<Object> {
    return this.crudService.update(this.endpoint, id, voyage);
  }

  /**
   * Active ou désactive un voyage.
  //  *
  //  * @param {number} id - L'ID du voyage à activer ou désactiver.
  //  * @param {Object} body - Le corps de la requête à envoyer.
  //  * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
  //  */
  // activerVoyage(id: number, body: Object): Observable<Object> {
  //   return this.crudService.active(this.endpoint, id, body);
  // }

  /**
   * Supprime un voyage.
   *
   * @param {number} id - L'ID du voyage à supprimer.
   * @return {Observable<any>} Un observable qui émet la réponse du serveur.
   */
  supprimerVoyage(id: number): Observable<any> {
    return this.crudService.delete(this.endpoint, id);
  }

  getjour(): Observable<jour[]> {
    return this.crudService.get("jour");
  }
  getville(): Observable<ville[]> {
    return this.crudService.get("ville");
  }
}
