
import type { Airline } from "@/types/airline";
import type { Airport } from "@/types/airport";

import {
    FlightStatusValue,
} from "@/server/entities/value-objects/flight-status.value-object";

import {
    FlightClass,
} from "@/server/entities/value-objects/supplements.value-object";

export interface FlightFormData {

    airline: Airline | null;

    departureAirport: Airport | null;

    arrivalAirport: Airport | null;

    status: FlightStatusValue;

    departureDateTime: string;

    arrivalDateTime: string;

    flightNumber: string;

    supplement: {

        defaultFlightClass: FlightClass;

        ECONOMY: number;

        BUSINESS: number;

        FIRST: number;

    };

}
