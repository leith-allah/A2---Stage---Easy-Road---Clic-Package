
"use client";

import type { WizardFormData } from "@/types/package/wizard-form-data";
import { createEmptyFlight } from "@/types/package/defaults";


export function useWizardUpdater(
    setData: React.Dispatch<React.SetStateAction<WizardFormData>>,
    step: number,
    setTouchedSteps: React.Dispatch<React.SetStateAction<number[]>>
) {

    function touchCurrentStep() {

        setTouchedSteps(previous =>

            previous.includes(step)

                ? previous

                : [...previous, step]

        );

    }

    // =====================================================
    // Package
    // =====================================================

    function updatePackage<
        K extends keyof WizardFormData["package"]
    >(
        field: K,
        value: WizardFormData["package"][K]
    ) {
        touchCurrentStep();

        setData(prev => ({
            ...prev,
            package: {
                ...prev.package,
                [field]: value,
            },
        }));
    }

    // =====================================================
    // Supplements
    // =====================================================

    function updateSupplement<
        K extends keyof WizardFormData["supplements"]
    >(
        field: K,
        value: WizardFormData["supplements"][K]
    ) {
        touchCurrentStep();

        setData(prev => ({
            ...prev,
            supplements: {
                ...prev.supplements,
                [field]: value,
            },
        }));
    }

    // =====================================================
    // Flights
    // =====================================================

    function updateFlight<
        K extends keyof WizardFormData["flights"][number]
    >(
        index: number,
        field: K,
        value: WizardFormData["flights"][number][K]
    ) {
        touchCurrentStep();

        setData(prev => ({
            ...prev,
            flights: prev.flights.map((flight, i) =>
                i === index
                    ? {
                          ...flight,
                          [field]: value,
                      }
                    : flight
            ),
        }));
    }

    function addFlight() {

        touchCurrentStep();

        setData(prev => ({

            ...prev,

            flights: [

                ...prev.flights,

                createEmptyFlight(),

            ],

        }));

    }

    function removeFlight(index: number) {

        touchCurrentStep();

        setData(prev => ({
            ...prev,
            flights:
                prev.flights.length === 1
                    ? prev.flights
                    : prev.flights.filter((_, i) => i !== index),
        }));
    }

    function duplicateFlight(index: number) {

        touchCurrentStep();

        setData(prev => {
            const copy = {
                ...prev.flights[index],
            };

            return {
                ...prev,
                flights: [
                    ...prev.flights.slice(0, index + 1),
                    copy,
                    ...prev.flights.slice(index + 1),
                ],
            };
        });
    }

    // =====================================================
    // Hotels
    // =====================================================

    function updateHotel<
        K extends keyof WizardFormData["hotels"][number]
    >(
        index: number,
        field: K,
        value: WizardFormData["hotels"][number][K]
    ) {

        touchCurrentStep();

        setData(prev => ({
            ...prev,
            hotels: prev.hotels.map((hotel, i) =>
                i === index
                    ? {
                          ...hotel,
                          [field]: value,
                      }
                    : hotel
            ),
        }));
    }

    // =====================================================
    // Transport
    // =====================================================

    function updateTransport<
        K extends keyof WizardFormData["transports"][number]
    >(
        index: number,
        field: K,
        value: WizardFormData["transports"][number][K]
    ) {

        touchCurrentStep();

        setData(prev => ({
            ...prev,
            transports: prev.transports.map((transport, i) =>
                i === index
                    ? {
                          ...transport,
                          [field]: value,
                      }
                    : transport
            ),
        }));
    }

    function addTransport() {

        touchCurrentStep();

        setData(previous => ({

            ...previous,

            transports: [

                ...previous.transports,

                {
                    route: "",
                    company: "",
                },

            ],

        }));

    }

    function removeTransport(index: number) {

        touchCurrentStep();

        setData(previous => ({

            ...previous,

            transports:

                previous.transports.length === 1

                    ? previous.transports

                    : previous.transports.filter(

                        (_, i) => i !== index,

                    ),

        }));

    }

    function duplicateTransport(index: number) {

        touchCurrentStep();

        setData(previous => {

            const copy = {

                ...previous.transports[index],

            };

            return {

                ...previous,

                transports: [

                    ...previous.transports.slice(0, index + 1),

                    copy,

                    ...previous.transports.slice(index + 1),

                ],

            };

        });

    }

    // =====================================================
    // Excursions
    // =====================================================

    function updateExcursion<
        K extends keyof WizardFormData["excursions"][number]
    >(
        index: number,
        field: K,
        value: WizardFormData["excursions"][number][K]
    ) {

        touchCurrentStep();

        setData(prev => ({
            ...prev,
            excursions: prev.excursions.map((excursion, i) =>
                i === index
                    ? {
                          ...excursion,
                          [field]: value,
                      }
                    : excursion
            ),
        }));
    }

    function addExcursion() {

        touchCurrentStep();

        setData(previous => ({

            ...previous,

            excursions: [

                ...previous.excursions,

                {

                    name: "",
                    location: "",
                    description: "",

                },

            ],

        }));

    }

    function removeExcursion(index: number) {

        touchCurrentStep();

        setData(previous => ({

            ...previous,

            excursions:

                previous.excursions.length === 1

                    ? previous.excursions

                    : previous.excursions.filter(

                        (_, i) => i !== index,

                    ),

        }));

    }

    function duplicateExcursion(index: number) {

        touchCurrentStep();

        setData(previous => {

            const copy = {

                ...previous.excursions[index],

            };

            return {

                ...previous,

                excursions: [

                    ...previous.excursions.slice(0, index + 1),

                    copy,

                    ...previous.excursions.slice(index + 1),

                ],

            };

        });

    }

    return {
        updatePackage,

        updateSupplement,

        updateFlight,
        addFlight,
        removeFlight,
        duplicateFlight,

        updateHotel,

        updateTransport,
        addTransport,
        removeTransport,
        duplicateTransport,

        updateExcursion,
        addExcursion,
        removeExcursion,
        duplicateExcursion,
    };

}
