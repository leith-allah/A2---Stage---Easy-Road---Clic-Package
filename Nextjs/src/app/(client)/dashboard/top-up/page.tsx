
import BackButton from "@/components/navigation/BackButton";

export default function TopUpPage() {
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
          <BackButton href="/dashboard/balance" />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600">
            Recharger mon solde
          </h1>

          <p className="text-gray-600 mt-3">
            Envoyez une demande de rechargement de
            portefeuille Clic Package.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Montant souhaité
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
              rows={5}
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

          <button
            className="
              w-full
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
            Envoyer la demande
          </button>
        </form>
      </div>
    </section>
  );
}
