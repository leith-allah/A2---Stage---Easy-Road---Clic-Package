
export default function ProfileHeader() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        flex
        flex-col
        md:flex-row
        items-center
        gap-8
      "
    >
      {/* Avatar */}
      <div
        className="
          w-32
          h-32
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          text-5xl
          font-bold
          text-blue-600
        "
      >
        L
      </div>

      {/* Infos */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold">
          Leith Allah
        </h1>

        <p className="text-gray-500 mt-2">
          Administrateur Agence
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold">
              leith@example.com
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Téléphone
            </p>

            <p className="font-semibold">
              +213 555 00 00 00
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Numéro de compte
            </p>

            <p className="font-semibold">
              CP-2026-00125
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Pays
            </p>

            <p className="font-semibold">
              Algérie
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4">
        <button
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
          Modifier Profil
        </button>

        <button
          className="
            border
            border-red-300
            text-red-500
            hover:bg-red-50
            transition
            px-6
            py-3
            rounded-full
            font-semibold
          "
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
