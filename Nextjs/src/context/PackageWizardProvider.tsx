
"use client";

import { useState } from "react";
import { PackageWizardContext } from "./PackageWizardContext";
import { WizardFormData } from "@/types/package/wizard-form-data";
import { FlightStatusValue } from "@/server/entities/value-objects/flight-status.value-object";


interface Props {
    children: React.ReactNode;
}

export function PackageWizardProvider({
    children,
}: Props) {

    const [step, setStep] = useState(0);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const next = () => setStep((s) => s + 1);

    const previous = () => setStep((s) => s - 1);

    const [data, setData] = useState<WizardFormData>({

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

        hotels: [{
            name: "",
            stars: 3,
            country: "",
            city: "",
            address: "",
        }],

        transports: [{
            route: "",
            company: "",
        }],

        excursions: [{
            name: "",
            location: "",
            description: "",
        }],

    });

    return (

        <PackageWizardContext.Provider
            value={{
                step,

                data,
                setData,

                errors,
                setErrors,

                next,
                previous,
            }}

        >

            {children}

        </PackageWizardContext.Provider>

    );

}
