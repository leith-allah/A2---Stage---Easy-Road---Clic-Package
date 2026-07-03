
"use client";

import { useState } from "react";

interface Props {
  data: any;
  setData: any;
  next: () => void;
}

export default function StepPackage({
  data,
  setData,
  next,
}: Props) {

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    try {

      console.log(data.package);

      const response = await fetch(
        "/api/packages",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            data.package
          ),

        }
      );

      if (!response.ok) {

        console.log(await response.text());

        throw new Error(
          "Erreur création package"
        );

      }

      const createdPackage =
          await response.json();

      setData((prev:any)=>({

          ...prev,

          id_pack: createdPackage.id,

          package: {

              ...prev.package,

          },

      }));

      next();

    } catch (error) {

      console.error(error);

      alert(
        "Impossible de créer le package."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <label>Nom du Package</label>

        <input

          className="w-full border rounded p-3"

          value={data.package.name ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                name: e.target.value,

              },

            }))
          }

          required

        />

      </div>

      <div>

        <label>Pays</label>

        <input

          className="w-full border rounded p-3"

          value={data.package.country ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                country: e.target.value,

              },

            }))
          }

          required

        />

      </div>

      <div>

        <label>Destination</label>

        <input

          className="w-full border rounded p-3"

          value={data.package.destination ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                destination: e.target.value,

              },

            }))
          }

          required

        />

      </div>

      <div>

        <label>Description</label>

        <textarea

          rows={4}

          className="w-full border rounded p-3"

          value={data.package.description ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                description: e.target.value,

              },

            }))
          }

        />

      </div>

      <div>

        <label>Image</label>

        <input

          className="w-full border rounded p-3"

          value={data.package.image ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                image: e.target.value,

              },

            }))
          }

        />

      </div>

      <div>

        <label>Date départ</label>

        <input

          type="date"

          className="w-full border rounded p-3"

          value={data.package.departureDate ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                departureDate: e.target.value,

              },

            }))
          }

          required

        />

      </div>

      <div>

        <label>Date retour</label>

        <input

          type="date"

          className="w-full border rounded p-3"

          value={data.package.returnDate ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                returnDate: e.target.value,

              },

            }))
          }

          required

        />

      </div>

      <div>

        <label>Prix de base</label>

        <input

          type="number"

          className="w-full border rounded p-3"

          value={data.package.basePrice ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                basePrice: Number(e.target.value),

              },

            }))
          }

          required

        />

      </div>

      <div>

        <label>Nombre de places</label>

        <input

          type="number"

          className="w-full border rounded p-3"

          value={data.package.availableSeats ?? ""}

          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,

              package: {

                ...prev.package,

                availableSeats: Number(e.target.value),

              },

            }))
          }

          required

        />

      </div>

      <div className="flex justify-end">

        <button

          type="submit"

          disabled={loading}

          className="btn btn-primary"

        >

          {

            loading

              ? "Création..."

              : "Suivant"

          }

        </button>

      </div>

    </form>

  );

}
