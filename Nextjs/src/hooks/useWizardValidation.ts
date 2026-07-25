
"use client";

import { useMemo } from "react";

import { usePackageWizard } from "@/context/usePackageWizard";

import { validateWizard } from "@/lib/validation/package/validate-wizard";

export function useWizardValidation() {

    const {

        data,

        step,

        touchedSteps,

    } = usePackageWizard();

    const rawErrors = useMemo(

        () => validateWizard(data),

        [data],

    );

    /*
    =====================================================
    Sections commencées
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


    const hotelInformationStarted = data.hotels.some(

        hotel =>

            hotel.name.trim() !== "" ||

            hotel.country.trim() !== "" ||

            hotel.city.trim() !== "" ||

            hotel.address.trim() !== "" ||

            hotel.stars > 0

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



    const transportInformationStarted =
        data.transports.some(
            transport =>
                transport.route.trim() !== "" ||
                transport.company.trim() !== ""
        );


    const excursionInformationStarted =
        data.excursions.some(
            excursion =>
                excursion.name.trim() !== "" ||
                excursion.location.trim() !== "" ||
                excursion.description.trim() !== "" 
        );


    const errors = touchedSteps.includes(step)

        ? rawErrors

        : {

            ...rawErrors,

            package: {},

            flights: [],

            hotels: [],

            transports: [],

            excursions: [],

        };
        

    function hasErrors(object: unknown): boolean {

        if (Array.isArray(object)) {

            return object.some(hasErrors);

        }

        if (

            typeof object === "object" &&

            object !== null

        ) {

            return Object.values(object).some(hasErrors);

        }

        return Boolean(object);

    }

    /*
    =====================================================
    Step terminé ?
    =====================================================
    */

    function isStepValid(stepIndex: number): boolean {

        if (!touchedSteps.includes(stepIndex)) {

            return false;

        }

        switch (stepIndex) {

            case 0:

                return !hasErrors(rawErrors.package);

            case 1:

                return (

                    flightInformationStarted &&

                    !hasErrors(rawErrors.flights)

                );

            case 2:

                return (

                    hotelInformationStarted &&

                    !hasErrors(rawErrors.hotels)

                );

            case 3:

                return (

                    transportInformationStarted &&

                    !hasErrors(rawErrors.transports)

                );

            case 4:

                return (

                    excursionInformationStarted &&

                    !hasErrors(rawErrors.excursions)

                );

            case 5:

                return (

                    !hasErrors(rawErrors.package) &&

                    rawErrors.global.length === 0

                );

            default:

                return false;

        }

    }

    /*
    =====================================================
    Bouton Continuer
    =====================================================
    */

    function canGoNext() {

        switch (step) {

            case 0:

                return !hasErrors(rawErrors.package);

            case 1:

                return !flightStarted ||

                    !hasErrors(rawErrors.flights);

            case 2:

                return !hotelStarted ||

                    !hasErrors(rawErrors.hotels);

            case 3:

                return !transportInformationStarted ||

                    !hasErrors(rawErrors.transports);

            case 4:

                return !excursionInformationStarted ||

                    !hasErrors(rawErrors.excursions);

            default:

                return true;

        }

    }

const wizardLocked =

    (flightStarted &&
        hasErrors(rawErrors.flights)) ||

    (hotelStarted &&
        hasErrors(rawErrors.hotels)) ||

    (transportInformationStarted &&
        hasErrors(rawErrors.transports)) ||

    (excursionInformationStarted &&
        hasErrors(rawErrors.excursions));
        

    /*
    =====================================================
    Accès aux étapes
    =====================================================
    */

    function canAccessStep(targetStep: number) {

        /*
        Package toujours accessible
        */

        if (targetStep === 0) {

            return !wizardLocked;

        }

        /*
        Package invalide
        */

        if (hasErrors(rawErrors.package)) {

            return false;

        }

        /*
        Si une étape est commencée
        mais invalide,
        tout le wizard est bloqué
        */

        if (wizardLocked) {

            return targetStep === step;

        }

        /*
        Review
        */

        if (targetStep === 5) {

            return rawErrors.global.length === 0;

        }

        return true;

    }

    /*
    =====================================================
    Icône rouge
    =====================================================
    */

    function stepHasErrors(stepIndex: number): boolean {

        if (

            !touchedSteps.includes(stepIndex)

        ) {

            return false;

        }

        switch (stepIndex) {

            case 0:

                return hasErrors(rawErrors.package);

            case 1:

                return hasErrors(rawErrors.flights);

            case 2:

                return hasErrors(rawErrors.hotels);

            case 3:

                return hasErrors(rawErrors.transports);

            case 4:

                return hasErrors(rawErrors.excursions);

            case 5:

                return rawErrors.global.length > 0;

            default:

                return false;

        }

    }

    /*
    =====================================================
    Submit
    =====================================================
    */

    function canSubmit() {

        return (

            !hasErrors(rawErrors.package) &&

            rawErrors.global.length === 0

        );

    }

    return {

        errors,

        canGoNext,

        canLeaveCurrentStep: () => !wizardLocked,

        canSubmit,

        isStepValid,

        canAccessStep,

        stepHasErrors,

    };

}
