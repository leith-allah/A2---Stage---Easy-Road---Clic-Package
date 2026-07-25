
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
        touchedSteps,
        step,
        setTouchedSteps,

    } = usePackageWizard();

    const {

        updatePackage,

    } = useWizardUpdater(

        setData,
        step,
        setTouchedSteps,

    );

    const { errors, canGoNext } = useWizardValidation();

    const packageErrors = errors.package;

    const showErrors = touchedSteps.includes(0);

    function handleNext() {

        if (!canGoNext()) return;

        next();

    }

    // Date d'aujourd'hui au format YYYY-MM-DD pour l'attribut min
    const today = new Date().toISOString().split("T")[0];

console.log("canGoNext :", canGoNext());
console.log("errors :", errors);
console.log("package :", data.package);

    return (

        <div className="space-y-8">

            <div className="space-y-2">

                <h1 className="text-3xl font-bold text-slate-800">

                    📦 Création du package

                </h1>

                <p className="text-slate-500 max-w-3xl">

                    Commencez par renseigner les informations principales de votre
                    offre. Elles permettront aux agences d'identifier rapidement
                    votre package.

                </p>

            </div>

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

                    error={showErrors ? packageErrors.name : undefined}

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

                    error={showErrors ? packageErrors.country : undefined}

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

                    error={showErrors ? packageErrors.destination : undefined}

                    required

                />

                <hr className="border-slate-200" />

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

                    error={showErrors ? packageErrors.description : undefined} 

                />

                <hr className="border-slate-200" />

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

                <div className="grid md:grid-cols-2 gap-6">

                    <FormInput

                        type="date"

                        min={today}

                        label="Date de départ"

                        value={data.package.departureDate}

                        onChange={(value)=>

                            updatePackage(
                                "departureDate",
                                value
                            )

                        }

                        error={showErrors ? packageErrors.departureDate : undefined}

                        required

                    />

                    <FormInput

                        type="date"

                        min={data.package.departureDate || today}

                        label="Date de retour"

                        value={data.package.returnDate}

                        onChange={(value)=>

                            updatePackage(
                                "returnDate",
                                value
                            )

                        }

                        error={showErrors ? packageErrors.returnDate : undefined}

                        required

                    />

                </div>

            </FormSection>

            <FormSection
                title="Tarification"
            >

                <div className="grid md:grid-cols-2 gap-6">

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

                        error={showErrors ? packageErrors.basePrice : undefined}

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

                        error={showErrors ? packageErrors.totalStock : undefined}

                        required

                    />

                </div>

            </FormSection>


            <StepNavigation
                onNext={handleNext}
                nextDisabled={!canGoNext()}
            />

        </div>

    );

}
