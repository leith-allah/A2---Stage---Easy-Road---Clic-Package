
import {
  ApiError,
} from "@/lib/api-error";

export default function
useApiError() {

  function getMessage(
    error: unknown
  ) {

    if (
      error instanceof
      ApiError
    ) {

      switch (
        error.status
      ) {

        case 401:
          return "Session expirée.";

        case 403:
          return "Accès interdit.";

        case 404:
          return "Ressource introuvable.";

        case 500:
          return "Erreur serveur.";

        default:
          return error.message;
      }
    }

    return (
      "Une erreur inconnue est survenue."
    );
  }

  return {
    getMessage,
  };
}
