
export default function SecurityPage() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-10
      "
    >
      <h1 className="text-4xl font-bold mb-10">
        Sécurité
      </h1>

      <div className="space-y-8">

        {/* Mot de passe */}
        <div
          className="
            border
            rounded-2xl
            p-6
            flex
            justify-between
            items-center
          "
        >
          <div>
            <p className="text-sm text-gray-500">
              Mot de passe
            </p>

            <p className="font-semibold text-lg">
              **************
            </p>
          </div>

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              px-5
              py-3
              rounded-full
            "
          >
            Modifier
          </button>
        </div>

        {/* A2F */}
        <div
          className="
            border
            rounded-2xl
            p-6
            flex
            justify-between
            items-center
          "
        >
          <div>
            <p className="text-sm text-gray-500">
              Double Authentification
            </p>

            <p className="font-semibold text-green-600">
              Activée
            </p>
          </div>

          <button
            className="
              border
              border-blue-300
              text-blue-600
              px-5
              py-3
              rounded-full
            "
          >
            Configurer
          </button>
        </div>

        {/* Suppression */}
        <div
          className="
            border
            border-red-200
            bg-red-50
            rounded-2xl
            p-6
          "
        >
          <h2 className="text-xl font-bold text-red-600">
            Suppression du compte
          </h2>

          <p className="text-gray-600 mt-2">
            Cette action est irréversible.
          </p>

          <button
            className="
              mt-5
              bg-red-600
              hover:bg-red-700
              transition
              text-white
              px-6
              py-3
              rounded-full
            "
          >
            Supprimer mon compte
          </button>
        </div>

      </div>
    </div>
  );
}
