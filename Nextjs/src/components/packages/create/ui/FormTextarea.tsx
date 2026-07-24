
"use client";

interface Props {

    label: string;

    value: string;

    onChange: (value: string) => void;

    rows?: number;

    placeholder?: string;

    error?: string;

}

export default function FormTextarea({

    label,

    value,

    onChange,

    rows = 5,

    placeholder,

    error,

}: Props) {

    return (

        <div className="space-y-2">

            <label className="font-medium">

                {label}

            </label>

            <textarea

                rows={rows}

                value={value}

                placeholder={placeholder}

                onChange={(e) =>

                    onChange(e.target.value)

                }

                className={`

                    w-full

                    rounded-lg

                    border

                    px-4

                    py-3

                    outline-none

                    resize-none

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
