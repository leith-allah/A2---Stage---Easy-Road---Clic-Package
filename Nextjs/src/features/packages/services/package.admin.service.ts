
export type CreatePackageRequest = {

  nom_pack: string;

  pays: string;

  ville: string;

  description: string;

  prix_base: string;

  places_disponibles: string;

  date_depart: string;

  date_retour: string;

  compagnie_aerienne: string;

  numero_vol: string;

  aeroport_depart: string;

  aeroport_arrivee: string;

  hotel_nom: string;

  hotel_etoiles: string;

  pension: string;

  image_url: string;

};

export async function createPackage(

  data: CreatePackageRequest

) {

  const res = await fetch(

    "/api/admin/packages",

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(data),

    }

  );

  if (!res.ok) {

    throw new Error(

      "Impossible de créer le package"

    );

  }

  return res.json();

}
