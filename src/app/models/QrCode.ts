

export interface QrCode {
  id: number;
  nom: string;
  adresse: string;
  salle:number;
  capacite: number;
}

export class Lieu {
  id: number;
  nom: string;
  adresse: string;
  salle:number;
  capacite: number;

  constructor(id: number, nom: string,adresse: string,salle: number, capacite: number) {
    this.id = id;
    this.nom = nom;
    this.adresse = adresse;
    this.salle = salle;
    this.capacite = capacite;
  }
}
