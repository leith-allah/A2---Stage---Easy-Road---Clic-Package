
export default function LoginPage() {
  return (
    <section
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          shadow-lg
          rounded-xl
          p-8
        "
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Connexion
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="
              border
              rounded-lg
              p-3
            "
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="
              border
              rounded-lg
              p-3
            "
          />

          <button
            className="
              bg-blue-600
              text-white
              rounded-lg
              p-3
              hover:bg-blue-700
              transition
            "
          >
            Se connecter
          </button>
        </form>
      </div>
    </section>
  );
}
