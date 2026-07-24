
"use client";

import type { InputHTMLAttributes } from "react";

interface FormInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "value" | "onChange"
    > {

    label: string;

    value: string | number;

    onChange: (value: string) => void;

    error?: string;

}

export default function FormInput({

    label,

    value,

    onChange,

    error,

    ...inputProps

}: FormInputProps) {

    return (

        <div className="space-y-2">

            <label className="font-medium">

                {label}

            </label>

            <input

                {...inputProps}

                value={value}

                onChange={(e) => onChange(e.target.value)}

                className={`

                    w-full

                    rounded-lg

                    border

                    px-4

                    py-3

                    outline-none

                    transition

                    ${error
                        ? "border-red-500"
                        : "border-gray-300"}

                    focus:border-primary

                `}

            />

            {error && (

                <p className="text-sm text-red-500">

                    {error}

                </p>

            )}

        </div>

    );

}
