
// src/features/packages/admin/components/FlightSelector.tsx

type Props = {
  flightData: any;
  setFlightData: any;
};

export default function FlightSelector({
  flightData,
  setFlightData,
}: Props) {

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">

      <h2 className="text-3xl font-bold mb-8">
        Vol
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="font-semibold">
            Compagnie Aérienne
          </label>

          <input
            type="text"
            name="airline"
            value={flightData.airline}
            onChange={handleChange}
            placeholder="Emirates"
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Numéro Vol
          </label>

          <input
            type="text"
            name="flightNumber"
            value={flightData.flightNumber}
            onChange={handleChange}
            placeholder="EK202"
            className="w-full border rounded-2xl p-4"
          />
        </div>
      </div>
    </div>
  );
}
