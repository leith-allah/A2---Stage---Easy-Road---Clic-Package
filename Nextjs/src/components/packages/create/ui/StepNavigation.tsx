
"use client";

interface Props {

    onPrevious?: () => void;

    previousDisabled?: boolean;

    onNext: () => void;

    nextDisabled?: boolean;

    nextLabel?: string;

    loading?: boolean;

}

export default function StepNavigation({

    onPrevious,

    previousDisabled = false,

    onNext,

    nextDisabled = false,

    nextLabel = "Continuer",

    loading = false,

}: Props) {

    return (

        <div
            className="
                flex
                items-center
                justify-between

                border-t
                border-slate-200

                pt-8
                mt-8
            "
        >

            {onPrevious ? (

                <button

                    type="button"

                    disabled={previousDisabled}

                    onClick={onPrevious}

                    className="
                        inline-flex

                        items-center

                        gap-2

                        rounded-2xl

                        border

                        border-slate-300

                        bg-white

                        px-6

                        py-3

                        font-semibold

                        text-slate-700

                        shadow-sm

                        transition-all

                        duration-200

                        hover:border-slate-400

                        hover:shadow-md

                        hover:-translate-y-0.5

                        active:translate-y-0

                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:hover:shadow-sm
                        disabled:hover:-translate-y-0
                    "

                >

                    ← Retour

                </button>

            ) : (

                <div />

            )}

            <button

                type="button"

                disabled={loading || nextDisabled}

                onClick={onNext}

                className="
                    inline-flex

                    items-center

                    gap-2

                    rounded-2xl

                    bg-blue-600

                    px-8

                    py-3

                    font-semibold

                    text-white

                    shadow-lg

                    transition-all

                    duration-200

                    hover:scale-[1.02]

                    hover:shadow-xl

                    active:scale-[0.99]

                    disabled:cursor-not-allowed

                    disabled:opacity-50

                    disabled:hover:scale-100
                "

            >

                {

                    loading

                        ? "Chargement..."

                        : nextLabel

                }

                →

            </button>

        </div>

    );

}
