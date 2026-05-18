
export default function AgencyPage() {
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
        Agence / Entreprise
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <p className="text-sm text-gray-500">
            Nom Agence
          </p>

          <p className="font-semibold text-lg">
            Easy Road Travel
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Matricule Agence
          </p>

          <p className="font-semibold text-lg">
            AG-2026-005
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Date création
          </p>

          <p className="font-semibold text-lg">
            05 Février 2026
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Statut juridique
          </p>

          <p className="font-semibold text-lg">
            SARL
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Adresse complète
          </p>

          <p className="font-semibold text-lg">
            Alger Centre, Algérie
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Matricule Bureau
          </p>

          <p className="font-semibold text-lg">
            BR-2026-014
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Type Bureau
          </p>

          <p className="font-semibold text-lg">
            Principal
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Numéro Agrément
          </p>

          <p className="font-semibold text-lg">
            AGR-558812
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">
            RIB / IBAN
          </p>

          <p className="font-semibold text-lg break-all">
            DZ75 1234 5678 9012 3456 7890
          </p>
        </div>

      </div>
    </div>
  );
}
