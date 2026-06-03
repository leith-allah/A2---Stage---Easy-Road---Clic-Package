
import BackButton from "@/components/navigation/BackButton";

export default function TransactionsPage() {
  const transactions = [
    {
      id: 1,
      type: "Envoi",
      user: "Agence Horizon",
      account: "ER-4582",
      amount: "- 35 000 DZD",
    },
    {
      id: 2,
      type: "Réception",
      user: "Travel Pro",
      account: "ER-9821",
      amount: "+ 20 000 DZD",
    },
    {
      id: 3,
      type: "Paiement",
      user: "Clic Package",
      account: "ER-0001",
      amount: "- 120 000 DZD",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
                
        {/* Bouton Retour */}
        <div className="mb-6">
          <BackButton href="/dashboard/balance" />
        </div>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              Transactions
            </h1>

            <p className="text-gray-600 mt-2">
              Historique complet des opérations du compte.
            </p>
          </div>

          {/* Tri */}
          <select
            className="
              border
              rounded-2xl
              px-5
              py-3
              bg-white
              shadow-sm
              outline-none
            "
          >
            <option>Trier par</option>
            <option>Type</option>
            <option>Date la plus récente</option>
            <option>Date la plus ancienne</option>
            <option>Montant croissant</option>
            <option>Montant décroissant</option>
          </select>
        </div>

        {/* Liste */}
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                flex
                items-center
                justify-between
                gap-6
              "
            >
              <div className="flex flex-col">
                <span
                  className="
                    text-sm
                    text-blue-600
                    font-semibold
                    mb-1
                  "
                >
                  {transaction.type}
                </span>

                <h2 className="font-bold text-lg">
                  {transaction.user}
                </h2>

                <p className="text-gray-500 text-sm">
                  {transaction.account}
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-xl
                    font-bold
                  "
                >
                  {transaction.amount}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
