
"use client";

import Link from "next/link";

export default function AgencyDetailsPage() {

  const agency = {
    id: 1,
    name: "Travel Horizon",
    matricule: "AG-2026-001",
    legalStatus: "SARL",
    country: "France",
    city: "Paris",
    address:
      "15 Avenue des Champs-Élysées",
    createdAt: "2026-01-12",
    approvalNumber: "AGR-77219",
    rib: "FR76 1027 8030 5100",
    iban:
      "FR761027803051000000000",
    users: 24,
    reservations: 182,
    revenue: 12500000,
    wallet: 884000,
    status: "ACTIVE",
  };

  const users = [
    {
      id: 1,
      firstname: "Thomas",
      lastname: "Dubois",
      email:
        "thomas@travelhorizon.com",
      matricule: "USR-001",
      wallet: "WAL-001",
      status: "ACTIVE",
    },

    {
      id: 2,
      firstname: "Sarah",
      lastname: "Martin",
      email:
        "sarah@travelhorizon.com",
      matricule: "USR-002",
      wallet: "WAL-002",
      status: "SUSPENDED",
    },

    {
      id: 3,
      firstname: "Lucas",
      lastname: "Petit",
      email:
        "lucas@travelhorizon.com",
      matricule: "USR-003",
      wallet: "WAL-003",
      status: "ACTIVE",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            xl:flex-row
            justify-between
            gap-6
            mb-10
          "
        >
          <div>
            <h1 className="text-5xl font-bold text-blue-600">
              {agency.name}
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Gestion complète de l’agence.
            </p>
          </div>

          <div
            className={`
              h-fit
              px-5
              py-3
              rounded-full
              font-semibold

              ${
                agency.status ===
                "ACTIVE"
                  ? `
                    bg-green-100
                    text-green-700
                  `
                  : `
                    bg-red-100
                    text-red-700
                  `
              }
            `}
          >
            {agency.status ===
            "ACTIVE"
              ? "AGENCE ACTIVE"
              : "AGENCE SUSPENDUE"}
          </div>
        </div>

        {/* TOP GRID */}
        <div
          className="
            grid
            xl:grid-cols-2
            gap-8
            items-start
          "
        >

          {/* INFOS */}
          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              Informations Agence
            </h2>

            <div className="space-y-4 text-gray-700">

              <p>
                🏢 Matricule :
                {" "}
                {agency.matricule}
              </p>

              <p>
                ⚖️ Statut juridique :
                {" "}
                {agency.legalStatus}
              </p>

              <p>
                📍 Adresse :
                {" "}
                {agency.address}
              </p>

              <p>
                🌍 Pays :
                {" "}
                {agency.country}
              </p>

              <p>
                🏙️ Ville :
                {" "}
                {agency.city}
              </p>

              <p>
                📅 Création :
                {" "}
                {agency.createdAt}
              </p>

              <p>
                🪪 Agrément :
                {" "}
                {agency.approvalNumber}
              </p>

              <p>
                🏦 RIB :
                {" "}
                {agency.rib}
              </p>

              <p>
                💳 IBAN :
                {" "}
                {agency.iban}
              </p>
            </div>
          </div>

          {/* STATS */}
          <div
            className="
              grid
              grid-cols-2
              gap-6
            "
          >

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
              "
            >
              <p className="text-gray-500">
                Utilisateurs
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {agency.users}
              </h3>
            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
              "
            >
              <p className="text-gray-500">
                Réservations
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {agency.reservations}
              </h3>
            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
              "
            >
              <p className="text-gray-500">
                Chiffre Affaire
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  mt-2
                "
              >
                {agency.revenue.toLocaleString()}
                {" "}
                DZD
              </h3>
            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
              "
            >
              <p className="text-gray-500">
                Solde Portefeuille
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  mt-2
                  text-blue-600
                "
              >
                {agency.wallet.toLocaleString()}
                {" "}
                DZD
              </h3>
            </div>
          </div>
        </div>

        {/* USERS */}
        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            mt-8
          "
        >
          <div
            className="
              flex
              justify-between
              items-center
              mb-8
            "
          >
            <h2 className="text-3xl font-bold">
              Comptes Utilisateurs
            </h2>

            <div
              className="
                bg-blue-100
                text-blue-700
                px-4
                py-2
                rounded-full
                font-semibold
              "
            >
              {users.length} comptes
            </div>
          </div>

          {/* TABLE */}
          <div className="space-y-4">

            {users.map((user) => (
              <div
                key={user.id}
                className="
                  border
                  rounded-2xl
                  p-5
                  flex
                  flex-col
                  xl:flex-row
                  xl:items-center
                  justify-between
                  gap-5
                "
              >

                {/* LEFT */}
                <div>
                  <h3 className="text-xl font-bold">
                    {user.firstname}
                    {" "}
                    {user.lastname}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {user.email}
                  </p>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-4
                      mt-3
                      text-sm
                      text-gray-600
                    "
                  >
                    <p>
                      👤 {user.matricule}
                    </p>

                    <p>
                      💼 {user.wallet}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                    flex
                    flex-wrap
                    gap-4
                    items-center
                  "
                >

                  {/* STATUS */}
                  <button
                    className={`
                      px-5
                      py-3
                      rounded-full
                      font-semibold
                      transition

                      ${
                        user.status ===
                        "ACTIVE"
                          ? `
                            bg-green-100
                            text-green-700
                          `
                          : `
                            bg-red-100
                            text-red-700
                          `
                      }
                    `}
                  >
                    {user.status ===
                    "ACTIVE"
                      ? "ACTIF"
                      : "SUSPENDU"}
                  </button>

                  {/* PROFILE */}
                  <Link
                    href={`
                      /dashboard/agencies/
                      ${agency.id}/users/${user.id}
                    `}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      transition
                      text-white
                      px-6
                      py-3
                      rounded-full
                      font-semibold
                    "
                  >
                    Voir Profil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
