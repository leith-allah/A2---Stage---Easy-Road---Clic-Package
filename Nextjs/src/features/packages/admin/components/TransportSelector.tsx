
// src/features/packages/admin/components/TransportSelector.tsx

type Props = {
  transportData: any;
  setTransportData: any;
};

export default function TransportSelector({
  transportData,
  setTransportData,
}: Props) {

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setTransportData({
      ...transportData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">

      <h2 className="text-3xl font-bold mb-8">
        Transport
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="font-semibold">
            Société
          </label>

          <input
            type="text"
            name="company"
            value={transportData.company}
            onChange={handleChange}
            placeholder="Dubai Transport"
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Trajet
          </label>

          <input
            type="text"
            name="route"
            value={transportData.route}
            onChange={handleChange}
            placeholder="Aéroport → Hôtel"
            className="w-full border rounded-2xl p-4"
          />
        </div>
      </div>
    </div>
  );
}
