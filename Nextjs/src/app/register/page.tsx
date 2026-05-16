
export default function RegisterPage() {
  return (
    <section
      className="
        flex
        items-center
        justify-center
        py-20
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          bg-white
          shadow-xl
          rounded-2xl
          p-10
        "
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600">
            Créer un compte
          </h1>

          <p className="text-gray-600 mt-3">
            Rejoignez Easy Package et accédez à une plateforme
            complète de gestion de voyages B2B.
          </p>
        </div>

        <form className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-medium">
              Nom
            </label>

            <input
              type="text"
              placeholder="Nom"
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
              Prénom
            </label>

            <input
              type="text"
              placeholder="Prénom"
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

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Email professionnel
            </label>

            <input
              type="email"
              placeholder="Email"
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

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="Mot de passe"
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

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Nom de l’agence
            </label>

            <input
              type="text"
              placeholder="Agence"
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
              md:col-span-2
              bg-blue-600
              text-white
              py-3
              rounded-xl
              hover:bg-blue-700
              transition
              font-medium
            "
          >
            Créer mon compte
          </button>
        </form>
      </div>
    </section>
  );
}
