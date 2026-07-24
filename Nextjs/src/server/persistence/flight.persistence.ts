
import { AirlinePersistence } from "./airline.persistence";
import { AirportPersistence } from "./airport.persistence";

export interface FlightPersistence {

  id_vol: bigint;

  statut_vol: string;

  num_vol: string;

  depart_vol: Date;

  arrivee_vol: Date;

  id_aeroport_depart: number;

  id_aeroport_arrivee: number;

  id_compagnie: number;

  compagnie_aerienne: AirlinePersistence;

  aeroport_vol_id_aeroport_departToaeroport: AirportPersistence;

  aeroport_vol_id_aeroport_arriveeToaeroport: AirportPersistence;

}
