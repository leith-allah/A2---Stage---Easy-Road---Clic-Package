
import { validatePackage } from "./validate-package";
import { validateFlight } from "./validate-flight";
import { validateHotel } from "./validate-hotel";
import { validateTransport } from "./validate-transport";
import { validateExcursion } from "./validate-excursion";

import type { WizardFormData } from "@/types/package/wizard-form-data";
import type { WizardErrors } from "./types";

function toDateOnly(date: Date): Date {

    return new Date(

        date.getFullYear(),
        date.getMonth(),
        date.getDate(),

    );

}

export function validateWizard(
    data: WizardFormData,
): WizardErrors {

    const errors: WizardErrors = {

        package: {},

        flights: [],

        hotels: [],

        transports: [],

        excursions: [],

        global: [],

    };

    /*
    =====================================================
    Package
    =====================================================
    */

    errors.package = validatePackage(data.package);

    /*
    =====================================================
    Détection des sections commencées
    =====================================================
    */

    const flightInformationStarted = data.flights.some(

        flight =>

            !!flight.airline ||

            !!flight.departureAirport ||

            !!flight.arrivalAirport ||

            flight.flightNumber.trim() !== "" ||

            flight.departureDateTime !== "" ||

            flight.arrivalDateTime !== ""

    );
    

    const flightStarted =

        flightInformationStarted ||

        data.supplements.defaultFlightClass !== "ECONOMY" ||

        data.supplements.ECONOMY > 0 ||

        data.supplements.BUSINESS > 0 ||

        data.supplements.FIRST > 0;


    const hasFlight = data.flights.some(

        flight =>

            !!flight.airline ||

            !!flight.departureAirport ||

            !!flight.arrivalAirport ||

            flight.flightNumber.trim() !== "" ||

            flight.departureDateTime !== "" ||

            flight.arrivalDateTime !== ""

    );

    const hotelInformationStarted = data.hotels.some(

        hotel =>

            hotel.name.trim() !== "" ||

            hotel.country.trim() !== "" ||

            hotel.city.trim() !== "" ||

            hotel.address.trim() !== ""

    );

    const hotelStarted =
        hotelInformationStarted ||

        data.supplements.defaultRoomType !== "DOUBLE" ||

        data.supplements.defaultBoardType !== "BED_BREAKFAST" ||

        data.supplements.SINGLE > 0 ||
        data.supplements.DOUBLE > 0 ||
        data.supplements.TRIPLE > 0 ||
        data.supplements.QUADRUPLE > 0 ||
        data.supplements.SUITE > 0 ||

        data.supplements.BED_ONLY > 0 ||
        data.supplements.BED_BREAKFAST > 0 ||
        data.supplements.HALF_BOARD > 0 ||
        data.supplements.FULL_BOARD > 0 ||
        data.supplements.ALL_INCLUSIVE > 0;


    const hasTransport = data.transports.some(

        transport =>

            transport.route.trim() !== "" ||

            transport.company.trim() !== ""

    );

    const hasExcursion = data.excursions.some(

        excursion =>

            excursion.name.trim() !== "" ||

            excursion.location.trim() !== "" ||

            excursion.description.trim() !== ""

    );

    /*
    =====================================================
    Validation uniquement si la section est commencée
    =====================================================
    */

    errors.flights = flightStarted

        ? data.flights.map(validateFlight)

        : data.flights.map(() => ({}));

    errors.hotels = hotelStarted

        ? data.hotels.map(validateHotel)

        : data.hotels.map(() => ({}));

    errors.transports = hasTransport

        ? data.transports.map(validateTransport)

        : data.transports.map(() => ({}));

    errors.excursions = hasExcursion

        ? data.excursions.map(validateExcursion)

        : data.excursions.map(() => ({}));

    /*
    =====================================================
    Cohérence Package / Vol
    =====================================================
    */

    if (data.package.departureDate) {

        const packageDeparture = toDateOnly(

            new Date(data.package.departureDate)

        );

        data.flights.forEach((flight, index) => {

            if (!flight.departureDateTime) return;

            const flightDeparture = toDateOnly(

                new Date(flight.departureDateTime)

            );

            if (flightDeparture < packageDeparture) {

                errors.flights[index].departureDateTime =

                    "Le départ du vol est avant le départ du package.";

            }

        });

    }

    if (data.package.returnDate) {

        const packageReturn = toDateOnly(

            new Date(data.package.returnDate)

        );

        data.flights.forEach((flight, index) => {

            if (!flight.arrivalDateTime) return;

            const flightArrival = toDateOnly(

                new Date(flight.arrivalDateTime)

            );

            if (flightArrival > packageReturn) {

                errors.flights[index].arrivalDateTime =

                    "Le retour du vol dépasse la date du package.";

            }

        });

    }

    /*
    =====================================================
    Un transport seul est interdit
    =====================================================
    */

    if (

        hasTransport &&

        !hasFlight &&

        !hotelInformationStarted &&

        !hasExcursion

    ) {

        errors.global.push(

            "Un transport ne peut pas être vendu seul.",

        );

    }

    /*
    =====================================================
    Package publiable
    =====================================================
    */

    if (

        !hasFlight &&

        !hotelInformationStarted &&

        !hasExcursion

    ) {

        errors.global.push(

            "Le package doit contenir au moins un vol, un hôtel ou une excursion.",

        );

    }

    return errors;

}
