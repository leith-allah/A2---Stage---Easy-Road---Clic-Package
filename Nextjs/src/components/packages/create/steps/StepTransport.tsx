
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
        step,
        setTouchedSteps,
    } = usePackageWizard();

    const {
        updateTransport,
        addTransport,
        duplicateTransport,
        removeTransport,
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

    const transportErrors = errors.transports ?? [];

    function handleNext() {

        if (!canGoNext()) return;

        next();

    }

    return (

        <div className="space-y-6">

{data.transports.map((transport, index) => (

                <FormSection
                    key={index}
                    title={`Transport ${index + 1}`}
                >

                    <FormInput
                        label="Trajet"
                        required
                        value={transport.route}
                        error={transportErrors[index]?.route}
                        onChange={(value) =>
                            updateTransport(
                                index,
                                "route",
                                value
                            )
                        }
                    />

                    <FormInput
                        label="Société"
                        value={transport.company}
                        error={transportErrors[index]?.company}
                        onChange={(value) =>
                            updateTransport(
                                index,
                                "company",
                                value
                            )
                        }
                    />

                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            className="btn"
                            onClick={() =>
                                duplicateTransport(index)
                            }
                        >
                            Dupliquer
                        </button>

                        <button
                            type="button"
                            className="btn btn-error"
                            disabled={data.transports.length === 1}
                            onClick={() =>
                                removeTransport(index)
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
                    onClick={addTransport}
                >
                    + Ajouter un transport
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
