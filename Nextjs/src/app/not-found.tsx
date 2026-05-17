
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-50
        to-white
        px-6
      "
    >
      <div className="text-center max-w-2xl">
        <h1
          className="
            text-8xl
            font-extrabold
            text-blue-600
          "
        >
          404
        </h1>

        <h2 className="text-4xl font-bold mt-6">
          Page introuvable
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          Oups... La page que vous recherchez
          semble avoir disparu ou n’existe pas.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/"
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
            Retour à l’accueil
          </Link>

          <Link
            href="/contact"
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
            Contacter le support
          </Link>
        </div>
      </div>
    </section>
  );
}
