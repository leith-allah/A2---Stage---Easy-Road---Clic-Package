
"use client";

import { useWizardUpdater } from "@/hooks/useWizardUpdater";


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

  function handleNext() {
    next();
  }

  const { updateItem } =
    useWizardUpdater(setData);

  return (

    <div className="space-y-6">

      <h2 className="text-xl font-bold">
        Hôtel
      </h2>

      <label>Nom</label>

      <input
        className="input input-bordered w-full"
        placeholder="Nom"
        value={data.hotels[0].name}
        onChange={(e)=>
              updateItem(
                  "hotels",
                  0,
                  "name",
                  e.target.value
              )
        }
      />

      <label>Nombre d'étoiles</label>

      <input
        className="input input-bordered w-full"
        type="number"
        min={1}
        max={7}
        value={data.hotels[0].stars}
        onChange={(e)=>
              updateItem(
                  "hotels",
                  0,
                  "stars",
                  Number(e.target.value)
              )
        }
      />

      <label>Pays</label>

      <input
        className="input input-bordered w-full"
        placeholder="Pays"
        value={data.hotels[0].country}
        onChange={(e)=>
              updateItem(
                  "hotels",
                  0,
                  "country",
                  e.target.value
              )
        }
      />

      <label>Ville</label>

      <input
        className="input input-bordered w-full"
        placeholder="Ville"
        value={data.hotels[0].city}
        onChange={(e)=>
              updateItem(
                  "hotels",
                  0,
                  "city",
                  e.target.value
              )
        }
      />

      <label>Adresse</label>

      <input
        className="input input-bordered w-full"
        placeholder="Adresse"
        value={data.hotels[0].address}
        onChange={(e)=>
              updateItem(
                  "hotels",
                  0,
                  "address",
                  e.target.value
              )
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
          onClick={handleNext}
        >
          Continuer
        </button>

      </div>

    </div>

  );

}
