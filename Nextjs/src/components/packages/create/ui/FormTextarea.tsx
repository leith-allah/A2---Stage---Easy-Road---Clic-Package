
"use client";

import FormField from "./FormField";

interface Props {

    label: string;

    value: string;

    onChange: (value: string) => void;

    rows?: number;

    placeholder?: string;

    error?: string;

    required?: boolean;

}

export default function FormTextarea({

    label,

    value,

    onChange,

    rows = 5,

    placeholder,

    error,

    required,

}: Props) {

    return (

        <FormField

            label={label}

            required={required}

            error={error}

        >

            <textarea

                rows={rows}

                value={value}

                placeholder={placeholder}

                onChange={(e) =>

                    onChange(e.target.value)

                }

                className={`
                    w-full

                    rounded-xl

                    border

                    bg-white

                    px-4

                    py-3

                    text-gray-800

                    placeholder:text-gray-400

                    shadow-sm

                    outline-none

                    resize-none

                    transition-all

                    duration-200

                    ${
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            : "border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-4 focus:ring-cyan-100"
                    }
                `}

            />

        </FormField>

    );

}
