
"use client";

type Props = {
  status: string;
};

export default function BookingStatusBadge({ status }: Props) {
  const normalized = (status || "").toUpperCase().trim();

  // Détection souple des statuts
  const isConfirmed = [
    "CONFIRME",
    "CONFIRMÉ",
    "CONFIRMED",
    "ACTIVE",
    "PAYE",
    "PAYÉ",
  ].includes(normalized);

  const isRefunded = ["REMBOURSE", "REMBOURSÉ", "REFUNDED"].includes(
    normalized
  );

  const isCancelled = ["ANNULE", "ANNULÉ", "CANCELLED"].includes(normalized);

  let badgeClasses =
    "bg-emerald-100 text-emerald-700 border border-emerald-300";
  let label = "CONFIRMÉ";

  if (isCancelled) {
    badgeClasses = "bg-red-100 text-red-700 border border-red-300";
    label = "ANNULÉ";
  } else if (isRefunded) {
    badgeClasses = "bg-purple-100 text-purple-700 border border-purple-300";
    label = "REMBOURSÉ";
  } else if (!isConfirmed) {
    label = normalized || "EN ATTENTE";
    badgeClasses = "bg-amber-100 text-amber-700 border border-amber-300";
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-3.5 py-1.5
        rounded-full
        text-xs font-bold uppercase tracking-wider
        whitespace-nowrap
        shadow-sm
        ${badgeClasses}
      `}
    >
      {label}
    </span>
  );
}
