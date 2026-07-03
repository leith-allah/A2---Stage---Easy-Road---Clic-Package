
"use client";

import { useState } from "react";

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

}:Props){

    const [loading,setLoading]=useState(false);

    async function handleSubmit(){

        setLoading(true);

        try{

            /*
             * Création du transport
             */

            const transportResponse=await fetch("/api/transports",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(data.transport)

            });

            if(!transportResponse.ok){

                throw new Error("Impossible de créer le transport");

            }

            const createdTransport = await transportResponse.json();

            console.log("createdTransport =", createdTransport);
            console.log("id =", createdTransport.id);
            console.log("typeof =", typeof createdTransport.id);

            console.log("BODY ENVOYÉ :", {
                id_pack: data.id_pack,
                id_transp: createdTransport.id,
            });

            /*
             * Liaison Package ↔ Transport
             */

            const relationResponse=await fetch("/api/utilise",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    id_pack:data.id_pack,

                    id_transp:createdTransport.id

                })

            });

            if(!relationResponse.ok){

                throw new Error("Impossible de créer la relation transport");

            }

            setData((previous:any)=>({

                ...previous,

                id_transp: createdTransport.id,

            }));

            next();

        }

        catch(error){

            console.error(error);

            alert("Erreur lors de la création du transport");

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="space-y-6">

            <h2 className="text-xl font-bold">

                Transport

            </h2>

            <input

                className="input input-bordered w-full"

                placeholder="Trajet"

                value={data.transport.route}

                onChange={(e)=>
                setData((prev:any)=>({

                    ...prev,

                    transport:{

                        ...prev.transport,

                        route:e.target.value,

                    }

                }))
                }

            />

            <input

                className="input input-bordered w-full"

                placeholder="Société"

                value={data.transport.company}

                onChange={(e)=>
                setData((prev:any)=>({

                    ...prev,

                    transport:{

                        ...prev.transport,

                        company:e.target.value,

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
