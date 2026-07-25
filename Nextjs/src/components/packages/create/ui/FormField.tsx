
"use client";

interface Props {

    label: string;

    required?: boolean;

    error?: string;

    children: React.ReactNode;

}

export default function FormField({

    label,

    required = false,

    error,

    children,

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

            {children}

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
