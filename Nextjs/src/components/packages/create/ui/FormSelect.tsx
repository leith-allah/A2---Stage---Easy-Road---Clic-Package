
"use client";

interface Option<T extends string> {

    value: T;

    label: string;

}

interface Props<T extends string> {

    label: string;

    value: T;

    onChange: (value: T) => void;

    options: Option<T>[];

    error?: string;

}

export default function FormSelect<T extends string>({

    label,

    value,

    onChange,

    options,

    error,

}: Props<T>) {

    return (

        <div className="space-y-2">

            <label className="font-medium">

                {label}

            </label>

            <select

                value={value}

                onChange={(e) => onChange(e.target.value as T)}

                className="select select-bordered w-full"

            >

                {

                    options.map((option) => (

                        <option

                            key={option.value}

                            value={option.value}

                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

            {

                error && (

                    <p className="text-red-500 text-sm">

                        {error}

                    </p>

                )

            }

        </div>

    );

}
