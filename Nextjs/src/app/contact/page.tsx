
export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto py-20 px-6">
      <div className="space-y-4 text-center mb-14">
        <h1 className="text-5xl font-bold text-blue-600">
          Contactez-nous
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Une question, une demande de partenariat ou besoin
          d’assistance ? Notre équipe Easy Package est là pour vous aider.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Informations */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Informations
            </h2>

            <p className="text-gray-600">
              Notre équipe est disponible pour répondre à
              toutes vos demandes concernant la plateforme.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Adresse</h3>

              <p className="text-gray-600">
                Cheraga, Algérie
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Téléphone</h3>

              <p className="text-gray-600">
                +213 XX XX XX XX
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Email</h3>

              <p className="text-gray-600">
                contact@easypackage.com
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">
                Nom complet
              </label>

              <input
                type="text"
                placeholder="Votre nom"
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Votre email"
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Votre message"
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
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
                text-white
                py-3
                rounded-xl
                hover:bg-blue-700
                transition
              "
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
