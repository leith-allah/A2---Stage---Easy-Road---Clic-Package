
import Link from "next/link";

export default function BalancePage() {
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
          max-w-3xl
          mx-auto
          flex
          flex-col
          items-center
          gap-10
        "
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1
            className="
              text-5xl
              font-bold
              text-blue-600
            "
          >
            Mon Solde
          </h1>

          <p className="text-gray-600 text-lg">
            Gérez votre portefeuille Clic Package
          </p>
        </div>

        {/* Balance Card */}
        <div
          className="
            w-full
            bg-white
            rounded-3xl
            shadow-xl
            p-12
            text-center
            border
            border-blue-100
          "
        >
          <p className="text-gray-500 text-lg mb-4">
            Solde disponible
          </p>

          <h2
            className="
              text-6xl
              font-bold
              text-blue-600
            "
          >
            125 000 DZD
          </h2>

          <p className="text-gray-400 mt-4">
            Dernière mise à jour : aujourd’hui
          </p>
        </div>

        {/* Actions */}
        <div
          className="
            w-full
            grid
            gap-6
          "
        >
          {/* Envoyer / Demander */}
          <Link
            href="/dashboard/transfer"
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              rounded-full
              py-5
              text-center
              text-lg
              font-semibold
              shadow-lg
            "
          >
            Demander / Envoyer de l’argent
          </Link>

          {/* Recharger */}
          <Link
            href="/dashboard/top-up"
            className="
              bg-white
              hover:bg-gray-100
              transition
              border-2
              border-blue-600
              text-blue-600
              rounded-full
              py-5
              text-center
              text-lg
              font-semibold
              shadow-md
            "
          >
            Recharger mon solde
          </Link>

          {/* Transactions */}
          <Link
            href="/dashboard/transactions"
            className="
              bg-white
              hover:bg-gray-100
              transition
              border
              border-gray-200
              rounded-full
              py-5
              text-center
              text-lg
              font-semibold
              shadow-md
            "
          >
            Consulter les transactions
          </Link>

          {/* Factures */}
          <Link
            href="/dashboard/invoices"
            className="
              bg-white
              hover:bg-gray-100
              transition
              border
              border-gray-200
              rounded-full
              py-5
              text-center
              text-lg
              font-semibold
              shadow-md
            "
          >
            Consulter les factures
          </Link>
        </div>

        {/* Infos rapides */}
        <div
          className="
            w-full
            grid
            md:grid-cols-3
            gap-5
          "
        >
          <div
            className="
              bg-white
              rounded-2xl
              shadow-md
              p-6
              text-center
            "
          >
            <p className="text-gray-500 mb-2">
              Dernière transaction
            </p>

            <h3 className="font-bold text-lg">
              - 35 000 DZD
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Achat Package Dubai
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-2xl
              shadow-md
              p-6
              text-center
            "
          >
            <p className="text-gray-500 mb-2">
              Factures
            </p>

            <h3 className="font-bold text-lg">
              12
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Documents disponibles
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-2xl
              shadow-md
              p-6
              text-center
            "
          >
            <p className="text-gray-500 mb-2">
              Statut du compte
            </p>

            <h3
              className="
                font-bold
                text-lg
                text-green-600
              "
            >
              Vérifié
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Compte sécurisé
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
