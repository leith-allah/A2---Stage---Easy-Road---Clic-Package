
import { CityPersistence } from "./city.persistence";

export interface AirportPersistence {

  id_aeroport: number;

  code_iata_aeroport: string;

  code_icao_aeroport: string;

  nom_aeroport: string;

  latitude_aeroport: number;

  longitude_aeroport: number;

  ville: CityPersistence;

}
