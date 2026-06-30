
"use client";

import { useState } from "react";

type Props = {

    demandes: any[];

};

export default function AccountRequestTable({

    demandes,

}: Props) {

    const [loadingId, setLoadingId] =
        useState<bigint | null>(null);
    
    const [listeDemandes, setListeDemandes] =
        useState(demandes);


    async function accepter(id: bigint) {

        console.log("PATCH ACCEPT envoyé");

        setLoadingId(id);

        try {

            const response = await fetch(

                `/api/account-requests/${id}/accept`,

                {

                    method: "PATCH",

                }

            );

            const resultat = await response.json();

            if (!response.ok) {

                alert(resultat.message);

                return false;

            }

            setListeDemandes(

                ancienneListe =>

                    ancienneListe.map(

                        demande =>

                            demande.id_demande_creation === id

                                ? {

                                      ...demande,

                                      statut_demande_creation: "ACCEPTEE",

                                  }

                                : demande

                    )

            );

            return true;

        }

        catch {

            alert("Une erreur est survenue.");

            return false;

        }

        finally {

            setLoadingId(null);

        }

    }

    async function refuser(id: bigint) {

        setLoadingId(id);

        try {

            const response = await fetch(

                `/api/account-requests/${id}/reject`,

                {

                    method: "PATCH",

                }

            );

            const resultat = await response.json();

            if (!response.ok) {

                alert(resultat.message);

                return false;

            }

            setListeDemandes(

                ancienneListe =>

                    ancienneListe.map(

                        demande =>

                            demande.id_demande_creation === id

                                ? {

                                      ...demande,

                                      statut_demande_creation: "REFUSEE",

                                  }

                                : demande

                    )

            );

            return true;

        }

        catch {

            alert("Une erreur est survenue.");

            return false;

        }

        finally {

            setLoadingId(null);

        }

    }

    return (

        <div
            className="
                overflow-x-auto
                rounded-xl
                bg-white
                shadow
            "
        >

            <table
                className="
                    w-full
                    text-left
                "
            >

                <thead
                    className="
                        bg-gray-100
                    "
                >

                    <tr>

                        <th className="p-4">
                            Nom
                        </th>

                        <th className="p-4">
                            Email
                        </th>

                        <th className="p-4">
                            Rôle demandé
                        </th>

                        <th className="p-4">
                            Bureau
                        </th>

                        <th className="p-4">
                            Statut
                        </th>

                        <th className="p-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        listeDemandes.map((demande) => (

                            <tr
                                key={demande.id_demande_creation.toString()}
                                className="border-t"
                            >

                                <td className="p-4">

                                    {demande.prenom_user}{" "}

                                    {demande.nom_user}

                                </td>

                                <td className="p-4">

                                    {demande.email_user}

                                </td>

                                <td className="p-4">

                                    {demande.role.nom_role}

                                </td>

                                <td className="p-4">

                                    {demande.bureau_agence.ville_bureau}

                                </td>

                                <td className="p-4">

                                <span
                                    className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium

                                        ${
                                            demande.statut_demande_creation === "EN_ATTENTE"
                                                ? "bg-yellow-100 text-yellow-700"

                                            : demande.statut_demande_creation === "ACCEPTEE"
                                                ? "bg-green-100 text-green-700"

                                            : "bg-red-100 text-red-700"
                                        }
                                    `}
                                >

                                    {
                                        demande.statut_demande_creation === "EN_ATTENTE"

                                            ? "🟡 En attente"

                                        : demande.statut_demande_creation === "ACCEPTEE"

                                            ? "🟢 Acceptée"

                                        : "🔴 Refusée"
                                    }

                                </span>

                                </td>

                                <td className="p-4">

                                    {demande.statut_demande_creation === "EN_ATTENTE" ? (

                                        <div className="flex gap-2">

                                            <button
                                                disabled={loadingId === demande.id_demande_creation}
                                                onClick={() =>
                                                    accepter(demande.id_demande_creation)
                                                }
                                                
                                                className={`
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    text-white
                                                    transition

                                                    ${
                                                        loadingId === demande.id_demande_creation

                                                            ? "bg-gray-400 cursor-not-allowed"

                                                            : "bg-green-600 hover:bg-green-700"
                                                    }
                                                `}
                                            >
                                                {
                                                    loadingId === demande.id_demande_creation
                                                        ? "..."
                                                        : "Accepter"
                                                }
                                            </button>

                                            <button
                                                disabled={loadingId === demande.id_demande_creation}
                                                onClick={() =>
                                                    refuser(demande.id_demande_creation)
                                                }
                                                className={`
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    text-white
                                                    transition

                                                    ${
                                                        loadingId === demande.id_demande_creation

                                                            ? "bg-gray-400 cursor-not-allowed"

                                                            : "bg-red-600 hover:bg-red-700"
                                                    }
                                                `}
                                            >
                                                {
                                                    loadingId === demande.id_demande_creation
                                                        ? "..."
                                                        : "Refuser"
                                                }
                                            </button>

                                        </div>

                                    ) : (

                                        demande.statut_demande_creation === "ACCEPTEE" ? (

                                            <span
                                                className="
                                                    text-green-600
                                                    font-semibold
                                                "
                                            >
                                                ✓ Compte créé
                                            </span>

                                        ) : (

                                            <span
                                                className="
                                                    text-red-600
                                                    font-semibold
                                                "
                                            >
                                                ✗ Demande refusée
                                            </span>

                                        )

                                    )}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
