
import { Notification } from "@/features/notifications/types/notification.types";

import { TRANSACTION_STATUS } 
from "@/server/constants/transaction-status"; 


export const mockNotifications: Notification[] =
  [
    {
      id: 1,
      title: "Réservation confirmée",
      message:
        "Votre réservation Dubai Luxury a été confirmée.",

      type: "SUCCESS",

      category: "BOOKING",

      read: false,

      createdAt: "2026-05-21 10:30",
    },

    {
      id: 2,
      title: "Paiement refusé",
      message:
        "Le paiement du package Maldives Escape a échoué.",

      type: "ERROR",

      category: "PAYMENT",

      read: false,

      createdAt: "2026-05-20 16:00",
    },

    {
      id: 3,
      title: "Nouvelle offre",
      message:
        "Un nouveau package Turquie Premium est disponible.",

      type: "INFO",

      category: "PACKAGE",

      read: true,

      createdAt: "2026-05-18 09:15",
    },
  ];
  