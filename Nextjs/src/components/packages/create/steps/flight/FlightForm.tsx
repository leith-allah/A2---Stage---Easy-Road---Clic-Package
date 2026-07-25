
"use client";

import SearchSelect from "../../ui/SearchSelect";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import FormSection from "../../ui/FormSection";

import type { Airline } from "@/types/airline";
import type { Airport } from "@/types/airport";

import type { FlightFormData } from "@/types/package/flight-form-data";
import type { FlightErrors } from "@/lib/validation/package/types";

import {

    FlightStatusValue,

} from "@/server/entities/value-objects/flight-status.value-object";

interface FlightFormProps {

    flight: FlightFormData;

    errors: FlightErrors;

    airlines: Airline[];

    airports: Airport[];

    loadingAirlines: boolean;

    loadingAirports: boolean;

    onFlightChange: <

        K extends keyof FlightFormData

    >(

        field: K,

        value: FlightFormData[K]

    ) => void;

}

export default function FlightForm({

    flight,

    errors,

    airlines,

    airports,

    loadingAirlines,

    loadingAirports,

    onFlightChange,

}: FlightFormProps) {

    return (

        <>

            <FormSection title="Informations du vol">

                <div className="grid grid-cols-2 gap-4">

                    <SearchSelect
                        label="Compagnie aérienne"
                        required
                        error={errors.airline}
                        options={airlines}
                        value={flight.airline}
                        loading={loadingAirlines}
                        placeholder="Compagnie aérienne"
                        getLabel={(airline) => airline.name}
                        onChange={(airline) =>
                            onFlightChange(
                                "airline",
                                airline,
                            )
                        }
                    />

                    <FormInput

                        label="Numéro de vol"

                        value={flight.flightNumber}

                        onChange={(value) =>

                            onFlightChange(

                                "flightNumber",

                                value,

                            )

                        }

                        error={errors.flightNumber}

                        required

                    />

                </div>

            </FormSection>

            <FormSection title="Aéroports">

                <div className="grid grid-cols-2 gap-4">

                    <SearchSelect
                        label="Aéroport de départ"
                        required
                        error={errors.departureAirport}
                        options={airports}
                        value={flight.departureAirport}
                        loading={loadingAirports}
                        placeholder="Aéroport de départ"
                        getLabel={(airport) =>
                            `${airport.iataCode} - ${airport.city.name} (${airport.city.country})`
                        }
                        onChange={(airport) =>
                            onFlightChange(
                                "departureAirport",
                                airport,
                            )
                        }
                    />

                    <SearchSelect
                        label="Aéroport d'Arrivée"
                        required
                        error={errors.arrivalAirport}
                        options={airports}
                        value={flight.arrivalAirport}
                        loading={loadingAirports}
                        placeholder="Aéroport d'Arrivée"
                        getLabel={(airport) =>
                            `${airport.iataCode} - ${airport.city.name} (${airport.city.country})`
                        }
                        onChange={(airport) =>
                            onFlightChange(
                                "arrivalAirport",
                                airport,
                            )
                        }
                    />

                </div>

            </FormSection>

            <FormSection title="Planning">

                <div className="grid grid-cols-2 gap-4">

                    <FormInput

                        type="datetime-local"

                        label="Départ"

                        value={flight.departureDateTime}

                        onChange={(value) =>

                            onFlightChange(

                                "departureDateTime",

                                value,

                            )

                        }

                        error={errors.departureDateTime}

                        required

                    />

                    <FormInput

                        type="datetime-local"

                        label="Arrivée"

                        value={flight.arrivalDateTime}

                        onChange={(value) =>

                            onFlightChange(

                                "arrivalDateTime",

                                value,

                            )

                        }

                        error={errors.arrivalDateTime}

                        required

                    />

                </div>

            </FormSection>

        </>

    );

}
