
"use client";

import { useEffect, useState } from "react";

import { Airport } from "@/types/airport";

export function useAirports() {

    const [airports, setAirports] = useState<Airport[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        async function load() {

            try {

                setLoading(true);

                const response = await fetch("/api/airports");

                if (!response.ok) {

                    throw new Error(
                        "Impossible de charger les aéroports."
                    );

                }

                const data: Airport[] =
                    await response.json();

                setAirports(data);

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

        airports,

        loading,

        error,

    };

}
