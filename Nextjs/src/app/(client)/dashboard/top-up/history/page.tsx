
"use client";

import { useEffect }
from "react";

import { useState } 
from "react";

import BackButton
from "@/components/navigation/BackButton";

import { getMyRechargeRequests }
from "@/features/recharge-requests/services/recharge-request.service";


export default function
RechargeHistoryPage() {

  const [
    requests,
    setRequests,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    console.log(requests);

    async function load() {

      try {

        const data =
          await getMyRechargeRequests();

        setRequests(
          data
        );

      } finally {

        setLoading(
          false
        );

      }
    }

    load();

  }, []);

  return (

    <section
      className="
        min-h-screen
        bg-gray-50
        py-16
        px-6
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <div className="mb-6">
          <BackButton
            href="/dashboard/top-up"
          />
        </div>

        <h1
          className="
            text-4xl
            font-bold
            text-blue-600
            mb-8
          "
        >
          Historique des demandes
        </h1>

        {

          loading

          ? (

            <p>
              Chargement...
            </p>

          )

          : (

            <div
              className="
                space-y-4
              "
            >

              {
                requests.length === 0 ? (

                  <div
                    className="
                      bg-white
                      rounded-2xl
                      p-8
                      text-center
                      shadow-md
                    "
                  >
                    Aucune demande trouvée.
                  </div>

                ) : (

                  requests.map(
                    (request) => (

                      <div
                        key={request.id}
                        className="
                          bg-white
                          rounded-2xl
                          shadow-md
                          p-6
                        "
                      >

                        <div
                          className="
                            flex
                            justify-between
                            items-center
                          "
                        >

                          <div>

                            <h2 className="font-bold">

                              {request.amount} DZD

                            </h2>

                            <p className="text-sm text-gray-500">

                              {request.comment}

                            </p>

                          </div>

                          <span>

                            {request.status}

                          </span>

                        </div>

                      </div>

                    )
                  )

                )
              }

            </div>

          )

        }

      </div>

    </section>

  );

}
