
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        px-6
      "
    >
      <div className="text-center max-w-xl">
        <div className="text-7xl mb-6">
          🔐
        </div>

        <h1 className="text-5xl font-bold text-blue-600">
          401
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Connexion requise
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          Vous devez être connecté pour accéder
          à cette page.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/login"
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
            "
          >
            Se connecter
          </Link>

          <Link
            href="/"
            className="
              border
              border-gray-300
              hover:bg-gray-100
              transition
              px-8
              py-4
              rounded-full
              font-semibold
            "
          >
            Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
