
type Props = {
  packageData: any;
  hotelData: any;
  flightData: any;
  transportData: any;
  excursionData: any;
  pricingData: any;
};

export default function PackagePreview({
  packageData,
  hotelData,
  flightData,
  transportData,
  excursionData,
  pricingData,
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">
      <h2 className="text-3xl font-bold mb-6">
        Aperçu du Package
      </h2>

      <div className="space-y-4">

        <div className="h-60 rounded-2xl overflow-hidden bg-gray-200">
          {packageData.image ? (
            <img
              src={packageData.image}
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Aucune image
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold">
            {packageData.title || "Nom Package"}
          </h3>

          <p className="text-gray-500">
            {packageData.city || "Ville"},{" "}
            {packageData.country || "Pays"}
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">

          <p>
            🏨 {hotelData.hotelName || "Hôtel"}
          </p>

          <p>
            ✈️ {flightData.airline || "Compagnie"}
          </p>

          <p>
            🎯 {excursionData.name || "Excursion"}
          </p>

          <p>
            📦 {pricingData.stock || 0} places
          </p>
        </div>

        <div className="pt-4 border-t">
          <p className="text-gray-500 text-sm">
            Prix de Base
          </p>

          <p className="text-3xl font-bold text-blue-600">
            {pricingData.basePrice || 0} DZD
          </p>
        </div>
      </div>
    </div>
  );
}
