
"use client";

import { useState } from "react";

import { createPackage } 
from "@/features/packages/services/package.admin.service";

import { useRouter } from "next/navigation";


export default function CreatePackageForm() {

  const router = useRouter();

  const [form, setForm] = useState({

    nom_pack: "",

    pays: "",

    ville: "",

    description: "",

    prix_base: "",

    places_disponibles: "",

    date_depart: "",

    date_retour: "",

    compagnie_aerienne: "",

    numero_vol: "",

    aeroport_depart: "",

    aeroport_arrivee: "",

    hotel_nom: "",

    hotel_etoiles: "",

    pension: "",

    image_url: "",

  });

  function update(

    field: keyof typeof form,

    value: string

  ) {

    setForm({

      ...form,

      [field]: value,

    });

  }

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    try {

      await createPackage(form);

      alert("Package créé avec succès !");

      router.push("/dashboard/admin/packages");

      router.refresh();

    }

    catch (error) {

      console.error(error);

      alert("Erreur lors de la création du package.");

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >

      {/* Destination */}

      <section className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">

          Destination

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <input

            placeholder="Nom du package"

            value={form.nom_pack}

            onChange={(e)=>

              update("nom_pack",e.target.value)

            }

            className="border rounded-xl p-3"

            required

          />

          <input

            placeholder="Pays"

            value={form.pays}

            onChange={(e)=>

              update("pays",e.target.value)

            }

            className="border rounded-xl p-3"

            required

          />

          <input

            placeholder="Ville"

            value={form.ville}

            onChange={(e)=>

              update("ville",e.target.value)

            }

            className="border rounded-xl p-3"

            required

          />

        </div>

      </section>

      {/* Dates */}

      <section className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">

          Dates

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="block mb-2">

              Départ

            </label>

            <input

              type="date"

              value={form.date_depart}

              onChange={(e)=>

                update("date_depart",e.target.value)

              }

              className="border rounded-xl p-3 w-full"

              required

            />

          </div>

          <div>

            <label className="block mb-2">

              Retour

            </label>

            <input

              type="date"

              value={form.date_retour}

              onChange={(e)=>

                update("date_retour",e.target.value)

              }

              className="border rounded-xl p-3 w-full"

              required

            />

          </div>

        </div>

      </section>

      {/* Avion */}

      <section className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">

          Transport aérien

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <input

            placeholder="Compagnie"

            value={form.compagnie_aerienne}

            onChange={(e)=>

              update("compagnie_aerienne",e.target.value)

            }

            className="border rounded-xl p-3"

          />

          <input

            placeholder="Numéro de vol"

            value={form.numero_vol}

            onChange={(e)=>

              update("numero_vol",e.target.value)

            }

            className="border rounded-xl p-3"

          />

          <input

            placeholder="Aéroport départ"

            value={form.aeroport_depart}

            onChange={(e)=>

              update("aeroport_depart",e.target.value)

            }

            className="border rounded-xl p-3"

          />

          <input

            placeholder="Aéroport arrivée"

            value={form.aeroport_arrivee}

            onChange={(e)=>

              update("aeroport_arrivee",e.target.value)

            }

            className="border rounded-xl p-3"

          />

        </div>

      </section>

      {/* Hôtel */}

      <section className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">

          Hôtel

        </h2>

        <div className="grid grid-cols-3 gap-6">

          <input

            placeholder="Nom"

            value={form.hotel_nom}

            onChange={(e)=>

              update("hotel_nom",e.target.value)

            }

            className="border rounded-xl p-3"

          />

          <input

            type="number"

            placeholder="Étoiles"

            value={form.hotel_etoiles}

            onChange={(e)=>

              update("hotel_etoiles",e.target.value)

            }

            className="border rounded-xl p-3"

          />

          <select

            value={form.pension}

            onChange={(e)=>

              update("pension",e.target.value)

            }

            className="border rounded-xl p-3"

          >

            <option value="">

              Pension

            </option>

            <option>Petit déjeuner</option>

            <option>Demi-pension</option>

            <option>Pension complète</option>

            <option>All Inclusive</option>

          </select>

        </div>

      </section>

      {/* Prix */}

      <section className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">

          Tarifs

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <input

            type="number"

            placeholder="Prix"

            value={form.prix_base}

            onChange={(e)=>

              update("prix_base",e.target.value)

            }

            className="border rounded-xl p-3"

            required

          />

          <input

            type="number"

            placeholder="Places"

            value={form.places_disponibles}

            onChange={(e)=>

              update("places_disponibles",e.target.value)

            }

            className="border rounded-xl p-3"

            required

          />

        </div>

      </section>

      {/* Description */}

      <section className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">

          Description

        </h2>

        <textarea

          rows={6}

          value={form.description}

          onChange={(e)=>

            update("description",e.target.value)

          }

          className="border rounded-xl p-4 w-full"

        />

      </section>

      {/* Image */}

      <section className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">

          Image

        </h2>

        <input

          placeholder="https://..."

          value={form.image_url}

          onChange={(e)=>

            update("image_url",e.target.value)

          }

          className="border rounded-xl p-3 w-full"

        />

      </section>

      <div className="flex justify-end">

        <button

          type="submit"

          disabled={loading}

          className="

            bg-blue-600

            hover:bg-blue-700

            disabled:opacity-50

            text-white

            px-8

            py-4

            rounded-2xl

            font-semibold

          "

        >

          {

            loading

              ? "Création..."

              : "Créer le package"

          }

        </button>

      </div>

    </form>

  );

}
