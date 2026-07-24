
"use client";

import { useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";

import { fetchPackageById }
from "@/features/packages/services/package-detail.service";

import {
  FlightClass,
  RoomType,
  PensionType,
}
from "@/features/purchases/types/purchase-options.types";

import { calculatePrice }
from "@/features/offers/utils/calculatePrice";

import { usePurchase }
from "@/features/purchases/hooks/usePurchase";


export default function PackageDetailsPage() {

  const {

    purchase,

    loading: purchaseLoading,

  } = usePurchase();


  const params = useParams();

  const [pkg, setPkg] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [travellers, setTravellers] =
    useState(1);

  const [flightClass, setFlightClass] =
    useState<FlightClass>("Economy");

  const [roomType, setRoomType] =
    useState<RoomType>("Double");

  const [pension, setPension] =
    useState<PensionType>("BedOnly");

  useEffect(() => {

    async function load() {

      const data =
        await fetchPackageById(
          Number(params.id)
        );

      setPkg(data);

      setLoading(false);
    }

    load();

  }, [params.id]);

  const totalPrice =
    useMemo(() => {

      if (!pkg)
        return 0;

      return calculatePrice({

        packageData: pkg,

        travellers,

        flightClass,

        roomType,

        pension,

      });

    }, [

      pkg,

      travellers,

      flightClass,

      roomType,

      pension,

    ]);

  if (loading) {

    return (
      <p className="p-8">
        Chargement...
      </p>
    );

  }

  if (!pkg) {

    return (
      <p className="p-8">
        Package introuvable
      </p>
    );

  }

  
  async function handlePurchase() {

    try {

      await purchase({

        packageId: pkg.id,

        nbVoyageurs: travellers,

        classeVol: flightClass,

        typeChambre: roomType,

        pension,
      });

      alert("Réservation effectuée !");
    }

    catch (e: any) {
      alert(e.message);
    }
  }

  return (

    <div className="max-w-6xl mx-auto p-8 space-y-10">

      <div>

        <h1 className="text-4xl font-bold">
          {pkg.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {pkg.country} • {pkg.destination}
        </p>

      </div>

      {pkg.image && (

        <img
          src={pkg.image}
          alt={pkg.name}
          className="
            w-full
            max-h-[500px]
            object-cover
            rounded-xl
          "
        />

      )}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Description
        </h2>

        <p className="leading-relaxed">
          {pkg.description}
        </p>

      </div>

      <div className="space-y-4">

        <Info
          label="Date départ"
          value={
            new Date(
              pkg.departureDate
            ).toLocaleDateString()
          }
        />

        <Info
          label="Date retour"
          value={
            new Date(
              pkg.returnDate
            ).toLocaleDateString()
          }
        />

        <Info
          label="Places disponibles"
          value={String(pkg.availableSeats)}
        />

        <Info
          label="Prix de base"
          value={`${pkg.basePrice.toLocaleString()} DA`}
        />

      </div>

      {pkg.flights?.length > 0 && (

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Vol(s)
          </h2>

          <div className="space-y-4">

            {pkg.flights.map((flight: any) => (

              <div
                key={flight.id}
                className="border rounded-lg p-4"
              >

                <p className="font-semibold">
                  {flight.airline.name}
                </p>

                <p>
                  {flight.departureAirport.name}
                  {" → "}
                  {flight.arrivalAirport.name}
                </p>

                <p>
                  Vol : {flight.flightNumber}
                </p>

                <p>
                  Départ :
                  {" "}
                  {new Date(flight.departureDateTime).toLocaleDateString("fr-FR")}
                  {" "}
                  {new Date(flight.departureDateTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {pkg.hotels?.length > 0 && (

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Hôtel(s)
          </h2>

          <div className="space-y-4">

            {pkg.hotels.map((hotel: any) => (

              <div
                key={hotel.id}
                className="border rounded-lg p-4"
              >

                <p className="font-semibold">
                  {hotel.name}
                </p>

                <p>
                  {"⭐".repeat(hotel.stars)}
                </p>

                <p>
                  {hotel.city},
                  {" "}
                  {hotel.country}
                </p>

                <p>
                  {hotel.adress}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {pkg.transports?.length > 0 && (

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Transport(s)
          </h2>

          <div className="space-y-4">

            {pkg.transports.map((transport: any) => (

              <div
                key={transport.id}
                className="border rounded-lg p-4"
              >

                <p className="font-semibold">
                  {transport.company}
                </p>

                <p>
                  {transport.route}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {pkg.excursions?.length > 0 && (

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Excursion(s)
          </h2>

          <div className="space-y-4">

            {pkg.excursions.map((excursion: any) => (

              <div
                key={excursion.id}
                className="border rounded-lg p-4"
              >

                <p className="font-semibold">
                  {excursion.name}
                </p>

                <p>
                  {excursion.location}
                </p>

                <p>
                  {excursion.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Suppléments Vol
        </h2>

        <div className="space-y-2">

          <PriceRow
            label="Economy"
            value="Inclus"
            green
          />

          <PriceRow
            label="Business"
            value={`${pkg.suppBusiness} DA`}
          />

          <PriceRow
            label="First"
            value={`${pkg.suppFirst} DA`}
          />

        </div>

      </div>

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Suppléments Chambre
        </h2>

        <div className="space-y-2">

          <PriceRow label="Single" value={`${pkg.suppSingle} DA`} />
          <PriceRow label="Double" value={`${pkg.suppDouble} DA`} />
          <PriceRow label="Triple" value={`${pkg.suppTriple} DA`} />
          <PriceRow label="Quadruple" value={`${pkg.suppQuadruple} DA`} />
          <PriceRow label="Suite" value={`${pkg.suppSuite} DA`} />

        </div>

      </div>

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Suppléments Pension
        </h2>

        <div className="space-y-2">

          <PriceRow label="Bed Only" value={`${pkg.suppBedOnly} DA`} />
          <PriceRow label="Bed Breakfast" value={`${pkg.suppBedBreakfast} DA`} />
          <PriceRow label="Half Board" value={`${pkg.suppHalfBoard} DA`} />
          <PriceRow label="Full Board" value={`${pkg.suppFullBoard} DA`} />
          <PriceRow label="All Inclusive" value={`${pkg.suppAllInclusive} DA`} />

        </div>

      </div>

      <div className="border rounded-xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Réservation
        </h2>

        <div className="space-y-5">

          <div>

            <label className="block mb-2">
              Voyageurs
            </label>

            <input
              type="number"
              min={1}
              max={pkg.availableSeats}
              value={travellers}
              onChange={(e) =>
                setTravellers(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                border
                rounded
                p-2
                w-full
              "
            />

          </div>

          <div>

            <label className="block mb-2">
              Classe Vol
            </label>

            <select
              value={flightClass}
              onChange={(e) =>
                setFlightClass(
                  e.target.value as FlightClass
                )
              }
              className="border rounded p-2 w-full"
            >

              <option value="Economy">
                Economy (Inclus)
              </option>

              {pkg.suppBusiness > 0 && (

                <option value="Business">
                  Business (+{pkg.suppBusiness.toLocaleString()} DA)
                </option>

              )}

              {pkg.suppFirst > 0 && (

                <option value="First">
                  First (+{pkg.suppFirst.toLocaleString()} DA)
                </option>

              )}

            </select>

          </div>

          <div>

            <label className="block mb-2">
              Chambre
            </label>

            <select
              value={roomType}
              onChange={(e) =>
                setRoomType(
                  e.target.value as RoomType
                )
              }
              className="border rounded p-2 w-full"
            >

              {pkg.suppSingle > 0 && (

                <option value="Single">
                  Single (+{pkg.suppSingle.toLocaleString()} DA)
                </option>

              )}

              <option value="Double">
                Double
                {pkg.suppDouble > 0 &&
                  ` (+${pkg.suppDouble.toLocaleString()} DA)`}
              </option>

              {pkg.suppTriple > 0 && (

                <option value="Triple">
                  Triple (+{pkg.suppTriple.toLocaleString()} DA)
                </option>

              )}

              {pkg.suppQuadruple > 0 && (

                <option value="Quadruple">
                  Quadruple (+{pkg.suppQuadruple.toLocaleString()} DA)
                </option>

              )}

              {pkg.suppSuite > 0 && (

                <option value="Suite">
                  Suite (+{pkg.suppSuite.toLocaleString()} DA)
                </option>

              )}

            </select>

          </div>

          <div>

            <label className="block mb-2">
              Pension
            </label>

            <select
              value={pension}
              onChange={(e) =>
                setPension(
                  e.target.value as PensionType
                )
              }
              className="border rounded p-2 w-full"
            >

              <option value="BedOnly">
                Bed Only
              </option>

              {pkg.suppBedBreakfast > 0 && (

                <option value="BedBreakfast">
                  Bed & Breakfast
                  (+{pkg.suppBedBreakfast.toLocaleString()} DA)
                </option>

              )}

              {pkg.suppHalfBoard > 0 && (

                <option value="HalfBoard">
                  Half Board
                  (+{pkg.suppHalfBoard.toLocaleString()} DA)
                </option>

              )}

              {pkg.suppFullBoard > 0 && (

                <option value="FullBoard">
                  Full Board
                  (+{pkg.suppFullBoard.toLocaleString()} DA)
                </option>

              )}

              {pkg.suppAllInclusive > 0 && (

                <option value="AllInclusive">
                  All Inclusive
                  (+{pkg.suppAllInclusive.toLocaleString()} DA)
                </option>

              )}

            </select>

          </div>

          <div className="text-3xl font-bold">

            Total :

            {" "}

            {totalPrice.toLocaleString()}

            DA

          </div>

          <button

            onClick={handlePurchase}

            disabled={purchaseLoading}

            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-lg
              font-semibold
            "

          >

            {purchaseLoading

              ? "Réservation..."

              : "Réserver"}

          </button>

        </div>

      </div>

    </div>

  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div
      className="
        flex
        justify-between
        border-b
        pb-3
      "
    >

      <p className="text-gray-500">
        {label}
      </p>

      <p className="font-semibold">
        {value}
      </p>

    </div>

  );
}

function PriceRow({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {

  return (

    <div className="flex justify-between">

      <p>{label}</p>

      <p
        className={
          green
            ? "text-green-600 font-semibold"
            : "font-semibold"
        }
      >
        {value}
      </p>

    </div>

  );
}
