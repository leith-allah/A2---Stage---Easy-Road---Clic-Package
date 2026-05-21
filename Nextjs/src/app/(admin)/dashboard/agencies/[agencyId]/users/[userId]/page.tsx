
"use client";

export default function UserDetailsPage() {

  const user = {
    id: 1,

    firstname: "Thomas",
    lastname: "Dubois",

    email:
      "thomas@travelhorizon.com",

    phone: "+33 6 12 44 88 91",

    matricule: "USR-001",

    wallet: "WAL-001",

    status: "ACTIVE",

    nin: "1928374657281",

    nationality: "Française",

    birthDate: "1995-06-14",

    createdAt: "2026-01-13",

    lastLogin:
      "2026-05-18 14:22",

    lastIp: "192.168.1.17",

    twoFactor: true,

    agency: "Travel Horizon",

    role: "Manager",

    balance: 884000,
  };

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

          {/* LEFT */}
          <div className="flex gap-5 items-center">

            {/* AVATAR */}
            <div
              className="
                w-24
                h-24
                rounded-full
                bg-blue-100
                flex
                items-center
                justify-center
                text-3xl
                font-bold
                text-blue-700
              "
            >
              TD
            </div>

            {/* INFOS */}
            <div>
              <h1 className="text-5xl font-bold text-blue-600">
                {user.firstname}
                {" "}
                {user.lastname}
              </h1>

              <p className="text-gray-600 mt-2 text-lg">
                {user.email}
              </p>

              <div
                className="
                  flex
                  gap-3
                  flex-wrap
                  mt-4
                "
              >

                <div
                  className="
                    bg-blue-100
                    text-blue-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >
                  {user.role}
                </div>

                <div
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

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
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex
              flex-wrap
              gap-4
              h-fit
            "
          >

            <button
              className="
                bg-yellow-100
                text-yellow-700
                hover:bg-yellow-200
                transition
                px-5
                py-3
                rounded-full
                font-semibold
              "
            >
              Réinitialiser MDP
            </button>

            <button
              className="
                bg-red-100
                text-red-700
                hover:bg-red-200
                transition
                px-5
                py-3
                rounded-full
                font-semibold
              "
            >
              Suspendre
            </button>

            <button
              className="
                bg-gray-900
                text-white
                hover:bg-black
                transition
                px-5
                py-3
                rounded-full
                font-semibold
              "
            >
              Déconnecter Sessions
            </button>
          </div>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            xl:grid-cols-2
            gap-8
            items-start
          "
        >

          {/* PERSONAL */}
          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
            "
          >
            <h2 className="text-3xl font-bold mb-8">
              Informations Personnelles
            </h2>

            <div className="space-y-5 text-gray-700">

              <p>
                👤 Matricule :
                {" "}
                {user.matricule}
              </p>

              <p>
                📧 Email :
                {" "}
                {user.email}
              </p>

              <p>
                📱 Téléphone :
                {" "}
                {user.phone}
              </p>

              <p>
                🪪 NIN :
                {" "}
                {user.nin}
              </p>

              <p>
                🌍 Nationalité :
                {" "}
                {user.nationality}
              </p>

              <p>
                🎂 Naissance :
                {" "}
                {user.birthDate}
              </p>

              <p>
                📅 Création :
                {" "}
                {user.createdAt}
              </p>

              <p>
                🏢 Agence :
                {" "}
                {user.agency}
              </p>
            </div>
          </div>

          {/* SECURITY */}
          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
            "
          >
            <h2 className="text-3xl font-bold mb-8">
              Sécurité
            </h2>

            <div className="space-y-5 text-gray-700">

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <span>
                  🔒 Mot de passe
                </span>

                <div
                  className="
                    bg-gray-100
                    px-4
                    py-2
                    rounded-xl
                    font-mono
                  "
                >
                  ************
                </div>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <span>
                  🛡️ A2F
                </span>

                <div
                  className={`
                    px-4
                    py-2
                    rounded-full
                    font-semibold

                    ${
                      user.twoFactor
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
                  {user.twoFactor
                    ? "ACTIVÉ"
                    : "DÉSACTIVÉ"}
                </div>
              </div>

              <p>
                🌐 Dernière IP :
                {" "}
                {user.lastIp}
              </p>

              <p>
                🕒 Dernière connexion :
                {" "}
                {user.lastLogin}
              </p>
            </div>
          </div>
        </div>

        {/* WALLET */}
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
              flex-col
              xl:flex-row
              justify-between
              gap-6
              items-start
            "
          >

            <div>
              <h2 className="text-3xl font-bold">
                Portefeuille
              </h2>

              <p className="text-gray-500 mt-2">
                Informations financières
                du compte.
              </p>
            </div>

            <div className="text-right">

              <p className="text-gray-500">
                Solde Disponible
              </p>

              <h3
                className="
                  text-5xl
                  font-bold
                  text-blue-600
                  mt-2
                "
              >
                {user.balance.toLocaleString()}
                {" "}
                DZD
              </h3>

              <p className="text-gray-500 mt-3">
                {user.wallet}
              </p>
            </div>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            mt-8
            border-2
            border-red-200
          "
        >
          <h2 className="text-3xl font-bold text-red-600">
            Zone Dangereuse
          </h2>

          <p className="text-gray-600 mt-3">
            Les actions ci-dessous sont
            irréversibles.
          </p>

          <div className="mt-8">

            <button
              className="
                bg-red-600
                hover:bg-red-700
                transition
                text-white
                px-8
                py-4
                rounded-full
                font-semibold
              "
            >
              Supprimer Compte
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
