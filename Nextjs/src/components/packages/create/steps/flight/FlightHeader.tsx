
"use client";

interface FlightHeaderProps {

    index: number;

    canDelete: boolean;

    onDuplicate: () => void;

    onDelete: () => void;

}

export default function FlightHeader({

    index,

    canDelete,

    onDuplicate,

    onDelete,

}: FlightHeaderProps) {

    return (

        <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">

                Vol {index + 1}

            </h2>

            <div className="flex gap-2">

                <button

                    type="button"

                    className="btn btn-outline"

                    onClick={onDuplicate}

                >

                    Dupliquer

                </button>

                <button

                    type="button"

                    className="btn btn-error"

                    disabled={!canDelete}

                    onClick={onDelete}

                >

                    Supprimer

                </button>

            </div>

        </div>

    );

}
