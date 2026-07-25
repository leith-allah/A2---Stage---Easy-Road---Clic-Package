
"use client";

import { useState } from "react";
import { PackageWizardContext } from "./PackageWizardContext";
import { WizardFormData } from "@/types/package/wizard-form-data";
import { FlightStatusValue } from "@/server/entities/value-objects/flight-status.value-object";
import WizardPersistence from "./WizardPersistence";
import { validateWizard } from "@/lib/validation/package/validate-wizard";

interface Props {
  children: React.ReactNode;
  initialData?: WizardFormData;
  disablePersistence?: boolean;
  isEdit?: boolean;
  packageId?: number;
}

export function PackageWizardProvider({
    children,
    initialData,
    disablePersistence = false,
    isEdit,
    packageId,
}: Props) {

    const [step, setStep] = useState(0);

    const [touchedSteps, setTouchedSteps] = useState<number[]>([]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const next = () => {

        if (wizardLocked) return;

        setTouchedSteps(previous =>
            previous.includes(step)
                ? previous
                : [...previous, step]
        );

        setStep(s => s + 1);
    };

    const previous = () => {

        if (wizardLocked) return;

        setTouchedSteps(previous =>
            previous.includes(step)
                ? previous
                : [...previous, step]
        );

        setStep(s => s - 1);
    };

    const goToStep = (target: number) => {

        if (wizardLocked && target !== step) {
            return;
        }

        setTouchedSteps(previous =>
            previous.includes(step)
                ? previous
                : [...previous, step]
        );

        setStep(target);
    };

    const [data, setData] = useState<WizardFormData>(
        initialData ?? {
        supplements: {
            ECONOMY: 0,
            BUSINESS: 0,
            FIRST: 0,
            SINGLE: 0,
            DOUBLE: 0,
            TRIPLE: 0,
            QUADRUPLE: 0,
            SUITE: 0,
            BED_ONLY: 0,
            BED_BREAKFAST: 0,
            HALF_BOARD: 0,
            FULL_BOARD: 0,
            ALL_INCLUSIVE: 0,
            defaultFlightClass: "ECONOMY",
            defaultRoomType: "DOUBLE",
            defaultBoardType: "BED_BREAKFAST",
        },
        package: {
            name: "",
            country: "",
            destination: "",
            departureDate: "",
            returnDate: "",
            description: "",
            image: "",
            totalStock: 0,
            basePrice: 0,
        },
        flights: [
            {
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
            },
        ],
        hotels: [
            {
            name: "",
            stars: 0,
            country: "",
            city: "",
            address: "",
            },
        ],
        transports: [
            {
            route: "",
            company: "",
            },
        ],
        excursions: [
            {
            name: "",
            location: "",
            description: "",
            },
        ],
        }
    );

    const validation = validateWizard(data);

    function hasErrors(object: unknown): boolean {
        if (Array.isArray(object)) {
            return object.some(hasErrors);
        }

        if (typeof object === "object" && object !== null) {
            return Object.values(object).some(hasErrors);
        }

        return Boolean(object);
    }

    const flightStarted = data.flights.some(
        flight =>
            !!flight.airline ||
            !!flight.departureAirport ||
            !!flight.arrivalAirport ||
            flight.flightNumber.trim() !== "" ||
            flight.departureDateTime !== "" ||
            flight.arrivalDateTime !== ""
    );

    const hotelStarted = data.hotels.some(
        hotel =>
            hotel.name.trim() !== "" ||
            hotel.country.trim() !== "" ||
            hotel.city.trim() !== "" ||
            hotel.address.trim() !== "" ||
            hotel.stars > 0
    );

    const transportStarted = data.transports.some(
        transport =>
            transport.route.trim() !== "" ||
            transport.company.trim() !== ""
    );

    const excursionStarted = data.excursions.some(
        excursion =>
            excursion.name.trim() !== "" ||
            excursion.location.trim() !== "" ||
            excursion.description.trim() !== ""
    );

    const wizardLocked =
        (flightStarted && hasErrors(validation.flights)) ||
        (hotelStarted && hasErrors(validation.hotels)) ||
        (transportStarted && hasErrors(validation.transports)) ||
        (excursionStarted && hasErrors(validation.excursions));

    return (

        <PackageWizardContext.Provider
            value={{
                step,

                touchedSteps,
                setTouchedSteps,

                data,
                setData,

                errors,
                setErrors,

                goToStep,

                next,
                previous,

                isEdit,
                packageId,
            }}
        >

            {/* 🔒 On n'active la persistance localStorage QUE si on n'est PAS en édition */}
            {!disablePersistence && <WizardPersistence />}

            {children}

        </PackageWizardContext.Provider>

    );

}
