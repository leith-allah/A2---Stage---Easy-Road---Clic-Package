
export default function ProfilePage() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-10
      "
    >
      <div className="flex items-center gap-8">

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
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            Leith Allah
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div>
              <p className="text-sm text-gray-500">
                Matricule Utilisateur
              </p>

              <p className="font-semibold">
                USER-2026-001
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Statut
              </p>

              <p className="font-semibold text-green-600">
                Actif
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email Professionnel
              </p>

              <p className="font-semibold">
                leith@easyroad.com
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Numéro Portefeuille
              </p>

              <p className="font-semibold">
                WALLET-55892
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
