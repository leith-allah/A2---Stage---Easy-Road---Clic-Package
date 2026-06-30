
export async function createAccountRequest(
  payload: any
) {

  const response = await fetch(
    "/api/account-requests",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data.message ??
      "Impossible d'envoyer la demande."
    );

  }

  return data;

}



export async function login(
  email: string,
  password: string
) {

  const response = await fetch(
    "/api/auth/login",
    {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data.message ??
      "Connexion impossible."
    );

  }

  return data;

}



export async function logout() {

  await fetch(
    "/api/auth/logout",
    {
      method: "POST",
      credentials: "include",
    }
  );

}



export async function getMe() {

  const response = await fetch(
    "/api/auth/me",
    {
      credentials: "include",
    }
  );

  if (!response.ok) {

    return null;

  }

  return response.json();

}
