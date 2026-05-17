
import BackButton from "@/src/components/navigation/BackButton";

export default function TransferPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div
        className="
          max-w-2xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-xl
          p-10
        "
      >
                
        {/* Bouton Retour */}
        <div className="mb-6">
          <BackButton href="/dashboard/solde" />
        </div>
                
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600">
            Envoyer / Demander
          </h1>

          <p className="text-gray-600 mt-3">
            Effectuez une transaction rapidement et en
            toute sécurité.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Numéro de compte
            </label>

            <input
              type="text"
              placeholder="ER-XXXX-XXXX"
              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email du destinataire
            </label>

            <input
              type="email"
              placeholder="email@exemple.com"
              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Montant
            </label>

            <input
              type="number"
              placeholder="0.00"
              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Note
            </label>

            <textarea
              rows={4}
              placeholder="Ajouter une note..."
              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                transition
                text-white
                py-4
                rounded-full
                font-semibold
                shadow-lg
              "
            >
              Envoyer
            </button>

            <button
              className="
                border-2
                border-blue-600
                text-blue-600
                hover:bg-blue-50
                transition
                py-4
                rounded-full
                font-semibold
              "
            >
              Demander
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
