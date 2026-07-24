
"use client";

import { usePackageWizard } from "@/context/usePackageWizard";
import { useWizardUpdater } from "@/hooks/useWizardUpdater";
import { useWizardValidation } from "@/hooks/useWizardValidation";

import FormSection from "@/components/packages/create/ui/FormSection";
import FormInput from "@/components/packages/create/ui/FormInput";
import FormTextarea from "@/components/packages/create/ui/FormTextarea";
import StepNavigation from "@/components/packages/create/ui/StepNavigation";


export default function StepPackage() {

    const {

        data,
        setData,
        next,

    } = usePackageWizard();

    const { updatePackage} = useWizardUpdater(setData);

    const { errors, canGoNext } = useWizardValidation();

    const packageErrors = errors.package;

    function handleNext() {

        if (!canGoNext()) return;

        next();

    }

console.log("canGoNext :", canGoNext());
console.log("errors :", errors);
console.log("package :", data.package);

    return (

        <div className="space-y-8">

            <FormSection
                title="Informations générales"
            >

                <FormInput

                    label="Nom du Package"

                    value={data.package.name}

                    onChange={(value)=>

                        updatePackage(
                            "name",
                            value
                        )

                    }

                    error={packageErrors.name}

                    required

                />

                <FormInput

                    label="Pays"

                    value={data.package.country}

                    onChange={(value)=>

                        updatePackage(
                            "country",
                            value
                        )

                    }

                    error={packageErrors.country}

                    required

                />

                <FormInput

                    label="Destination"

                    value={data.package.destination}

                    onChange={(value)=>

                        updatePackage(
                            "destination",
                            value
                        )

                    }

                    error={packageErrors.destination}

                    required

                />

                <FormTextarea

                    label="Description"

                    rows={5}

                    value={data.package.description}

                    onChange={(value)=>

                        updatePackage(
                            "description",
                            value
                        )

                    }

                />

                <FormInput

                    label="URL de l'image"
                    placeholder="https://..."

                    value={data.package.image}

                    onChange={(value)=>

                        updatePackage(
                            "image",
                            value
                        )

                    }

                />

            </FormSection>

            <FormSection
                title="Dates"
            >

                <FormInput

                    type="date"

                    label="Date de départ"

                    value={data.package.departureDate}

                    onChange={(value)=>

                        updatePackage(
                            "departureDate",
                            value
                        )

                    }

                    error={packageErrors.departureDate}

                    required

                />

                <FormInput

                    type="date"

                    min={data.package.departureDate}

                    label="Date de retour"

                    value={data.package.returnDate}

                    onChange={(value)=>

                        updatePackage(
                            "returnDate",
                            value
                        )

                    }

                    error={packageErrors.returnDate}

                    required

                />

            </FormSection>

            <FormSection
                title="Tarification"
            >

                <FormInput

                    type="number"

                    min={0}

                    step={0.01}

                    label="Prix de base"

                    value={data.package.basePrice}

                    onChange={(value)=>

                        updatePackage(
                            "basePrice",
                            Number(value)
                        )

                    }

                    error={packageErrors.basePrice}

                    required

                />

                <FormInput

                    type="number"

                    min={1}

                    label="Nombre total de places"

                    value={data.package.totalStock}

                    onChange={(value)=>

                        updatePackage(
                            "totalStock",
                            Number(value)
                        )

                    }

                    error={packageErrors.totalStock}

                    required

                />

            </FormSection>


            <StepNavigation
                onNext={handleNext}
                nextDisabled={!canGoNext()}
            />

        </div>

    );

}
