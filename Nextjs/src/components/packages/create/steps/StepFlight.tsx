
"use client";

import { useState } from "react";

interface Props {
  data: any;
  setData: any;
  next: () => void;
  previous: () => void;
}

export default function StepFlight({
  data,
  setData,
  next,
  previous,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    airline: data.flight.airline ?? "",

    departureLocation: data.flight.departureLocation ?? "",

    destination: data.flight.destination ?? "",

    departureDate: data.flight.departureDate ?? "",

    departureTime: data.flight.departureTime ?? "",

    arrivalTime: data.flight.arrivalTime ?? "",

    returnDate: data.flight.returnDate ?? "",

    returnDepartureTime: data.flight.returnDepartureTime ?? "",

    returnArrivalTime: data.flight.returnArrivalTime ?? "",

    flightNumber: data.flight.flightNumber ?? "",

  });

  async function handleNext() {

    setLoading(true);

    try {

      const response = await fetch("/api/flights", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),

      });

      const createdFlight = await response.json();

      console.log(createdFlight);

      if (!response.ok) {

        alert(createdFlight.message ?? "Erreur");

        return;

      }

      setData((previousData:any)=>({

          ...previousData,

          id_vol: createdFlight.id,

          flight:{

              ...form,

          },

      }));

      next();

    } catch (error) {

      console.error(error);

      alert("Erreur création du vol");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Informations du Vol
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          placeholder="Compagnie"
          value={form.airline}
          onChange={(e)=>
            setForm({
              ...form,
              airline:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          placeholder="Numéro de vol"
          value={form.flightNumber}
          onChange={(e)=>
            setForm({
              ...form,
              flightNumber:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          placeholder="Lieu de départ"
          value={form.departureLocation}
          onChange={(e)=>
            setForm({
              ...form,
              departureLocation:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          placeholder="Destination"
          value={form.destination}
          onChange={(e)=>
            setForm({
              ...form,
              destination:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          type="date"
          value={form.departureDate}
          onChange={(e)=>
            setForm({
              ...form,
              departureDate:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={form.departureTime}
          onChange={(e)=>
            setForm({
              ...form,
              departureTime:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={form.arrivalTime}
          onChange={(e)=>
            setForm({
              ...form,
              arrivalTime:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          type="date"
          value={form.returnDate}
          onChange={(e)=>
            setForm({
              ...form,
              returnDate:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={form.returnDepartureTime}
          onChange={(e)=>
            setForm({
              ...form,
              returnDepartureTime:e.target.value
            })
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={form.returnArrivalTime}
          onChange={(e)=>
            setForm({
              ...form,
              returnArrivalTime:e.target.value
            })
          }
          className="border rounded p-2"
        />

      </div>

      <div className="flex justify-between">

        <button
          onClick={previous}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Retour
        </button>

        <button
          onClick={handleNext}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Création..." : "Continuer"}
        </button>

      </div>

    </div>

  );

}
