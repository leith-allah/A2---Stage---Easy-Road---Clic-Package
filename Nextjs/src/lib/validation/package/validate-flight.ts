
import { FlightErrors } from "./types";

import { FlightFormData } from "@/types/package/flight-form-data";

export function validateFlight(

    flight: FlightFormData,

): FlightErrors {

    const errors: FlightErrors = {};

    /*
    =====================================================
    Vol complètement vide
    =====================================================
    */

    const isEmpty =

        !flight.airline &&
        !flight.departureAirport &&
        !flight.arrivalAirport &&
        !flight.flightNumber.trim() &&
        !flight.departureDateTime &&
        !flight.arrivalDateTime;

    if (

        isEmpty

    ) {

        return {};

    }

    /*
    =====================================================
    Compagnie
    =====================================================
    */

    if (

        !flight.airline

    ) {

        errors.airline =
            "Veuillez sélectionner une compagnie aérienne.";

    }

    /*
    =====================================================
    Départ
    =====================================================
    */

    if (

        !flight.departureAirport

    ) {

        errors.departureAirport =
            "Veuillez sélectionner un aéroport de départ.";

    }

    /*
    =====================================================
    Arrivée
    =====================================================
    */

    if (

        !flight.arrivalAirport

    ) {

        errors.arrivalAirport =
            "Veuillez sélectionner un aéroport d'arrivée.";

    }

    /*
    =====================================================
    Numéro
    =====================================================
    */

    if (

        !flight.flightNumber.trim()

    ) {

        errors.flightNumber =
            "Le numéro de vol est obligatoire.";

    }

    /*
    =====================================================
    Dates
    =====================================================
    */

    if (

        !flight.departureDateTime

    ) {

        errors.departureDateTime =
            "Veuillez sélectionner une date de départ.";

    }

    if (

        !flight.arrivalDateTime

    ) {

        errors.arrivalDateTime =
            "Veuillez sélectionner une date d'arrivée.";

    }

    /*
    =====================================================
    Cohérence des dates
    =====================================================
    */

    if (

        flight.departureDateTime &&
        flight.arrivalDateTime

    ) {

        const departure = new Date(

            flight.departureDateTime,

        );

        const arrival = new Date(

            flight.arrivalDateTime,

        );

        if (

            arrival <= departure

        ) {

            errors.arrivalDateTime =
                "La date d'arrivée doit être postérieure à la date de départ.";

        }

    }

    /*
    =====================================================
    Aéroports différents
    =====================================================
    */

    if (

        flight.departureAirport &&
        flight.arrivalAirport &&
        flight.departureAirport.id ===
        flight.arrivalAirport.id

    ) {

        errors.arrivalAirport =
            "Les deux aéroports doivent être différents.";

    }

    return errors;

}
