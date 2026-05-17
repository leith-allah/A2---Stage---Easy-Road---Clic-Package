
export default function AgencyCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Agence
      </h2>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">
            Nom Agence
          </p>

          <p className="font-semibold">
            Easy Road Travel
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Bureau
          </p>

          <p className="font-semibold">
            Alger Centre
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Statut
          </p>

          <p className="font-semibold text-green-600">
            Vérifié
          </p>
        </div>
      </div>
    </div>
  );
}
