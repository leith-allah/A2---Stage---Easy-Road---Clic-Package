
import { validatePackage } from "./validate-package";
import { validateFlight } from "./validate-flight";
import { validateHotel } from "./validate-hotel";
import { validateTransport } from "./validate-transport";
import { validateExcursion } from "./validate-excursion";

import type { WizardFormData } from "@/types/package/wizard-form-data";

import type {

    WizardErrors,

} from "./types";


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

    errors.package =

        validatePackage(

            data.package,

        );

    errors.flights =

        data.flights.map(

            validateFlight,

        );

    errors.hotels =

        data.hotels.map(

            validateHotel,

        );

    errors.transports =

        data.transports.map(

            validateTransport,

        );

    errors.excursions =

        data.excursions.map(

            validateExcursion,

        );

    const hasFlight =
        data.flights.some(

            flight =>

                flight.airline ||

                flight.flightNumber ||

                flight.departureAirport ||

                flight.arrivalAirport

        );

    const hasHotel =

        data.hotels.some(

            hotel =>

                hotel.name.trim() !== "",

        );

    const hasExcursion =

        data.excursions.some(

            excursion =>

                excursion.name.trim() !== "",

        );

    if (

        !hasFlight &&

        !hasHotel &&

        !hasExcursion

    ) {

        errors.global.push(

            "Le package doit contenir au moins un vol, un hôtel ou une excursion.",

        );

    }

    const hasTransport =

        data.transports.some(

            transport =>

                transport.route.trim() !== "",

        );

    if (

        hasTransport &&

        !hasFlight &&

        !hasHotel &&

        !hasExcursion

    ) {

        errors.global.push(

            "Un transport ne peut pas être vendu seul.",

        );

    }

    if (

        data.package.departureDate

    ) {

        const packageDeparture =

            new Date(

                data.package.departureDate,

            );

        data.flights.forEach(

            (flight, index) => {

                if (

                    !flight.departureDateTime

                )

                    return;

                if (

                    new Date(

                        flight.departureDateTime,

                    ) < packageDeparture

                ) {

                    errors.flights[index].departureDateTime =

                        "Le départ du vol est avant le départ du package.";

                }

            },

        );

    }

    if (

        data.package.returnDate

    ) {

        const packageReturn =

            new Date(

                data.package.returnDate,

            );

        data.flights.forEach(

            (flight, index) => {

                if (

                    !flight.arrivalDateTime

                )

                    return;

                if (

                    new Date(

                        flight.arrivalDateTime,

                    ) > packageReturn

                ) {

                    errors.flights[index].arrivalDateTime =

                        "Le retour du vol dépasse la date de retour du package.";

                }

            },

        );

    }


    return errors;

}

