
"use client";

import {
  useAuthContext,
} from "@/providers/AuthProvider";

export default function HomePage() {

  const {
    user,
  } = useAuthContext();

  console.log(
    "USER:",
    user
  );

  return (
    <div>

      <h1>Accueil</h1>

      <pre>
        {JSON.stringify(
          user,
          null,
          2
        )}
      </pre>

    </div>
  );

}
