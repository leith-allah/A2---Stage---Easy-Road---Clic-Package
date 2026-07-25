
"use client";

import type { InputHTMLAttributes } from "react";
import FormField from "./FormField";

interface FormInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "value" | "onChange"
    > {

    label: string;

    value: string | number;

    onChange: (value: string) => void;

    error?: string;

    required?: boolean;

}

export default function FormInput({

    label,

    value,

    onChange,

    error,

    required,

    ...inputProps

}: FormInputProps) {

    return (

        <FormField

            label={label}

            required={required}

            error={error}

        >

            <input

                {...inputProps}

                value={value}

                onChange={(e) => onChange(e.target.value)}

                className={`

                    w-full

                    rounded-2xl

                    border

                    bg-white

                    px-5

                    py-3.5

                    text-slate-800

                    placeholder:text-slate-400

                    shadow-sm

                    outline-none

                    transition-all

                    duration-200

                    ${
                        error
                            ? `
                                border-red-500
                                focus:border-red-500
                                focus:ring-4
                                focus:ring-red-100
                            `
                            : `
                                border-slate-300
                                hover:border-slate-400
                                focus:border-cyan-500
                                focus:ring-4
                                focus:ring-cyan-100
                            `
                    }

                `}

            />

        </FormField>

    );

}
