import { Agence } from './Agence';
import { Compagnie } from './Compagnie';
import { Utilisateur } from './Utilisateur';

export interface AdminAgence extends Utilisateur {
  bloquer?: false;
  agence?: Agence;
  compagnie?: Compagnie;
}
