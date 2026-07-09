
"use client";

interface Props {
  data: any;
  setData: any;
  next: () => void;
}

export default function StepPackage({
  data,
  setData,
  next,
}: Props) {

  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    next();

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <label>Nom du Package</label>

        <input
          className="w-full border rounded p-3"
          value={data.package.name ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                name: e.target.value,
              },
            }))
          }
          required
        />

      </div>

      <div>

        <label>Pays</label>

        <input
          className="w-full border rounded p-3"
          value={data.package.country ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                country: e.target.value,
              },
            }))
          }
          required
        />

      </div>

      <div>

        <label>Destination</label>

        <input
          className="w-full border rounded p-3"
          value={data.package.destination ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                destination: e.target.value,
              },
            }))
          }
          required
        />

      </div>

      <div>

        <label>Description</label>

        <textarea
          rows={4}
          className="w-full border rounded p-3"
          value={data.package.description ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                description: e.target.value,
              },
            }))
          }
        />

      </div>

      <div>

        <label>Image</label>

        <input
          className="w-full border rounded p-3"
          value={data.package.image ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                image: e.target.value,
              },
            }))
          }
        />

      </div>

      <div>

        <label>Date départ</label>

        <input
          type="date"
          className="w-full border rounded p-3"
          value={data.package.departureDate ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                departureDate: e.target.value,
              },
            }))
          }
          required
        />

      </div>

      <div>

        <label>Date retour</label>

        <input
          type="date"
          className="w-full border rounded p-3"
          value={data.package.returnDate ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                returnDate: e.target.value,
              },
            }))
          }
          required
        />

      </div>

      <div>

        <label>Prix de base</label>

        <input
          type="number"
          className="w-full border rounded p-3"
          value={data.package.basePrice ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                basePrice: Number(e.target.value),
              },
            }))
          }
          required
        />

      </div>

      <div>

        <label>Nombre de places</label>

        <input
          type="number"
          className="w-full border rounded p-3"
          value={data.package.availableSeats ?? ""}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              package: {
                ...prev.package,
                availableSeats: Number(e.target.value),
              },
            }))
          }
          required
        />

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          className="btn btn-primary"
        >
          Suivant
        </button>

      </div>

    </form>

  );

}
