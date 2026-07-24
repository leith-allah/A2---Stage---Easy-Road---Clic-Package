
"use client";

interface Props{

    label:string;

    value:string;

    onChange:(value:string)=>void;

    required?:boolean;

    error?:string;

}

export default function FormDate({

    label,

    value,

    onChange,

    required,

    error,

}:Props){

    return(

        <div className="space-y-2">

            <label className="font-medium">

                {label}

            </label>

            <input

                type="date"

                value={value}

                required={required}

                onChange={(e)=>

                    onChange(e.target.value)

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
