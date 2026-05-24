
const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";

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

    throw new Error(
      error.message ||
      "Erreur API"
    );
  }

  return response.json();
}
