
"use client";

interface Props {

    label: string;

    value: number;

    onChange: (value:number)=>void;

    min?: number;

    max?: number;

    required?: boolean;

    error?: string;

}

export default function FormNumber({

    label,

    value,

    onChange,

    min,

    max,

    required,

    error,

}:Props){

    return(

        <div className="space-y-2">

            <label className="font-medium">

                {label}

            </label>

            <input

                type="number"

                value={value}

                min={min}

                max={max}

                required={required}

                onChange={(e)=>

                    onChange(Number(e.target.value))

                }

                className={`

                    w-full

                    rounded-lg

                    border

                    px-4

                    py-3

                    ${error

                        ? "border-red-500"

                        : "border-gray-300"}

                `}

            />

            {

                error &&

                <p className="text-red-500 text-sm">

                    {error}

                </p>

            }

        </div>

    );

}
