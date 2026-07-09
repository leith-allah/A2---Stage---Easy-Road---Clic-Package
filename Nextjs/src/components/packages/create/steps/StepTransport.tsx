
"use client";

import { useWizardUpdater } from "@/hooks/useWizardUpdater";


interface Props {
    data:any;
    setData:any;
    next:()=>void;
    previous:()=>void;
}

export default function StepTransport({
    data,
    setData,
    next,
    previous
}: Props){

    function handleNext() {
        next();
    }

    const { updateItem } =
        useWizardUpdater(setData);

    return(

        <div className="space-y-6">

            <h2 className="text-xl font-bold">
                Transport
            </h2>

            <input

                className="input input-bordered w-full"
                placeholder="Trajet"
                value={data.transports[0].route}
                onChange={(e)=>
                    updateItem(
                        "transports",
                        0,
                        "route",
                        e.target.value
                    )
                }
            />

            <input

                className="input input-bordered w-full"
                placeholder="Société"
                value={data.transports[0].company}
                onChange={(e)=>
                    updateItem(
                        "transports",
                        0,
                        "company",
                        e.target.value
                    )
                }
            />

            <div className="flex justify-between">

                <button

                    className="btn"

                    onClick={previous}

                >

                    Retour

                </button>

                <button

                    className="btn btn-primary"

                    onClick={handleNext}

                >

                    Continuer

                </button>

            </div>

        </div>

    );

}
