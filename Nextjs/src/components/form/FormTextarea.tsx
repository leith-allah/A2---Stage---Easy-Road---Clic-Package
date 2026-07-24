
"use client";

interface Props {

    label: string;

    value: string;

    onChange: (value: string) => void;

    error?: string;

    rows?: number;

}

export default function FormTextarea({

    label,

    value,

    onChange,

    error,

    rows = 5,

}: Props) {

    return (

        <div className="space-y-2">

            <label className="font-medium">

                {label}

            </label>

            <textarea

                rows={rows}

                value={value}

                onChange={(e)=>onChange(e.target.value)}

                className={`
                    w-full rounded-lg border px-3 py-2

                    ${
                        error
                            ? "border-red-500"
                            : "border-gray-300"
                    }

                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                `}
            />

            {error && (

                <p className="text-red-500 text-sm">

                    {error}

                </p>

            )}

        </div>

    );

}
