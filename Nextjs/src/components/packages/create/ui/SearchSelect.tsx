
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface SearchSelectProps<T> {

    options: T[];

    value: T | null;

    loading?: boolean;

    onChange: (value: T) => void;

    getLabel: (item: T) => string;

    placeholder?: string;

    label?: string;

    required?: boolean;

    error?: string;

}

export default function SearchSelect<T>({
    options,
    value,
    loading,
    onChange,
    getLabel,
    placeholder = "Rechercher...",
    label,
    required = false,
    error,
}: SearchSelectProps<T>) {

    const [query, setQuery] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (value) {

            setQuery(getLabel(value));

        }

    }, [value, getLabel]);


    const filteredOptions = useMemo(() => {

        if (loading) {

            return [];

        }

        return [...options]

            .sort((a, b) =>

                getLabel(a).localeCompare(getLabel(b))

            )

            .filter(option =>

                getLabel(option)

                    .toLowerCase()

                    .includes(query.toLowerCase())

            );

    }, [loading, options, query, getLabel]);


    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if (

                containerRef.current &&
                !containerRef.current.contains(event.target as Node)

            ) {

                setIsOpen(false);

            }

        }

        document.addEventListener(

            "mousedown",

            handleClickOutside,

        );

        return () =>

            document.removeEventListener(

                "mousedown",

                handleClickOutside,

            );

    }, []);

    return (

        <div
            ref={containerRef}
            className="relative w-full"
        >

            {label && (

                <label className="mb-2 block text-sm font-bold text-slate-700">

                    {label}

                    {required && (

                        <span className="text-red-500">*</span>

                    )}

                </label>

            )}

            <input
                type="text"
                className="
                    w-full

                    rounded-2xl

                    border

                    border-slate-300

                    bg-white

                    px-5

                    py-3.5

                    text-slate-800

                    placeholder:text-slate-400

                    shadow-sm

                    outline-none

                    transition-all

                    duration-200

                    hover:border-slate-400

                    focus:border-cyan-500

                    focus:ring-4

                    focus:ring-cyan-100
                "
                placeholder={placeholder}
                value={query}
                onFocus={() => {

                    setIsOpen(true);

                }}
                onChange={(e) => {

                    setQuery(e.target.value);

                    setHighlightedIndex(0);

                    setIsOpen(true);

                }}

                onKeyDown={(e) => {

                    if (!isOpen) return;

                    switch (e.key) {

                        case "ArrowDown":

                            e.preventDefault();

                            setHighlightedIndex(previous =>

                                Math.min(

                                    previous + 1,

                                    filteredOptions.length - 1,

                                )

                            );

                            break;

                        case "ArrowUp":

                            e.preventDefault();

                            setHighlightedIndex(previous =>

                                Math.max(

                                    previous - 1,

                                    0,

                                )

                            );

                            break;

                        case "Enter":

                            e.preventDefault();

                            if (!filteredOptions[highlightedIndex]) return;

                            onChange(

                                filteredOptions[highlightedIndex]

                            );

                            setQuery(

                                getLabel(

                                    filteredOptions[highlightedIndex]

                                )

                            );

                            setIsOpen(false);

                            break;

                        case "Escape":

                            setIsOpen(false);

                            break;

                    }

                }}
            />

            {error && (

                <p className="mt-1 text-sm text-red-500">

                    {error}

                </p>

            )}

            {

                isOpen && (

                            <div
                                className="
                                    absolute

                                    z-50

                                    mt-2

                                    max-h-72

                                    w-full

                                    overflow-y-auto

                                    rounded-2xl

                                    border

                                    border-slate-200

                                    bg-white

                                    shadow-xl
                                "
                            >

                            {loading ? (

                                <div className="p-3 text-sm text-gray-500">
                                    Chargement...
                                </div>

                            ) : filteredOptions.length === 0 ? (

                                <div className="p-3 text-sm text-gray-500">
                                    Aucun résultat
                                </div>

                            ) : null}

                        {

                            filteredOptions.map((option, index) => (

                                <button

                                    key={index}

                                    type="button"

                                    className={`
                                        w-full

                                        px-5

                                        py-3

                                        text-left

                                        transition-colors

                                        duration-150

                                        ${
                                            highlightedIndex === index
                                                ? "bg-cyan-100 text-slate-800"
                                                : "hover:bg-slate-100 text-slate-700"
                                        }
                                    `}

                                    onClick={() => {

                                        onChange(option);

                                        setQuery(getLabel(option));

                                        setIsOpen(false);

                                    }}

                                >

                                    {getLabel(option)}

                                </button>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}
