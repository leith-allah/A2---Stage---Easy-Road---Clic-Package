
"use client";

import { useWizardUpdater } from "@/hooks/useWizardUpdater";
import { usePackageWizard } from "@/context/usePackageWizard";
import { useWizardValidation } from "@/hooks/useWizardValidation";

import FormSection from "../ui/FormSection";
import FormInput from "../ui/FormInput";
import StepNavigation from "../ui/StepNavigation";

export default function StepTransport() {

    const {

        data,

        setData,

        next,

        previous,

    } = usePackageWizard();

    const {

        errors,

        canGoNext,

    } = useWizardValidation();

    const transportErrors = errors.transports;

    const {

        updateTransport,

    } = useWizardUpdater(setData);

    function handleNext() {

        if (!canGoNext()) return;

        next();

    }

    return (

        <div className="space-y-6">

            <FormSection title="Informations du transport">

                <FormInput
                    label="Trajet"
                    value={data.transports[0].route}
                    error={transportErrors[0]?.route}
                    onChange={(value) =>
                        updateTransport(
                            0,
                            "route",
                            value
                        )
                    }
                />

                <FormInput
                    label="Société"
                    value={data.transports[0].company}
                    error={transportErrors[0]?.company}
                    onChange={(value) =>
                        updateTransport(
                            0,
                            "company",
                            value
                        )
                    }
                />

            </FormSection>

            <StepNavigation
                onPrevious={previous}
                onNext={handleNext}
                nextDisabled={!canGoNext()}
            />

        </div>

    );

}
