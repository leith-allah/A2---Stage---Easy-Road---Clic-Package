
import type { FlightFormData } from "./flight-form-data";
import type { HotelFormData } from "./hotel-form-data";
import type { TransportFormData } from "./transport-form-data";
import type { ExcursionFormData } from "./excursion-form-data";

import {
    FlightStatusValue,
} from "@/server/entities/value-objects/flight-status.value-object";

import {
    FlightClass,
} from "@/server/entities/value-objects/supplements.value-object";


export function createEmptyFlight(): FlightFormData {

    return {

        airline: null,

        departureAirport: null,

        arrivalAirport: null,

        status: FlightStatusValue.ACTIVE,

        departureDateTime: "",

        arrivalDateTime: "",

        flightNumber: "",

        supplement: {

            defaultFlightClass: "ECONOMY",

            ECONOMY: 0,

            BUSINESS: 0,

            FIRST: 0,

        },

    };

}

export function createEmptyHotel(): HotelFormData {

    return {

        name: "",

        country: "",

        city: "",

        address: "",

        stars: 0,

    };

}

export function createEmptyTransport(): TransportFormData {

    return {

        route: "",

        company: "",

    };

}

export function createEmptyExcursion(): ExcursionFormData {

    return {

        name: "",

        location: "",

        description: "",

    };

}
