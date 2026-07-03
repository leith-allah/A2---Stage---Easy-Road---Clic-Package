
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

    async function handleSubmit(){

        setLoading(true);

        try{

            /*
            * Création Excursion
            */

            const excursionResponse = await fetch("/api/excursions",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    nom_exc:data.excursion.name,

                    lieu_exc:data.excursion.location,

                    description_exc:data.excursion.description

                })

            });

            if(!excursionResponse.ok){

                throw new Error("Impossible de créer l'excursion");

            }

            const createdExcursion = await excursionResponse.json();

            console.log(createdExcursion);
            console.log(createdExcursion.id);
            console.log(typeof createdExcursion.id);

            console.log({
                id_pack: data.id_pack,
                id_exc: createdExcursion.id
            });

            /*
            * Relation Package ↔ Excursion
            */

            const relationResponse = await fetch("/api/propose",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    id_pack:data.id_pack,

                    id_exc:createdExcursion.id

                })

            });

            if(!relationResponse.ok){

                throw new Error("Impossible de créer la relation");

            }

            setData((previous:any)=>({

                ...previous,

                id_exc: createdExcursion.id,

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

                value={data.excursion.name}

                onChange={(e)=>
                setData((prev:any)=>({

                    ...prev,

                    excursion:{

                        ...prev.excursion,

                        name:e.target.value

                    }

                }))
                }

            />

            <input

                className="input input-bordered w-full"

                placeholder="Lieu"

                value={data.excursion.location}

                onChange={(e)=>
                setData((prev:any)=>({

                    ...prev,

                    excursion:{

                        ...prev.excursion,

                        location:e.target.value,

                    }

                }))
                }

            />

            <textarea

                className="textarea textarea-bordered w-full"

                rows={5}

                placeholder="Description"

                value={data.excursion.description}

                onChange={(e)=>

                    setData((prev:any)=>({

                        ...prev,

                        excursion:{

                            ...prev.excursion,

                        description:e.target.value

                        }
                    }))
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
