
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { usePackageWizard } from "@/context/usePackageWizard";

import FormSection from "@/components/packages/create/ui/FormSection";


export default function StepReview() {

    const {

        data,

        previous,

    } = usePackageWizard();

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const pack = data.package;

    const flight = data.flights[0];

    const hotel = data.hotels[0];

    const transport = data.transports[0];

    const excursion = data.excursions[0];

    const flightSupplements = [
        {
            label: "Economy",
            value: data.supplements.ECONOMY,
        },
        {
            label: "Business",
            value: data.supplements.BUSINESS,
        },
        {
            label: "First",
            value: data.supplements.FIRST,
        },
    ];

    const roomSupplements = [
        {
            label: "Single",
            value: data.supplements.SINGLE,
        },
        {
            label: "Double",
            value: data.supplements.DOUBLE,
        },
        {
            label: "Triple",
            value: data.supplements.TRIPLE,
        },
        {
            label: "Quadruple",
            value: data.supplements.QUADRUPLE,
        },
        {
            label: "Suite",
            value: data.supplements.SUITE,
        },
    ];

    const boardSupplements = [
        {
            label: "Bed Only",
            value: data.supplements.BED_ONLY,
        },
        {
            label: "Bed & Breakfast",
            value: data.supplements.BED_BREAKFAST,
        },
        {
            label: "Half Board",
            value: data.supplements.HALF_BOARD,
        },
        {
            label: "Full Board",
            value: data.supplements.FULL_BOARD,
        },
        {
            label: "All Inclusive",
            value: data.supplements.ALL_INCLUSIVE,
        },
    ];

    const packagePrice =
        Number(pack.basePrice ?? 0);

    const formatDate = (date?: string | null) =>
        date
            ? new Date(date).toLocaleDateString("fr-FR")
            : "-";
    
    function renderSupplements(
        supplements: {
            label: string;
            value: number;
        }[]
    ) {

        const active = supplements.filter(
            supplement => supplement.value > 0
        );

        if (active.length === 0) {

            return (

                <p className="italic text-gray-500">

                    Aucun supplément disponible.

                </p>

            );

        }

        return active.map(supplement => (

            <p key={supplement.label}>

                ✓ <b>{supplement.label}</b> : +{supplement.value} DZD

            </p>

        ));

    }

    const validatePackage = async () => {

        try {

            setLoading(true);

            const dto = {

                package: {

                    ...data.package,

                },

                supplements: {
                    ...data.supplements,
                },

                flights: data.flights.map(flight => ({

                    status: flight.status,

                    flightNumber: flight.flightNumber,

                    departureDateTime: flight.departureDateTime,

                    arrivalDateTime: flight.arrivalDateTime,

                    airlineId:

                        flight.airline!.id,

                    departureAirportId:

                        flight.departureAirport!.id,

                    arrivalAirportId:

                        flight.arrivalAirport!.id,

                })),

                hotels: data.hotels.map(hotel => ({

                    name: hotel.name,

                    stars: hotel.stars,

                    country: hotel.country,

                    city: hotel.city,

                    address: hotel.address,

                })),

                transports: data.transports.map(transport => ({

                    route: transport.route,

                    company: transport.company,

                })),

                excursions: data.excursions.map(excursion => ({

                    name: excursion.name,

                    location: excursion.location,

                    description: excursion.description,

                })),

            };

            console.log(
                "DTO envoyé",
                JSON.stringify(dto, null, 2)
            );

            const response = await fetch(

                "/api/packages",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                    },

                    body: JSON.stringify(dto),

                }

            );

            if (!response.ok) {

                const error = await response.json();

                throw new Error(error.message);

            }

            const result = await response.json();

            alert("Package créé avec succès !");

            router.push(

                `/dashboard/admin/packages/${result.id}`

            );

        }

        catch (error) {

            console.error(error);

            alert(

                error instanceof Error

                    ? error.message

                    : "Erreur"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return(

        <div className="space-y-8">

            <h2 className="text-2xl font-bold">

                Vérification du Package

            </h2>

            {/* PACKAGE */}

            <FormSection title="Package">

                <p><b>Nom :</b> {pack.name}</p>

                <p><b>Pays :</b> {pack.country}</p>

                <p><b>Destination :</b> {pack.destination}</p>

                <p><b>Description :</b> {pack.description || "-"}</p>

                <p><b>Image :</b> {pack.image || "-"}</p>


                <p>
                    <b>Date aller :</b>{" "}
                    {formatDate(pack.departureDate)}
                </p>

                <p>
                    <b>Date retour :</b>{" "}
                    {formatDate(pack.returnDate)}
                </p>

                <p>
                    <b>Stock total :</b>{" "}
                    {pack.totalStock} places
                </p>

            </FormSection>

            {/* VOL */}

            <FormSection title="Vol">

                <p><b>Statut :</b> {flight?.status}</p>

                <p><b>Numéro :</b> {flight?.flightNumber}</p>

                <p>
                    <b>Compagnie :</b>{" "}
                    {flight?.airline?.name ?? "-"}
                </p>

                <p>
                    <b>Aéroport de départ :</b>{" "}
                    {flight?.departureAirport?.name ?? "-"}
                </p>

                <p>
                    <b>Aéroport d'arrivée :</b>{" "}
                    {flight?.arrivalAirport?.name ?? "-"}
                </p>


                <p>
                    <b>Départ :</b>{" "}
                    {flight?.departureDateTime
                        ? new Date(flight.departureDateTime).toLocaleString("fr-FR")
                        : "-"}
                </p>

                <p>
                    <b>Arrivée :</b>{" "}
                    {flight?.arrivalDateTime
                        ? new Date(flight.arrivalDateTime).toLocaleString("fr-FR")
                        : "-"}
                </p>


                <p>
                    <b>Classe par défaut :</b>{" "}
                    {data.supplements.defaultFlightClass}
                </p>


                <h4 className="font-semibold">
                    Suppléments de vol
                </h4>

                {renderSupplements(flightSupplements)}

            </FormSection>

            {/* HOTEL */}

            <FormSection title="Hôtel">

                <p><b>Nom :</b> {hotel?.name}</p>
                <p><b>Pays :</b> {hotel?.country}</p>
                <p><b>Ville :</b> {hotel?.city}</p>
                <p><b>Etoiles :</b> {hotel?.stars} ⭐</p>
                <p><b>Adresse :</b> {hotel?.address}</p>


                <p>
                <b>Chambre par défaut :</b>{" "}
                    {data.supplements.defaultRoomType}
                </p>

                <p>
                <b>Pension par défaut :</b>{" "}
                    {data.supplements.defaultBoardType}
                </p>


                <h4 className="font-semibold">
                    Suppléments Chambre
                </h4>

                {renderSupplements(roomSupplements)}


                <h4 className="font-semibold">
                    Suppléments Pension
                </h4>

                {renderSupplements(boardSupplements)}

            </FormSection>

            {/* TRANSPORT */}

            <FormSection title="Transport">

                <p><b>Trajet :</b> {transport?.route}</p>
                <p><b>Société :</b> {transport?.company}</p>

            </FormSection>

            {/* EXCURSION */}

            <FormSection title="Excursion">

                <p><b>Nom :</b> {excursion?.name}</p>
                <p><b>Lieu :</b> {excursion?.location}</p>
                <p><b>Description :</b> {excursion?.description}</p>

            </FormSection>

            {/* PRIX */}

            <FormSection title="Prix">

                <div className="flex items-center justify-between">

                    <span className="font-medium">

                        Prix de base du package

                    </span>

                    <span className="text-2xl font-bold text-primary">

                        {packagePrice.toLocaleString("fr-FR")} DZD

                    </span>

                </div>

                <p className="text-sm text-gray-500 italic">

                    Les suppléments affichés ci-dessus seront appliqués
                    uniquement lors de la réservation selon les choix
                    du client (classe de vol, chambre, pension).

                </p>

            </FormSection>

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
