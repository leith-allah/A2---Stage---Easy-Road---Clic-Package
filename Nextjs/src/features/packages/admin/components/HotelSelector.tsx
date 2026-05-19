
type Props = {
  hotelData: any;
  setHotelData: any;
};

const existingHotels = [
  {
    name: "Atlantis The Palm",
    address: "Palm Jumeirah, Dubai",
    stars: 5,
  },
  {
    name: "Burj Al Arab",
    address: "Jumeirah Beach, Dubai",
    stars: 7,
  },
];

export default function HotelSelector({
  hotelData,
  setHotelData,
}: Props) {

  function handleSelectHotel(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const selected = existingHotels.find(
      (hotel) => hotel.name === e.target.value
    );

    if (selected) {
      setHotelData({
        existingHotel: selected.name,
        hotelName: selected.name,
        hotelAddress: selected.address,
        stars: selected.stars,
      });
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setHotelData({
      ...hotelData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">

      <h2 className="text-3xl font-bold mb-8">
        Hôtel
      </h2>

      <div className="space-y-6">

        <div className="space-y-2">
          <label className="font-semibold">
            Hôtel Existant
          </label>

          <select
            onChange={handleSelectHotel}
            className="w-full border rounded-2xl p-4"
          >
            <option value="">
              Sélectionner un hôtel
            </option>

            {existingHotels.map((hotel) => (
              <option
                key={hotel.name}
                value={hotel.name}
              >
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-2">
            <label className="font-semibold">
              Nom Hôtel
            </label>

            <input
              type="text"
              name="hotelName"
              value={hotelData.hotelName}
              onChange={handleChange}
              className="w-full border rounded-2xl p-4"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold">
              Nombre Étoiles
            </label>

            <input
              type="number"
              name="stars"
              value={hotelData.stars}
              onChange={handleChange}
              className="w-full border rounded-2xl p-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Adresse
          </label>

          <input
            type="text"
            name="hotelAddress"
            value={hotelData.hotelAddress}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />
        </div>
      </div>
    </div>
  );
}
