
"use client";

import jsPDF from "jspdf";

import html2canvas from "html2canvas-pro";

import QRCode from "react-qr-code";

import { Booking }
from "@/types/booking.types";

type Props = {
  booking: Booking;
};

export default function InvoicePDF({
  booking,
}: Props) {

  const generatePDF = async () => {

    const input =
      document.getElementById(
        "invoice-content"
      );

    if (!input) return;

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 500)
    );

    const canvas = await html2canvas(
      input,
      {
         useCORS: true,
         allowTaint: true,
         backgroundColor: "#ffffff",
      }
        );

    const imgData =
      canvas.toDataURL(
          "image/jpeg",
          1.0
      );

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const pdfWidth = 210;

    const imgWidth = 210;

    const imgHeight =
    (canvas.height * imgWidth)
    / canvas.width || 297;

    if (!imgHeight || isNaN(imgHeight)) {
      return;
    }

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      imgWidth,
      imgHeight
    );
    
    pdf.save(
      `invoice-${booking.bookingNumber}.pdf`
    );
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={generatePDF}
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
        Télécharger Facture
      </button>

      {/* PDF CONTENT */}
      <div
        style={{
            position: "fixed",
            top: 0,
            left: "-99999px",
            width: "800px",
            zIndex: -1,
            background: "white",
        }}
      >

        <div
          id="invoice-content"
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            width: "800px",
            color: "#111827",
            fontFamily: "Arial",
          }}
        >

          {/* HEADER */}
          <div
            className="
              flex
              justify-between
              items-start
              border-b
              pb-8
            "
          >
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#2563eb",
                }}
              >
                CLIC PACKAGE
              </h1>

              <p className="text-gray-500 mt-2">
                Facture Réservation
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                Facture #
              </p>

              <p>
                {booking.bookingNumber}
              </p>

              <p className="mt-4">
                {booking.createdAt}
              </p>
            </div>
          </div>

          {/* CLIENT */}
          <div className="mt-10">

            <h2
              className="
                text-2xl
                font-bold
                mb-5
              "
            >
              Client
            </h2>

            <div className="space-y-2">
              <p>
                Nom :
                {" "}
                Leith Amokrane
              </p>

              <p>
                Email :
                {" "}
                leith@example.com
              </p>

              <p>
                Réservation :
                {" "}
                {booking.bookingNumber}
              </p>
            </div>
          </div>

          {/* BOOKING */}
          <div className="mt-10">

            <h2
              className="
                text-2xl
                font-bold
                mb-5
              "
            >
              Détails Voyage
            </h2>

            <div className="space-y-3">

              <p>
                Package :
                {" "}
                {booking.packageTitle}
              </p>

              <p>
                Destination :
                {" "}
                {booking.destination}
              </p>

              <p>
                Voyageurs :
                {" "}
                {booking.travelers}
              </p>

              <p>
                Départ :
                {" "}
                {booking.departureDate}
              </p>

              <p>
                Retour :
                {" "}
                {booking.returnDate}
              </p>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="mt-10">

            <h2
              className="
                text-2xl
                font-bold
                mb-5
              "
            >
              Paiement
            </h2>

            <div
              style={{
                 backgroundColor: "#f3f4f6",
                 borderRadius: "16px",
                 padding: "24px",
              }}
            >

              <div
                className="
                  flex
                  justify-between
                  mb-4
                "
              >
                <p>Prix package</p>

                <p>
                  {booking.totalPrice
                    .toLocaleString()}
                  {" "}
                  DZD
                </p>
              </div>

              <div
                className="
                  flex
                  justify-between
                  mb-4
                "
              >
                <p>TVA</p>

                <p>0 DZD</p>
              </div>

              <div
                className="
                  flex
                  justify-between
                  border-t
                  pt-4
                  text-2xl
                  font-bold
                "
              >
                <p>Total</p>

                <p>
                  {booking.totalPrice
                    .toLocaleString()}
                  {" "}
                  DZD
                </p>
              </div>
            </div>
          </div>

          {/* QR */}
          <div
            className="
              mt-12
              flex
              justify-between
              items-end
            "
          >

            <div>
              <p className="font-bold mb-3">
                QR Réservation
              </p>

              <QRCode
                value={
                  booking.bookingNumber
                }
                size={120}
              />
            </div>

            <div className="text-right">
              <p className="text-gray-500">
                Merci pour votre confiance.
              </p>

              <p className="font-bold mt-2">
                Clic Package
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
