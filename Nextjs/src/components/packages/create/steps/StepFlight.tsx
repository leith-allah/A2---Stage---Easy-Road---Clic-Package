
"use client";

import { useWizardUpdater } from "@/hooks/useWizardUpdater";


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

  function handleNext() {
    next();
  }

  const { updateItem } =
    useWizardUpdater(setData);

  return (

    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Informations du Vol
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
            placeholder="Compagnie"
            value={data.flights[0].airline}
            onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "airline",
                    e.target.value
                )
            }
            className="border rounded p-2"
        />

        <input
            placeholder="Numéro de vol"
            value={data.flights[0].flightNumber}
            onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "flightNumber",
                    e.target.value
                )
            }
            className="border rounded p-2"
        />

        <input
          placeholder="Lieu de départ"
          value={data.flights[0].departureLocation}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "departureLocation",
                    e.target.value
                )
          }
          className="border rounded p-2"
        />

        <input
          placeholder="Destination"
          value={data.flights[0].destination}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "destination",
                    e.target.value
                )
          }
          className="border rounded p-2"
        />

        <input
          type="date"
          value={data.flights[0].departureDate}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "departureDate",
                    e.target.value
                )
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={data.flights[0].departureTime}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "departureTime",
                    e.target.value
                )
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={data.flights[0].arrivalTime}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "arrivalTime",
                    e.target.value
                )
          }
          className="border rounded p-2"
        />

        <input
          type="date"
          value={data.flights[0].returnDate}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "returnDate",
                    e.target.value
                )
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={data.flights[0].returnDepartureTime}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "returnDepartureTime",
                    e.target.value
                )
          }
          className="border rounded p-2"
        />

        <input
          type="time"
          value={data.flights[0].returnArrivalTime}
          onChange={(e)=>
                updateItem(
                    "flights",
                    0,
                    "returnArrivalTime",
                    e.target.value
                )
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
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Continuer
        </button>

      </div>

    </div>

  );

}
