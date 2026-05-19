
// src/features/packages/admin/components/PricingForm.tsx

type Props = {
  pricingData: any;
  setPricingData: any;
};

export default function PricingForm({
  pricingData,
  setPricingData,
}: Props) {

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setPricingData({
      ...pricingData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">

      <h2 className="text-3xl font-bold mb-8">
        Prix & Stock
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="font-semibold">
            Prix de Base
          </label>

          <input
            type="number"
            name="basePrice"
            value={pricingData.basePrice}
            onChange={handleChange}
            placeholder="350000"
            className="w-full border rounded-2xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">
            Stock Disponible
          </label>

          <input
            type="number"
            name="stock"
            value={pricingData.stock}
            onChange={handleChange}
            placeholder="50"
            className="w-full border rounded-2xl p-4"
          />
        </div>
      </div>
    </div>
  );
}
