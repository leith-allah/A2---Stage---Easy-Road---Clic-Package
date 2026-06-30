
import { Wallet } from "@/features/wallet/types/wallet.types";


async function apiFetch(
  url: string,
  options?: RequestInit
) {

const response = await fetch(url, {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  ...options,
});

let data = null;

try {

  data = await response.json();

} catch {

  data = {};

}

if (!response.ok) {

  throw new Error(
    data?.message ||
    `Erreur ${response.status}`
  );

}

return data;
}

export async function getWallet() {

const result =
await apiFetch(
"/api/wallets/me"
);

return result.data;
}

export async function getBalance() {

const result =
await apiFetch(
"/api/wallets/balance"
);

return result.data.balance;
}

export async function topUpWallet(
amount: number
) {

const result =
await apiFetch(
"/api/wallets/topup",
{
method: "POST",
body: JSON.stringify({
amount,
}),
}
);

return result.data;
}

export async function transferWallet(
recipientId: number,
amount: number
) {

const result =
await apiFetch(
"/api/wallets/transfer",
{
method: "POST",
body: JSON.stringify({
recipientId,
amount,
}),
}
);

return result.data;
}
