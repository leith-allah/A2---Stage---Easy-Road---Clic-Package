
import {ApiError} from "./api-error";

const API_URL = "/api";

type ApiOptions = {
  method?: string;

  body?: unknown;

  token?: string;
};

export async function api(
  endpoint: string,

  options: ApiOptions = {}
) {

  const {
    method = "GET",

    body,

    token,
  } = options;

  const response =
    await fetch(
      `${API_URL}${endpoint}`,
      {
        method,

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",

          ...(token && {
            Authorization:
              `Bearer ${token}`,
          }),
        },

        body:
          body
            ? JSON.stringify(body)
            : undefined,
      }
    );

  // ERREUR HTTP
  if (!response.ok) {

    const error =
      await response.json();

    throw new ApiError(
      error.message ||
      "Erreur API",
      response.status
    );
  }

  return response.json();
}
