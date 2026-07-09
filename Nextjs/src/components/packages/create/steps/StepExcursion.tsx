
"use client";

import { useWizardUpdater } from "@/hooks/useWizardUpdater";


interface Props {
    data:any;
    setData:any;
    next:()=>void;
    previous:()=>void;
}

export default function StepExcursion({
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
                Excursion
            </h2>

            <input

                className="input input-bordered w-full"
                placeholder="Nom"
                value={data.excursions[0].name}
                onChange={(e)=>
                    updateItem(
                        "excursions",
                        0,
                        "name",
                        e.target.value
                    )
                }
            />

            <input

                className="input input-bordered w-full"
                placeholder="Lieu"
                value={data.excursions[0].location}
                onChange={(e)=>
                    updateItem(
                        "excursions",
                        0,
                        "location",
                        e.target.value
                    )
                }
            />

            <textarea

                className="textarea textarea-bordered w-full"
                rows={5}
                placeholder="Description"
                value={data.excursions[0].description}
                onChange={(e)=>
                    updateItem(
                        "excursions",
                        0,
                        "description",
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
