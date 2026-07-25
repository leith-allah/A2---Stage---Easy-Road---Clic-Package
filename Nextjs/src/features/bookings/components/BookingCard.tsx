
"use client";

import Link from "next/link";
import BookingStatusBadge from "./BookingStatusBadge";
import { Calendar, Users, Ticket, MapPin } from "lucide-react";

export default function BookingCard({ booking }: { booking: any }) {
  // 1. Correction de l'image vide ou cassée
  const imageUrl =
    booking.image?.trim()
      ? booking.image
      : booking.package?.image?.trim()
      ? booking.package.image
      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  // 2. Formatage des dates au format lisible (ex: 20 Janv. 2027)
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // 3. Tronquer proprement les N° de réservation trop longs (UUID)
  const bookingRef =
    booking.bookingNumber || booking.mle_ach || String(booking.id || "-");
  const displayRef =
    bookingRef.length > 14 ? `${bookingRef.slice(0, 10)}...` : bookingRef;

  const totalAmount = Number(booking.total ?? booking.montant_total ?? 0);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-slate-100 group">
      <div>
        {/* IMAGE */}
        <div className="h-52 relative overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={booking.packageTitle || "Package"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 z-10">
            <BookingStatusBadge status={booking.status} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 line-clamp-1">
              {booking.packageTitle || booking.package?.name || "Package Voyage"}
            </h2>
            <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1 font-medium">
              <MapPin size={15} className="text-blue-600 shrink-0" />
              {booking.destination || booking.package?.destination || "Destination"}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 text-sm text-slate-600 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500">
                <Ticket size={16} className="text-slate-400" /> N° Résa :
              </span>
              <span
                className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs"
                title={bookingRef}
              >
                {displayRef}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500">
                <Users size={16} className="text-slate-400" /> Voyageurs :
              </span>
              <span className="font-semibold text-slate-800">
                {booking.travelers || booking.nb_voyageurs || 1} PAX
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
              <span className="flex items-center gap-2 text-slate-500">
                <Calendar size={16} className="text-slate-400" /> Dates :
              </span>
              <span className="font-medium text-slate-800 text-xs">
                {formatDate(booking.departureDate)} ➔ {formatDate(booking.returnDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 pb-6 pt-2 flex justify-between items-center border-t border-slate-100 mt-2">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
            Total Payé
          </p>
          <p className="text-2xl font-extrabold text-blue-600">
            {totalAmount.toLocaleString("fr-FR")}{" "}
            <span className="text-sm font-bold">DZD</span>
          </p>
        </div>

        <Link
          href={`/dashboard/bookings/${booking.id}`}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg text-sm"
        >
          Voir
        </Link>
      </div>
    </div>
  );
}
