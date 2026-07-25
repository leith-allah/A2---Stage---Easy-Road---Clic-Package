
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

        step,
        setTouchedSteps,        

    } = usePackageWizard();

    const {
        updateExcursion,
        addExcursion,
        duplicateExcursion,
        removeExcursion,
    } = useWizardUpdater(
        setData,
        step,
        setTouchedSteps
    );

    const {

        errors,

        canGoNext,

        canLeaveCurrentStep,

    } = useWizardValidation();

    const excursionErrors = errors.excursions ?? [];

    function handleNext() {

        if (!canGoNext()) return;

        next();

    }

    return (

        <div className="space-y-6">

            {data.excursions.map((excursion, index) => (

                <FormSection
                    key={index}
                    title={`Excursion ${index + 1}`}
                >

                    <FormInput
                        label="Nom"
                        required
                        value={excursion.name}
                        error={excursionErrors[index]?.name}
                        onChange={(value) =>
                            updateExcursion(
                                index,
                                "name",
                                value
                            )
                        }
                    />

                    <FormInput
                        label="Lieu"
                        required
                        value={excursion.location}
                        error={excursionErrors[index]?.location}
                        onChange={(value) =>
                            updateExcursion(
                                index,
                                "location",
                                value
                            )
                        }
                    />

                    <FormTextarea
                        label="Description"
                        required
                        rows={5}
                        value={excursion.description}
                        error={excursionErrors[index]?.description}
                        onChange={(value) =>
                            updateExcursion(
                                index,
                                "description",
                                value
                            )
                        }
                    />

                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            className="btn"
                            onClick={() =>
                                duplicateExcursion(index)
                            }
                        >
                            Dupliquer
                        </button>

                        <button
                            type="button"
                            className="btn btn-error"
                            disabled={data.excursions.length === 1}
                            onClick={() =>
                                removeExcursion(index)
                            }
                        >
                            Supprimer
                        </button>

                    </div>

                </FormSection>

            ))}

            <div className="flex justify-center">

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={addExcursion}
                >
                    + Ajouter une excursion
                </button>

            </div>

            <hr className="my-6" />

            <StepNavigation
                onPrevious={previous}
                previousDisabled={!canLeaveCurrentStep()}
                onNext={handleNext}
                nextDisabled={!canGoNext()}
            />

        </div>

    );

}
