
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
    required?: boolean;
}

export default function FormSelect<T extends string>({
    label,
    value,
    onChange,
    options,
    error,
    required,
}: Props<T>) {

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

            <select

                value={value}

                onChange={(e) => onChange(e.target.value as T)}

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

            >

                {options.map((option) => (

                    <option
                        key={option.value}
                        value={option.value}
                    >

                        {option.label}

                    </option>

                ))}

            </select>

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
