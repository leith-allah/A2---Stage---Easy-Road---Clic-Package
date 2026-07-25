
"use client";

import { useEffect, useRef } from "react";

import { usePackageWizard } from "@/context/usePackageWizard";

const STORAGE_KEY = "package-wizard";

export function useWizardPersistence() {

    const {

        data,
        setData,

        step,
        goToStep,

        touchedSteps,
        setTouchedSteps,

    } = usePackageWizard();

    /*
    =====================================================
    Éviter de sauvegarder avant le chargement
    =====================================================
    */

    const loaded = useRef(false);

    /*
    =====================================================
    Chargement
    =====================================================
    */

    useEffect(() => {

        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {

            loaded.current = true;

            return;

        }

        try {

            const parsed = JSON.parse(raw);

            if (parsed.data) {

                setData(parsed.data);

            }

            if (

                typeof parsed.step === "number"

            ) {

                goToStep(parsed.step);

            }

            if (

                Array.isArray(parsed.touchedSteps)

            ) {

                setTouchedSteps(parsed.touchedSteps);

            }

        }

        catch {

            localStorage.removeItem(STORAGE_KEY);

        }

        loaded.current = true;

    }, []);

    /*
    =====================================================
    Sauvegarde
    =====================================================
    */

    useEffect(() => {

        if (!loaded.current) {

            return;

        }

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify({

                data,

                step,

                touchedSteps,

            }),

        );

    }, [

        data,

        step,

        touchedSteps,

    ]);

}
