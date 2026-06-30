
"use client";

import { useState } from "react";

interface Props {
  data: any;
  setData: any;
  next: () => void;
  previous: () => void;
}

export default function StepHotel({
  data,
  setData,
  next,
  previous,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [hotel, setHotel] = useState({

    nom_hot: "",

    nb_etoiles_hot: 3,

    pays_hot: "",

    ville_hot: "",

    adresse_hot: "",

  });

  async function handleSubmit() {

    setLoading(true);

    try {

      // Création de l'hôtel

      const hotelResponse = await fetch("/api/hotels", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify(hotel),

      });

      if (!hotelResponse.ok)
        throw new Error("Impossible de créer l'hôtel");

      const createdHotel = await hotelResponse.json();

      // Liaison Package ↔ Hôtel

      const relationResponse = await fetch("/api/heberge", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          id_pack: data.id_pack,

          id_hot: createdHotel.id_hot,

        }),

      });

      if (!relationResponse.ok)
        throw new Error("Impossible de lier l'hôtel au package");

      setData((previous: any) => ({

        ...previous,

        id_hot: createdHotel.id_hot,

        hotel,

      }));

      next();

    } catch (error) {

      console.error(error);

      alert("Erreur lors de la création de l'hôtel");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="space-y-6">

      <h2 className="text-xl font-bold">

        Hôtel

      </h2>

      <input

        className="input input-bordered w-full"

        placeholder="Nom"

        value={hotel.nom_hot}

        onChange={(e) =>

          setHotel({

            ...hotel,

            nom_hot: e.target.value,

          })

        }

      />

      <input

        className="input input-bordered w-full"

        type="number"

        min={1}

        max={5}

        value={hotel.nb_etoiles_hot}

        onChange={(e) =>

          setHotel({

            ...hotel,

            nb_etoiles_hot: Number(e.target.value),

          })

        }

      />

      <input

        className="input input-bordered w-full"

        placeholder="Pays"

        value={hotel.pays_hot}

        onChange={(e) =>

          setHotel({

            ...hotel,

            pays_hot: e.target.value,

          })

        }

      />

      <input

        className="input input-bordered w-full"

        placeholder="Ville"

        value={hotel.ville_hot}

        onChange={(e) =>

          setHotel({

            ...hotel,

            ville_hot: e.target.value,

          })

        }

      />

      <input

        className="input input-bordered w-full"

        placeholder="Adresse"

        value={hotel.adresse_hot}

        onChange={(e) =>

          setHotel({

            ...hotel,

            adresse_hot: e.target.value,

          })

        }

      />

      <div className="flex justify-between">

        <button

          className="btn"

          onClick={previous}

        >

          Retour

        </button>

        <button

          className="btn btn-primary"

          disabled={loading}

          onClick={handleSubmit}

        >

          {loading ? "Création..." : "Continuer"}

        </button>

      </div>

    </div>

  );

}
