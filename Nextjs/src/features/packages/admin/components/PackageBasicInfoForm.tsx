
type Props = {
  packageData: any;
  setPackageData: any;
};

export default function PackageBasicInfoForm({
  packageData,
  setPackageData,
}: Props) {

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPackageData({
      ...packageData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">

      <h2 className="text-3xl font-bold mb-8">
        Informations Package
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="font-semibold">
            Nom Package
          </label>

          <input
            type="text"
            name="title"
            value={packageData.title}
            onChange={handleChange}
            placeholder="Dubai Luxury"
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Pays
          </label>

          <input
            type="text"
            name="country"
            value={packageData.country}
            onChange={handleChange}
            placeholder="Émirats Arabes Unis"
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Ville
          </label>

          <input
            type="text"
            name="city"
            value={packageData.city}
            onChange={handleChange}
            placeholder="Dubai"
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={packageData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Date Départ
          </label>

          <input
            type="date"
            name="departureDate"
            value={packageData.departureDate}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Date Retour
          </label>

          <input
            type="date"
            name="returnDate"
            value={packageData.returnDate}
            onChange={handleChange}
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
          value={packageData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Description du package..."
          className="w-full border rounded-2xl p-4 resize-none"
        />
      </div>
    </div>
  );
}
