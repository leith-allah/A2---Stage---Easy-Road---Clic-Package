
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface SearchSelectProps<T> {

    options: T[];

    value: T | null;

    loading?: boolean;

    onChange: (value: T) => void;

    getLabel: (item: T) => string;

    placeholder?: string;

}

export default function SearchSelect<T>({
    options,
    value,
    loading,
    onChange,
    getLabel,
    placeholder = "Rechercher...",
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

            <input
                type="text"
                className="input input-bordered w-full"
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

            {

                isOpen && (

                    <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-y-auto">

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

                                        text-left

                                        px-3

                                        py-2

                                        hover:bg-blue-100

                                        ${highlightedIndex === index ? "bg-blue-100" : ""}

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
