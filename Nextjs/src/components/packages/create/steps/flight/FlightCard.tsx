
"use client";

import FlightHeader from "./FlightHeader";
import FlightForm from "./FlightForm";
import FlightDefaultClass from "./FlightDefaultClass";
import FlightSupplements from "./FlightSupplements";

import type { Airline } from "@/types/airline";
import type { Airport } from "@/types/airport";

import type { FlightFormData } from "@/types/package/flight-form-data";
import type { FlightErrors } from "@/lib/validation/package/types";

import {

    FlightClass,

} from "@/server/entities/value-objects/supplements.value-object";

import {

    FlightStatusValue,

} from "@/server/entities/value-objects/flight-status.value-object";

interface FlightCardProps {

    index: number;

    flight: FlightFormData;

    errors: FlightErrors;

    airlines: Airline[];

    airports: Airport[];

    loadingAirlines: boolean;

    loadingAirports: boolean;

    defaultFlightClass: FlightClass;

    ECONOMYPrice: number;

    BUSINESSPrice: number;

    FIRSTPrice: number;

    onFlightChange: <
        K extends keyof FlightFormData
    >(
        field: K,
        value: FlightFormData[K]
    ) => void;

    onDefaultClassChange: (
        value: FlightClass
    ) => void;

    onEconomyPriceChange: (
        value: number
    ) => void;

    onBusinessPriceChange: (
        value: number
    ) => void;

    onFirstPriceChange: (
        value: number
    ) => void;

    onDuplicate: () => void;

    onDelete: () => void;

    canDelete: boolean;

}

export default function FlightCard({

    index,

    flight,

    errors,

    airlines,

    airports,

    loadingAirlines,

    loadingAirports,

    defaultFlightClass,

    ECONOMYPrice,

    BUSINESSPrice,

    FIRSTPrice,

    onFlightChange,

    onDefaultClassChange,

    onEconomyPriceChange,

    onBusinessPriceChange,

    onFirstPriceChange,

    onDuplicate,

    onDelete,

    canDelete,

}: FlightCardProps) {

    return (

        <div className="rounded-xl border border-gray-200 p-6 space-y-8">

          <FlightHeader

              index={index}

              canDelete={canDelete}

              onDuplicate={onDuplicate}

              onDelete={onDelete}

          />

          <FlightForm

              flight={flight}

              errors={errors}

              airlines={airlines}

              airports={airports}

              loadingAirlines={loadingAirlines}

              loadingAirports={loadingAirports}

              onFlightChange={onFlightChange}

          />

          <FlightDefaultClass

              value={defaultFlightClass}

              onChange={onDefaultClassChange}

          />

          <FlightSupplements

              ECONOMYPrice={ECONOMYPrice}

              BUSINESSPrice={BUSINESSPrice}

              FIRSTPrice={FIRSTPrice}

              onEconomyPriceChange={onEconomyPriceChange}

              onBusinessPriceChange={onBusinessPriceChange}

              onFirstPriceChange={onFirstPriceChange}

          />

      </div>

    );

}