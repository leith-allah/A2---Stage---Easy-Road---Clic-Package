
"use client";

import FormSection from "../../ui/FormSection";
import FormInput from "../../ui/FormInput";

interface FlightSupplementsProps {

    ECONOMYPrice: number;

    BUSINESSPrice: number;

    FIRSTPrice: number;

    onEconomyPriceChange: (

        value: number,

    ) => void;

    onBusinessPriceChange: (

        value: number,

    ) => void;

    onFirstPriceChange: (

        value: number,

    ) => void;

}

export default function FlightSupplements({

    ECONOMYPrice,

    BUSINESSPrice,

    FIRSTPrice,

    onEconomyPriceChange,

    onBusinessPriceChange,

    onFirstPriceChange,

}: FlightSupplementsProps) {

    return (

        <FormSection
            title="Suppléments"
        >

            <div className="grid grid-cols-3 gap-4">

                <FormInput

                    type="number"

                    label="ECONOMY"

                    value={String(ECONOMYPrice)}

                    min={0}

                    step={0.01}

                    onChange={(value) =>

                        onEconomyPriceChange(

                            Number(value),

                        )

                    }

                />

                <FormInput

                    type="number"

                    label="BUSINESS"

                    value={String(BUSINESSPrice)}

                    min={0}

                    step={0.01}

                    onChange={(value) =>

                        onBusinessPriceChange(

                            Number(value),

                        )

                    }

                />

                <FormInput

                    type="number"

                    label="FIRST"

                    value={String(FIRSTPrice)}

                    min={0}

                    step={0.01}

                    onChange={(value) =>

                        onFirstPriceChange(

                            Number(value),

                        )

                    }

                />

            </div>

        </FormSection>

    );

}
