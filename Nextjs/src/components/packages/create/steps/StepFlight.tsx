
"use client";

import { usePackageWizard } from "@/context/usePackageWizard";
import { useWizardUpdater } from "@/hooks/useWizardUpdater";

import { useAirlines } from "@/hooks/useAirlines";
import { useAirports } from "@/hooks/useAirports";

import FlightCard from "./flight/FlightCard";

import StepNavigation from "@/components/packages/create/ui/StepNavigation";

import { useWizardValidation } from "@/hooks/useWizardValidation";

import { createEmptyFlight } from "@/types/package/defaults";


export default function StepFlight() {

    const {
        data,
        setData,
        next,
        previous,
        step,
        setTouchedSteps,
    } = usePackageWizard();

    const {
        updateFlight,
    } = useWizardUpdater(
        setData,
        step,
        setTouchedSteps
    );

    const {
        errors,
        canGoNext,
        canLeaveCurrentStep,
    } = useWizardValidation();

    const flightErrors = errors.flights ?? [];

    const {
        airlines,
        loading: loadingAirlines,
    } = useAirlines();

    const {
        airports,
        loading: loadingAirports,
    } = useAirports();

    function addFlight() {

        setData(previous => ({

            ...previous,

            flights: [

                ...previous.flights,

                createEmptyFlight(),

            ],

        }));

    }

    function duplicateFlight(index: number) {

        setData(previous => {

            const flights = [...previous.flights];

            flights.splice(index + 1, 0, {

                ...previous.flights[index],

            });

            return {

                ...previous,

                flights,

            };

        });

    }

    function removeFlight(index: number) {

        if (data.flights.length === 1) return;

        setData(previous => ({

            ...previous,

            flights: previous.flights.filter(

                (_, i) => i !== index,

            ),

        }));

    }

    function handleNext() {

        if (!canGoNext()) return;

        next();

    }

    return (

        <div className="space-y-8">

            <h2 className="text-2xl font-bold">

                Informations des vols

            </h2>


            {data.flights.map((flight, index) => (

                <FlightCard

                    key={index}

                    index={index}

                    flight={flight}

                    errors={flightErrors[index] ?? {}}

                    airlines={airlines}

                    airports={airports}

                    loadingAirlines={loadingAirlines}

                    loadingAirports={loadingAirports}

                    defaultFlightClass={flight.supplement.defaultFlightClass}

                    ECONOMYPrice={flight.supplement.ECONOMY}

                    BUSINESSPrice={flight.supplement.BUSINESS}

                    FIRSTPrice={flight.supplement.FIRST}

                    onFlightChange={(field, value) =>
                        updateFlight(index, field, value)
                    }

                    onDefaultClassChange={(value) =>
                        updateFlight(index, "supplement", {
                            ...flight.supplement,
                            defaultFlightClass: value,
                        })
                    }

                    onEconomyPriceChange={(value) =>
                        updateFlight(index, "supplement", {
                            ...flight.supplement,
                            ECONOMY: value,
                        })
                    }

                    onBusinessPriceChange={(value) =>
                        updateFlight(index, "supplement", {
                            ...flight.supplement,
                            BUSINESS: value,
                        })
                    }

                    onFirstPriceChange={(value) =>
                        updateFlight(index, "supplement", {
                            ...flight.supplement,
                            FIRST: value,
                        })
                    }

                    onDuplicate={() =>
                        duplicateFlight(index)
                    }

                    onDelete={() =>
                        removeFlight(index)
                    }

                    canDelete={data.flights.length > 1}

                />

            ))}


            <div className="flex justify-center">

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={addFlight}
                >
                    + Ajouter un vol
                </button>

            </div>

            <hr className="my-6" />

            <StepNavigation
                onPrevious={previous}
                previousDisabled={!canLeaveCurrentStep()}
                onNext={handleNext}
                nextDisabled={!canGoNext()}
            />

        </div>

    );

}
