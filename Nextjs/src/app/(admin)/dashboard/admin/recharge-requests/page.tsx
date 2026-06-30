
"use client";

import { useEffect } from "react";
import { useState } from "react";

import {

  getAllRechargeRequests,

  approveRechargeRequest,

  rejectRechargeRequest,

}

from "@/features/recharge-requests/services/admin-recharge-request.service";

export default function RechargeRequestsPage() {

  const [

    requests,

    setRequests,

  ] = useState<any[]>([]);

  async function load() {

    const data =
      await getAllRechargeRequests();

    setRequests(data);
  }

  useEffect(() => {

    load();

  }, []);

  async function approve(id: number) {

    await approveRechargeRequest(id);

    await load();
  }

  async function reject(id: number) {

    await rejectRechargeRequest(id);

    await load();
  }

  return (

    <section className="p-8">

      <h1 className="text-3xl font-bold mb-6">

        Demandes de rechargement

      </h1>

      <div className="space-y-4">

        {requests.map((request) => (

          <div

            key={request.id_demande_recharge}

            className="
              bg-white
              rounded-xl
              shadow
              p-4
            "

          >

            <p>

              Utilisateur :

              {request.id_user}

            </p>

            <p>

              Montant :

              {request.montant_demande_recharge} DZD

            </p>

            <p>

              Statut :

              {request.statut_demande_recharge}

            </p>

            <p>

              {request.comment_demande_recharge}

            </p>

            {

              request.statut_demande_recharge ===
              "EN_ATTENTE"

              && (

                <div className="flex gap-2 mt-4">

                  <button

                    onClick={() =>
                      approve(
                        request.id_demande_recharge
                      )
                    }

                    className="
                      px-4
                      py-2
                      bg-green-600
                      text-white
                      rounded-lg
                    "

                  >

                    Valider

                  </button>

                  <button

                    onClick={() =>
                      reject(
                        request.id_demande_recharge
                      )
                    }

                    className="
                      px-4
                      py-2
                      bg-red-600
                      text-white
                      rounded-lg
                    "

                  >

                    Refuser

                  </button>

                </div>

              )

            }

          </div>

        ))}

      </div>

    </section>

  );
}
