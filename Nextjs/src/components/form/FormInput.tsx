
"use client";

interface FormInputProps {
    label: string;

    value: string | number;

    onChange: (value: string) => void;

    error?: string;

    type?: string;

    placeholder?: string;

    required?: boolean;
}

export default function FormInput({

    label,

    value,

    onChange,

    error,

    type = "text",

    placeholder = "",

    required = false,

}: FormInputProps) {

    return (

        <div className="space-y-2">

            <label className="font-medium">

                {label}

            </label>

            <input

                type={type}

                value={value}

                placeholder={placeholder}

                required={required}

                onChange={(e) => onChange(e.target.value)}

                className={`
                    w-full rounded-lg border px-3 py-2 outline-none transition

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

                <p className="text-sm text-red-500">

                    {error}

                </p>

            )}

        </div>

    );

}
