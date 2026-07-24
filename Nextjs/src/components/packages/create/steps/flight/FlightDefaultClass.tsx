
"use client";

import FormSection from "../../ui/FormSection";
import FormSelect from "../../ui/FormSelect";

import {

    FlightClass,

} from "@/server/entities/value-objects/supplements.value-object";

interface FlightDefaultClassProps {

    value: FlightClass;

    onChange: (

        value: FlightClass,

    ) => void;

}

export default function FlightDefaultClass({

    value,

    onChange,

}: FlightDefaultClassProps) {

    return (

        <FormSection
            title="Classe de vol par défaut"
        >

            <FormSelect

                label="Classe"

                value={value}

                onChange={onChange}

                options={[

                    {

                        value: "ECONOMY",

                        label: "ECONOMY",

                    },

                    {

                        value: "BUSINESS",

                        label: "BUSINESS",

                    },

                    {

                        value: "FIRST",

                        label: "FIRST",

                    },

                ]}

            />

        </FormSection>

    );

}
