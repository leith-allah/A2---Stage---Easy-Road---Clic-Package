
export default function PersonalPage() {
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
        Informations personnelles
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <p className="text-sm text-gray-500">
            NIN
          </p>

          <p className="font-semibold text-lg">
            123456789012345678
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Date de naissance
          </p>

          <p className="font-semibold text-lg">
            14 Avril 2004
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Nationalité
          </p>

          <p className="font-semibold text-lg">
            Algérienne
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Date création compte
          </p>

          <p className="font-semibold text-lg">
            03 Janvier 2026
          </p>
        </div>

      </div>
    </div>
  );
}
