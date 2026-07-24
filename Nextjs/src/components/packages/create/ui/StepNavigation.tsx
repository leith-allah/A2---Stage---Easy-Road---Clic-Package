
"use client";

interface Props {

    onPrevious?: () => void;

    onNext: () => void;

    nextDisabled?: boolean;

    nextLabel?: string;

    loading?: boolean;

}

export default function StepNavigation({

    onPrevious,

    onNext,

    nextDisabled = false,

    nextLabel = "Continuer",

    loading = false,

}: Props) {

    return (

        <div className="flex justify-between pt-8">

            {onPrevious ? (

                <button

                    type="button"

                    className="btn"

                    onClick={onPrevious}

                >

                    Retour

                </button>

            ) : (

                <div />

            )}

            <button

                type="button"

                className="btn btn-primary"

                onClick={onNext}

                disabled={loading || nextDisabled}

            >

                {loading ? "Chargement..." : nextLabel}

            </button>

        </div>

    );

}
