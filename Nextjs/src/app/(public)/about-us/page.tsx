
export default function AboutUsPage() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <div className="text-center space-y-6 mb-20">
        <h1 className="text-5xl font-bold text-blue-600">
          À propos de nous
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Clic Package est une plateforme B2B innovante
          dédiée aux agences de voyage, leur permettant
          d’acheter et de gérer facilement des packages
          touristiques complets.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Notre Mission
          </h2>

          <p className="text-gray-600 leading-7">
            Simplifier la gestion des voyages et offrir
            une plateforme centralisée pour les agences
            de voyage et leurs partenaires.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Notre Vision
          </h2>

          <p className="text-gray-600 leading-7">
            Devenir la référence du marché B2B du tourisme
            en proposant une expérience moderne, rapide
            et intelligente.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Nos Valeurs
          </h2>

          <p className="text-gray-600 leading-7">
            Innovation, confiance, performance et qualité
            de service sont au cœur de notre plateforme.
          </p>
        </div>
      </div>
    </section>
  );
}
