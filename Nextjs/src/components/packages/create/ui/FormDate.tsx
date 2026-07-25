
"use client";

interface Props {

    label: string;

    value: string;

    onChange: (value: string) => void;

    required?: boolean;

    error?: string;

}

export default function FormDate({

    label,

    value,

    onChange,

    required,

    error,

}: Props) {

    return (

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

                type="date"

                value={value}

                required={required}

                onChange={(e) =>
                    onChange(e.target.value)
                }

                className={`
                    w-full

                    rounded-2xl

                    border

                    bg-white

                    px-5

                    py-3.5

                    text-slate-800

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

            {error && (

                <p
                    className="
                        text-sm
                        font-medium
                        text-red-500
                    "
                >

                    {error}

                </p>

            )}

        </div>

    );

}
