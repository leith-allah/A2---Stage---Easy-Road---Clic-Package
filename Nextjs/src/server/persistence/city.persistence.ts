
export interface CityPersistence {

  id_ville: number;

  code_iata_ville: string | null;

  nom_ville: string;

  latitude_ville: number;

  longitude_ville: number;

  fuseau_horaire_ville: string;

  pays: {

    nom_pays: string;

  };

}
