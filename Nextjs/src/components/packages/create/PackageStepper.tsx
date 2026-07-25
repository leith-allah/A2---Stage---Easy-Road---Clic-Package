
"use client";

import { usePackageWizard } from "@/context/usePackageWizard";
import { useWizardValidation } from "@/hooks/useWizardValidation";

type Props = {
    current: number;
};

const labels = [
    "Package",
    "Vol",
    "Hôtel",
    "Transport",
    "Excursion",
    "Validation",
];

export default function PackageStepper({
    current,
}: Props) {

    const {

        goToStep,

    } = usePackageWizard();

    const {

        canAccessStep,
        isStepValid,
        stepHasErrors,

    } = useWizardValidation();

    return (

        <div className="space-y-4">

            <div>

                <h2
                    className="
                        text-xl
                        font-bold
                        text-slate-800
                    "
                >

                    Assistant de création

                </h2>

                <p
                    className="
                        text-sm
                        text-slate-500
                    "
                >

                    Complétez chaque étape pour construire votre package.

                </p>

            </div>

            <div className="grid grid-cols-6 gap-3">

                {labels.map((label, index) => {

                    const accessible = canAccessStep(index);

                    return (

                        <button

                            key={label}

                            type="button"

                            disabled={!accessible}

                            onClick={() => {

                                if (accessible) {

                                    goToStep(index);

                                }

                            }}

                            className={`
                                relative

                                rounded-3xl

                                border

                                p-5

                                text-center

                                transition-all

                                duration-300

                                disabled:cursor-not-allowed

                                ${
                                    current === index

                                        ? `
                                            border-primary
                                            bg-primary
                                            text-white
                                            shadow-lg
                                            scale-[1.02]
                                        `

                                        : stepHasErrors(index)

                                        ? `
                                            border-red-400
                                            bg-red-50
                                            text-red-700
                                        `

                                        : isStepValid(index)

                                        ? `
                                            border-emerald-400
                                            bg-emerald-50
                                            text-emerald-700
                                        `

                                        : accessible

                                        ? `
                                            border-slate-200
                                            bg-white
                                            text-slate-600
                                            hover:border-slate-300
                                            hover:shadow-md
                                            cursor-pointer
                                        `

                                        : `
                                            border-slate-200
                                            bg-slate-50
                                            text-slate-400
                                        `
                                }
                            `}
                        >

                            <div
                                className="
                                    mb-2

                                    flex

                                    items-center

                                    justify-center
                                "
                            >

                                <div
                                    className={`
                                        flex

                                        h-10

                                        w-10

                                        items-center

                                        justify-center

                                        rounded-full

                                        text-lg

                                        font-bold

                                        ${
                                            current === index

                                                ? "bg-white text-primary"

                                                : stepHasErrors(index)

                                                ? "bg-red-500 text-white"

                                                : isStepValid(index)

                                                ? "bg-emerald-500 text-white"

                                                : "bg-slate-100 text-slate-600"
                                        }
                                    `}
                                >

                                    {

                                        isStepValid(index)

                                            ? "✓"

                                            : index + 1

                                    }

                                </div>

                            </div>

                            <div
                                className={`
                                    text-sm

                                    font-semibold

                                    tracking-wide

                                    ${
                                        current === index

                                            ? "text-white"

                                            : stepHasErrors(index)

                                            ? "text-red-700"

                                            : isStepValid(index)

                                            ? "text-emerald-700"

                                            : accessible

                                            ? "text-slate-600"

                                            : "text-slate-400"
                                    }
                                `}
                            >

                                {label}

                            </div>

                        </button>

                    );

                })}

            </div>

        </div>

    );

}
