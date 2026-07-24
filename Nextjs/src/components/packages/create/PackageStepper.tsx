
"use client";

type Props = {

    current:number

}

const labels=[

    "Package",

    "Vol",

    "Hôtel",

    "Transport",

    "Excursion",

    "Validation"

]

export default function PackageStepper({

    current

}:Props){

    return (

        <div className="grid grid-cols-6 gap-3">

            {labels.map((label, index) => (

                <div

                    key={label}

                    className={`
                        rounded-xl
                        border
                        p-3
                        text-center
                        transition
                        ${
                            current === index
                                ? "bg-primary text-white border-primary font-semibold"
                                : "bg-white border-gray-300 text-gray-700"
                        }
                    `}
                >

                    <div className="text-lg font-bold">

                        {index + 1}

                    </div>

                    <div className="text-sm">

                        {label}

                    </div>

                </div>

            ))}

        </div>

    );

}
