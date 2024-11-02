import { Time } from "@angular/common";
import { Compagnie } from "./Compagnie";
import { AdminAgence } from "./AdminAgence";
import { Agence } from "./Agence";

export interface Voyage {
  id?: number;
  ville_depart: string;
  ville_arrivee: string;
  heure: string;
  jour: string;
  nbr_place: number;
  statut?: string;
  prix: number;
  bloquer?: false;
  compagnie?:Compagnie;
  agence?: Agence;
}
export interface jour {
  id: number;
  jour: string;
}

export interface ville {
  id: number;
  ville: string;
}


