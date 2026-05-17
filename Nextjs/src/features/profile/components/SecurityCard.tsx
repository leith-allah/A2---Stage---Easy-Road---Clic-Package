
export default function SecurityCard() {
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
        Sécurité
      </h2>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Mot de passe
            </p>

            <p className="text-gray-500 text-sm">
              Dernière modification il y a 30 jours
            </p>
          </div>

          <button className="text-blue-600 font-semibold">
            Modifier
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Double authentification
            </p>

            <p className="text-gray-500 text-sm">
              Désactivée
            </p>
          </div>

          <button className="text-blue-600 font-semibold">
            Activer
          </button>
        </div>
      </div>
    </div>
  );
}
