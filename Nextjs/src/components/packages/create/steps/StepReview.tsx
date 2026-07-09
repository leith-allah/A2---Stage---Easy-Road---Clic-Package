
"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";


interface Props{

    data:any;

    previous:()=>void;

}

export default function StepReview({

    data,

    previous

}:Props){

    const [loading, setLoading] = useState(false);

    const router=useRouter();

    const packagePrice =
        Number(data.package?.basePrice ?? 0);

    const total =
        packagePrice;
    
    const validatePackage = async () => {

        try {

            setLoading(true);

            const response = await fetch("/api/packages", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                },

                body: JSON.stringify(data),

            });

            if (!response.ok) {

                throw new Error("Erreur création package");

            }

            const result = await response.json();

            alert("Package créé avec succès !");

            router.push(`/dashboard/admin/packages/${result.id}`);

        } catch (error) {

            console.error(error);

            alert("Impossible de créer le package");

        } finally {

            setLoading(false);

        }

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

                <p><b>Nom :</b> {data.package?.name}</p>
                <p><b>Pays :</b> {data.package?.country}</p>
                <p><b>Destination :</b> {data.package?.destination}</p>
                <p><b>Description :</b> {data.package?.description}</p>
                <p><b>Image :</b> {data.package?.image}</p>
                <p><b>Date Aller :</b> {data.package?.departureDate}</p>
                <p><b>Date Retour :</b> {data.package?.returnDate}</p>
                <p><b>Places :</b> {data.package?.availableSeats}</p>

            </div>

            {/* VOL */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">
                    Vol
                </h3>

                <p><b>Compagnie :</b> {data.flights[0]?.airline}</p>

                <p><b>Numéro :</b> {data.flights[0]?.flightNumber}</p>

                <p><b>Départ :</b> {data.flights[0]?.departureLocation}</p>

                <p><b>Destination :</b> {data.flights[0]?.destination}</p>

                <hr className="my-3"/>

                <p><b>Date Aller :</b> {data.flights[0]?.departureDate}</p>

                <p><b>Heure Départ Aller :</b> {data.flights[0]?.departureTime}</p>

                <p><b>Heure Arrivée Aller :</b> {data.flights[0]?.arrivalTime}</p>

                <hr className="my-3"/>

                <p><b>Date Retour :</b> {data.flights[0]?.returnDate}</p>

                <p><b>Heure Départ Retour :</b> {data.flights[0]?.returnDepartureTime}</p>

                <p><b>Heure Arrivée Retour :</b> {data.flights[0]?.returnArrivalTime}</p>

            </div>

            {/* HOTEL */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Hôtel

                </h3>

                <p><b>Nom :</b> {data.hotels[0]?.name}</p>
                <p><b>Pays :</b> {data.hotels[0]?.country}</p>
                <p><b>Ville :</b> {data.hotels[0]?.city}</p>
                <p><b>Etoiles :</b> {data.hotels[0]?.stars} ⭐</p>
                <p><b>Adresse :</b> {data.hotels[0]?.address}</p>

            </div>

            {/* TRANSPORT */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Transport

                </h3>

                <p><b>Trajet :</b> {data.transports[0]?.route}</p>
                <p><b>Société :</b> {data.transports[0]?.company}</p>

            </div>

            {/* EXCURSION */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Excursion

                </h3>

                <p><b>Nom :</b> {data.excursions[0]?.name}</p>
                <p><b>Lieu :</b> {data.excursions[0]?.location}</p>
                <p>{data.excursions[0]?.description}</p>

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
                    disabled={loading}
                    onClick={validatePackage}
                >

                    {loading
                        ? "Création..."
                        : "Valider le Package"}

                </button>

            </div>

        </div>

    );

}
