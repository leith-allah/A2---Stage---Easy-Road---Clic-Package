
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

        <div className="space-y-3">

            <label
                className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    tracking-wide
                "
            >

                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}

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

                onWheel={(e)=>{

                    (e.target as HTMLInputElement).blur();

                }}

                className={`
                    w-full

                    rounded-2xl

                    border

                    bg-white

                    px-5

                    py-3

                    text-slate-800

                    shadow-sm

                    outline-none

                    transition-all

                    duration-200

                    ${
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            : "border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-4 focus:ring-cyan-100"
                    }
                `}

            />

            {error && (

                <p className="text-sm font-medium text-red-500">

                    {error}

                </p>

            )}

        </div>

    );

}
