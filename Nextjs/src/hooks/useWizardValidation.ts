
"use client";

import { useMemo } from "react";

import { usePackageWizard } from "@/context/usePackageWizard";

import { validateWizard } from "@/lib/validation/package/validate-wizard";

export function useWizardValidation() {

    const {

        data,

        step,

    } = usePackageWizard();

    const errors = useMemo(

        () =>

            validateWizard(

                data,

            ),

        [data],

    );

    function hasErrors(

        object: unknown,

    ): boolean {

        if (

            Array.isArray(object)

        ) {

            return object.some(

                hasErrors,

            );

        }

        if (

            typeof object === "object" &&
            object !== null

        ) {

            return Object.values(

                object,

            ).some(

                hasErrors,

            );

        }

        return Boolean(object);

    }

    function canGoNext() {

        let result = true;

        switch (step) {

            case 0:

                result = !hasErrors(errors.package);

                break;

            case 1:

                result = !hasErrors(errors.flights);

                break;

            case 2:

                result = !hasErrors(errors.hotels);

                break;

            case 3:

                result = !hasErrors(errors.transports);

                break;

            case 4:

                result = !hasErrors(errors.excursions);

                break;

            default:

                result = true;

        }

        console.group("===== Wizard Validation =====");

        console.log("Step :", step);

        console.log("Result :", result);

        console.log("Package errors :", errors.package);

        console.log("Flight errors :", errors.flights);

        console.log("Hotel errors :", errors.hotels);

        console.log("Transport errors :", errors.transports);

        console.log("Excursion errors :", errors.excursions);

        console.log("Global errors :", errors.global);

        console.groupEnd();

        return result;

    }

    function canSubmit() {

        return !hasErrors(

            errors,

        );

    }

    return {

        errors,

        canGoNext,

        canSubmit,

    };

}
