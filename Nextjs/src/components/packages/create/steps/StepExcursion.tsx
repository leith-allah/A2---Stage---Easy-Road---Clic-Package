
"use client";

import { useWizardUpdater } from "@/hooks/useWizardUpdater";
import { usePackageWizard } from "@/context/usePackageWizard";
import { useWizardValidation } from "@/hooks/useWizardValidation";

import FormSection from "../ui/FormSection";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import StepNavigation from "../ui/StepNavigation";

export default function StepExcursion() {

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

    const excursionErrors = errors.excursions;

    const {

        updateExcursion,

    } = useWizardUpdater(setData);

    function handleNext() {

        if (!canGoNext()) return;

        next();

    }

    return (

        <div className="space-y-6">

            <FormSection title="Informations de l'excursion">

                <FormInput
                    label="Nom"
                    value={data.excursions[0].name}
                    error={excursionErrors[0]?.name}
                    onChange={(value) =>
                        updateExcursion(
                            0,
                            "name",
                            value
                        )
                    }
                />

                <FormInput
                    label="Lieu"
                    value={data.excursions[0].location}
                    error={excursionErrors[0]?.location}
                    onChange={(value) =>
                        updateExcursion(
                            0,
                            "location",
                            value
                        )
                    }
                />

                <FormTextarea
                    label="Description"
                    rows={5}
                    value={data.excursions[0].description}
                    error={excursionErrors[0]?.description}
                    onChange={(value) =>
                        updateExcursion(
                            0,
                            "description",
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
