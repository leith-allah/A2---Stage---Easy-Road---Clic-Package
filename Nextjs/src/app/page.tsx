
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <section
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        py-24
        gap-8
      "
    >
      <div className="space-y-6">
        <h1
          className="
            text-5xl
            font-bold
            text-blue-600
          "
        >
          Bienvenue sur Clic Package
        </h1>

        <p
          className="
            max-w-2xl
            text-lg
            text-gray-600
          "
        >
          Réservez facilement vos trajets,
          gérez vos réservations et voyagez
          en toute simplicité.
        </p>
      </div>

      <div className="flex gap-4">
        <Button text="Commencer" />

        <Button text="En savoir plus" />
      </div>
    </section>
  );
}
