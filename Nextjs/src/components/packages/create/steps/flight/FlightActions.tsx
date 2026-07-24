
"use client";

interface FlightActionsProps {

    onAddFlight: () => void;

}

export default function FlightActions({

    onAddFlight,

}: FlightActionsProps) {

    return (

        <div className="flex justify-center">

            <button

                type="button"

                className="btn btn-success"

                onClick={onAddFlight}

            >

                + Ajouter un vol

            </button>

        </div>

    );

}
