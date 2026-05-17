
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-red-50
        px-6
      "
    >
      <div className="text-center max-w-xl">
        <div className="text-7xl mb-6">
          ⛔
        </div>

        <h1 className="text-5xl font-bold text-red-600">
          403
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Accès interdit
        </h2>

        <p className="text-gray-700 mt-4 text-lg">
          Vous n’avez pas les permissions
          nécessaires pour accéder à cette page.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/dashboard"
            className="
              bg-red-600
              hover:bg-red-700
              transition
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
            "
          >
            Retour au dashboard
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
