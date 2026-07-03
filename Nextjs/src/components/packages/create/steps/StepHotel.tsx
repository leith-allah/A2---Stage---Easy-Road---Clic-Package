
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

  async function handleSubmit() {

    setLoading(true);

    try {

      // Création de l'hôtel

      const hotelResponse = await fetch("/api/hotels", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

            nom_hot:data.hotel.name,

            nb_etoiles_hot:data.hotel.stars,

            pays_hot:data.hotel.country,

            ville_hot:data.hotel.city,

            adresse_hot:data.hotel.address,

        })

      });

      if (!hotelResponse.ok)
        throw new Error("Impossible de créer l'hôtel");

      const createdHotel = await hotelResponse.json();

      console.log(createdHotel);

      // Liaison Package ↔ Hôtel

      const relationResponse = await fetch("/api/heberge", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          id_pack: data.id_pack,

          id_hot: createdHotel.id,

        }),

      });

      if (!relationResponse.ok)
        throw new Error("Impossible de lier l'hôtel au package");

      setData((previous:any)=>({

          ...previous,

          id_hot: createdHotel.id,

          hotel:{

              name:data.hotel.name,

              stars:data.hotel.stars,

              country:data.hotel.country,

              city:data.hotel.city,

              address:data.hotel.address

          }

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

        value={data.hotel.name}

        onChange={(e)=>
        setData((prev:any)=>({

            ...prev,

            hotel:{

                ...prev.hotel,

                name:e.target.value,

            }

        }))
        }

      />

      <input

        className="input input-bordered w-full"

        type="number"

        min={1}

        max={5}

        value={data.hotel.stars}

        onChange={(e)=>
        setData((prev:any)=>({

            ...prev,

            hotel:{

                ...prev.hotel,

                name:e.target.value,

            }

        }))
        }

      />

      <input

        className="input input-bordered w-full"

        placeholder="Pays"

        value={data.hotel.country}

        onChange={(e)=>
        setData((prev:any)=>({

            ...prev,

            hotel:{

                ...prev.hotel,

                name:e.target.value,

            }

        }))
        }

      />

      <input

        className="input input-bordered w-full"

        placeholder="Ville"

        value={data.hotel.city}

        onChange={(e)=>
        setData((prev:any)=>({

            ...prev,

            hotel:{

                ...prev.hotel,

                name:e.target.value,

            }

        }))
        }

      />

      <input

        className="input input-bordered w-full"

        placeholder="Adresse"

        value={data.hotel.address}

        onChange={(e)=>
        setData((prev:any)=>({

            ...prev,

            hotel:{

                ...prev.hotel,

                name:e.target.value,

            }

        }))
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
