
"use client";

import { useState } from "react";

interface Props{

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

}:Props){

    const [loading,setLoading]=useState(false);

    const [excursion,setExcursion]=useState({

        nom_exc:"",

        lieu_exc:"",

        description_exc:""

    });

    async function handleSubmit(){

        setLoading(true);

        try{

            /*
             * Création Excursion
             */

            const excursionResponse=await fetch("/api/excursions",{

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(excursion)

            });

            if(!excursionResponse.ok){

                throw new Error("Impossible de créer l'excursion");

            }

            const createdExcursion=await excursionResponse.json();

            /*
             * Relation Package ↔ Excursion
             */

            const relationResponse=await fetch("/api/propose",{

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    id_pack:data.id_pack,

                    id_exc:createdExcursion.id_exc

                })

            });

            if(!relationResponse.ok){

                throw new Error("Impossible de créer la relation");

            }

            setData((previous:any)=>({

                ...previous,

                id_exc:createdExcursion.id,

                excursion

            }));

            next();

        }

        catch(error){

            console.error(error);

            alert("Erreur lors de la création");

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="space-y-6">

            <h2 className="text-xl font-bold">

                Excursion

            </h2>

            <input

                className="input input-bordered w-full"

                placeholder="Nom"

                value={excursion.nom_exc}

                onChange={(e)=>

                    setExcursion({

                        ...excursion,

                        nom_exc:e.target.value

                    })

                }

            />

            <input

                className="input input-bordered w-full"

                placeholder="Lieu"

                value={excursion.lieu_exc}

                onChange={(e)=>

                    setExcursion({

                        ...excursion,

                        lieu_exc:e.target.value

                    })

                }

            />

            <textarea

                className="textarea textarea-bordered w-full"

                rows={5}

                placeholder="Description"

                value={excursion.description_exc}

                onChange={(e)=>

                    setExcursion({

                        ...excursion,

                        description_exc:e.target.value

                    })

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

                    onClick={handleSubmit}

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Création..."

                        :

                        "Continuer"

                    }

                </button>

            </div>

        </div>

    );

}
