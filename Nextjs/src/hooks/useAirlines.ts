
"use client";

import { useEffect, useState } from "react";

import { Airline } from "@/types/airline";

export function useAirlines() {

    const [airlines, setAirlines] = useState<Airline[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        async function load() {

            try {

                setLoading(true);

                const response = await fetch("/api/airlines");

                if (!response.ok) {

                    throw new Error(
                        "Impossible de charger les compagnies."
                    );

                }

                const data: Airline[] =
                    await response.json();

                setAirlines(data);

            }

            catch (err) {

                setError(

                    err instanceof Error
                        ? err.message
                        : "Erreur inconnue"

                );

            }

            finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    return {

        airlines,

        loading,

        error,

    };

}
