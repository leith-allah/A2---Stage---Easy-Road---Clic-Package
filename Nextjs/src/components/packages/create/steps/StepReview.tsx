
"use client";

import { useRouter } from "next/navigation";


interface Props{

    data:any;

    previous:()=>void;

}

export default function StepReview({

    data,

    previous

}:Props){

    const router=useRouter();

    const packagePrice =
        Number(data.package?.prix_base_pack ?? 0);

    const total =
        packagePrice;
    
    const validatePurchase = async () => {

        const response = await fetch("/api/purchases",{

            method:"POST",

            headers:{

                "Content-Type":"application/json",

            },

            body:JSON.stringify({

                packageId:data.id_pack,

                nbVoyageurs:data.nbVoyageurs,

                classeVol:data.classeVol,

                typeChambre:data.typeChambre,

                pension:data.pension,

            }),

        });

        if(!response.ok){

            const error=await response.json();

            alert(error.message ?? "Erreur");

            return;

        }

        alert("Package acheté avec succès !");

        router.push("/dashboard/client/voyages");

    };

    return(

        <div className="space-y-8">

            <h2 className="text-2xl font-bold">

                Vérification du Package

            </h2>

            {/* PACKAGE */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Package

                </h3>

                <p><b>Nom :</b> {data.package?.nom_pack}</p>

                <p><b>Pays :</b> {data.package?.pays_pack}</p>

                <p><b>Destination :</b> {data.package?.destination_pack}</p>

                <p><b>Date Aller :</b> {data.package?.date_depart_pack}</p>

                <p><b>Date Retour :</b> {data.package?.date_retour_pack}</p>

            </div>

            {/* VOL */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Vol

                </h3>

                <p><b>Compagnie :</b> {data.flight?.compagnie_vol}</p>

                <p><b>Départ :</b> {data.flight?.lieu_depart_vol}</p>

                <p><b>Destination :</b> {data.flight?.destination_vol}</p>

                <p><b>Numéro :</b> {data.flight?.num_vol}</p>

            </div>

            {/* HOTEL */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Hôtel

                </h3>

                <p><b>Nom :</b> {data.hotel?.nom_hot}</p>

                <p><b>Pays :</b> {data.hotel?.pays_hot}</p>

                <p><b>Ville :</b> {data.hotel?.ville_hot}</p>

                <p><b>Etoiles :</b> {data.hotel?.nb_etoiles_hot} ⭐</p>

            </div>

            {/* TRANSPORT */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Transport

                </h3>

                <p><b>Trajet :</b> {data.transport?.route}</p>

                <p><b>Société :</b> {data.transport?.company}</p>

            </div>

            {/* EXCURSION */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Excursion

                </h3>

                <p><b>Nom :</b> {data.excursion?.nom_exc}</p>

                <p><b>Lieu :</b> {data.excursion?.lieu_exc}</p>

                <p>{data.excursion?.description_exc}</p>

            </div>

            {/* PRIX */}

            <div className="rounded-lg border-2 border-primary p-6">

                <h3 className="text-xl font-bold">

                    Prix

                </h3>

                <div className="mt-3 flex justify-between">

                    <span>Prix du Package</span>

                    <span>{packagePrice} DZD</span>

                </div>

                <hr className="my-3"/>

                <div className="flex justify-between text-2xl font-bold">

                    <span>Total</span>

                    <span>{total} DZD</span>

                </div>

            </div>

            <div className="flex justify-between">

                <button

                    className="btn"

                    onClick={previous}

                >

                    Retour

                </button>

                <button

                    className="btn btn-success"

                    onClick={validatePurchase}

                >

                    Valider le Package

                </button>

            </div>

        </div>

    );

}
