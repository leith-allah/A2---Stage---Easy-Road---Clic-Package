
// src/features/packages/admin/components/ExcursionSelector.tsx

type Props = {
  excursionData: any;
  setExcursionData: any;
};

export default function ExcursionSelector({
  excursionData,
  setExcursionData,
}: Props) {

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setExcursionData({
      ...excursionData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">

      <h2 className="text-3xl font-bold mb-8">
        Excursion
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="font-semibold">
            Nom Excursion
          </label>

          <input
            type="text"
            name="name"
            value={excursionData.name}
            onChange={handleChange}
            placeholder="Safari Dubai"
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Lieu
          </label>

          <input
            type="text"
            name="location"
            value={excursionData.location}
            onChange={handleChange}
            placeholder="Désert Dubai"
            className="w-full border rounded-2xl p-4"
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <label className="font-semibold">
          Description
        </label>

        <textarea
          name="description"
          value={excursionData.description}
          onChange={handleChange}
          rows={1}
          placeholder="Découvrez les trésors du désert"
          className="w-full border rounded-2xl p-4 resize-none"
        />
      </div>
    </div>
  );
}
