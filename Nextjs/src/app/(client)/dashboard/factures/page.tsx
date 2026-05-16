
export default function InvoicesPage() {
  const invoices = [
    {
      id: "FAC-2026-001",
      packageName: "Package Dubai Luxury",
      amount: "350 000 DZD",
      status: "Payée",
      date: "12 Mai 2026",
    },
    {
      id: "FAC-2026-002",
      packageName: "Package Turquie",
      amount: "180 000 DZD",
      status: "En attente",
      date: "03 Mai 2026",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-blue-600">
            Factures
          </h1>

          <p className="text-gray-600 mt-3">
            Consultez et téléchargez toutes les factures
            liées à vos achats de packages.
          </p>
        </div>

        {/* Liste */}
        <div className="space-y-5">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-6
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-6
              "
            >
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  {invoice.id}
                </p>

                <h2 className="text-xl font-bold">
                  {invoice.packageName}
                </h2>

                <p className="text-gray-500">
                  {invoice.date}
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Montant
                </p>

                <h3 className="text-2xl font-bold">
                  {invoice.amount}
                </h3>
              </div>

              <div className="text-center">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-green-600
                  "
                >
                  {invoice.status}
                </p>
              </div>

              <button
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  text-white
                  px-6
                  py-3
                  rounded-full
                  font-semibold
                "
              >
                Télécharger PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
