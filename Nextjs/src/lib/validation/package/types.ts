
import type { PackageFormData } from "@/types/package/package-form-data";
import type { FlightFormData } from "@/types/package/flight-form-data";
import type { HotelFormData } from "@/types/package/hotel-form-data";
import type { TransportFormData } from "@/types/package/transport-form-data";
import type { ExcursionFormData } from "@/types/package/excursion-form-data";

/* =======================================================
   Package
======================================================= */

export interface PackageErrors {

    step?: string;

    name?: string;

    country?: string;

    destination?: string;

    image?: string;

    description?: string;

    departureDate?: string;

    returnDate?: string;

    totalStock?: string;

    basePrice?: string;

}

/* =======================================================
   Flight
======================================================= */

export interface FlightErrors {

    step?: string;

    airline?: string;

    departureAirport?: string;

    arrivalAirport?: string;

    departureDateTime?: string;

    arrivalDateTime?: string;

    flightNumber?: string;

    status?: string;

    supplement?: {

        defaultFlightClass?: string;

        ECONOMY?: string;

        BUSINESS?: string;

        FIRST?: string;

    };

}

/* =======================================================
   Hotel
======================================================= */

export interface HotelErrors {

    step?: string;

    name?: string;

    country?: string;

    city?: string;

    address?: string;

    stars?: string;

}

/* =======================================================
   Transport
======================================================= */

export interface TransportErrors {

    step?: string;

    route?: string;

    company?: string;

}

/* =======================================================
   Excursion
======================================================= */

export interface ExcursionErrors {

    step?: string;

    name?: string;

    location?: string;

    description?: string;

}

/* =======================================================
   Wizard
======================================================= */

export interface WizardErrors {

    package: PackageErrors;

    flights: FlightErrors[];

    hotels: HotelErrors[];

    transports: TransportErrors[];

    excursions: ExcursionErrors[];

    /*
        Erreurs concernant
        l'ensemble du package.
    */

    global: string[];

}

/* =======================================================
   Validator
======================================================= */

export interface Validator<TData, TErrors> {

    (
        data: TData,
    ): TErrors;

}

/* =======================================================
   Types réutilisables
======================================================= */

export type PackageValidator =
    Validator<
        PackageFormData,
        PackageErrors
    >;

export type FlightValidator =
    Validator<
        FlightFormData,
        FlightErrors
    >;

export type HotelValidator =
    Validator<
        HotelFormData,
        HotelErrors
    >;

export type TransportValidator =
    Validator<
        TransportFormData,
        TransportErrors
    >;

export type ExcursionValidator =
    Validator<
        ExcursionFormData,
        ExcursionErrors
    >;
