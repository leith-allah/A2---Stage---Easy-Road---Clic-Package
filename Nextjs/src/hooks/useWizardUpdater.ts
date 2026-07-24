
"use client";

import type { WizardFormData } from "@/types/package/wizard-form-data";
import { createEmptyFlight } from "@/types/package/defaults";


export function useWizardUpdater(
    setData: React.Dispatch<React.SetStateAction<WizardFormData>>
) {
    // =====================================================
    // Package
    // =====================================================

    function updatePackage<
        K extends keyof WizardFormData["package"]
    >(
        field: K,
        value: WizardFormData["package"][K]
    ) {
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

        setData(prev => ({

            ...prev,

            flights: [

                ...prev.flights,

                createEmptyFlight(),

            ],

        }));

    }

    function removeFlight(index: number) {
        setData(prev => ({
            ...prev,
            flights:
                prev.flights.length === 1
                    ? prev.flights
                    : prev.flights.filter((_, i) => i !== index),
        }));
    }

    function duplicateFlight(index: number) {
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

    return {
        updatePackage,

        updateSupplement,

        updateFlight,
        addFlight,
        removeFlight,
        duplicateFlight,

        updateHotel,

        updateTransport,

        updateExcursion,
    };

}
