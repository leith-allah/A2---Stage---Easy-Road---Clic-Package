
type Props = {
  open: boolean;

  onClose: () => void;
};

export default function
InsufficientFundsModal({
  open,
  onClose,
}: Props) {

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          p-10
          w-full
          max-w-md
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            text-red-600
          "
        >
          Solde insuffisant
        </h2>

        <p className="mt-4 text-gray-600">
          Votre portefeuille ne contient
          pas assez de fonds pour effectuer
          cette réservation.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={onClose}
            className="
              border
              border-gray-300
              py-3
              rounded-full
              font-semibold
            "
          >
            Fermer
          </button>

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              py-3
              rounded-full
              font-semibold
            "
          >
            Recharger
          </button>
        </div>
      </div>
    </div>
  );
}
