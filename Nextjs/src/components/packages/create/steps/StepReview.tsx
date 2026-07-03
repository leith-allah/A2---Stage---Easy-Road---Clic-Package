
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
        Number(data.package?.basePrice ?? 0);

    const total =
        packagePrice;
    
    const validatePackage = () => {

        alert("Package créé avec succès !");

        router.push("/dashboard/admin/packages");

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

                <p><b>Compagnie :</b> {data.flight.airline}</p>

                <p><b>Numéro :</b> {data.flight.flightNumber}</p>

                <p><b>Départ :</b> {data.flight.departureLocation}</p>

                <p><b>Destination :</b> {data.flight.destination}</p>

                <hr className="my-3"/>

                <p><b>Date Aller :</b> {data.flight.departureDate}</p>

                <p><b>Heure Départ Aller :</b> {data.flight.departureTime}</p>

                <p><b>Heure Arrivée Aller :</b> {data.flight.arrivalTime}</p>

                <hr className="my-3"/>

                <p><b>Date Retour :</b> {data.flight.returnDate}</p>

                <p><b>Heure Départ Retour :</b> {data.flight.returnDepartureTime}</p>

                <p><b>Heure Arrivée Retour :</b> {data.flight.returnArrivalTime}</p>

            </div>

            {/* HOTEL */}

            <div className="rounded-lg border p-6">

                <h3 className="font-bold text-lg mb-4">

                    Hôtel

                </h3>

                <p><b>Nom :</b> {data.hotel?.name}</p>
                <p><b>Pays :</b> {data.hotel?.country}</p>
                <p><b>Ville :</b> {data.hotel?.city}</p>
                <p><b>Etoiles :</b> {data.hotel?.stars} ⭐</p>
                <p><b>Adresse :</b> {data.hotel?.address}</p>

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

                <p><b>Nom :</b> {data.excursion?.name}</p>
                <p><b>Lieu :</b> {data.excursion?.location}</p>
                <p>{data.excursion?.description}</p>

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
                    onClick={validatePackage}
                >
                    Valider le Package
                </button>

            </div>

        </div>

    );

}
