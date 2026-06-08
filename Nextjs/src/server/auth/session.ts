
import { getCurrentUser }
from "@/server/middlewares/auth.middleware";

export async function getCurrentUserId() {

  const currentUser =
    await getCurrentUser();

  if (!currentUser) {

    throw new Error(
      "Non authentifié"
    );

  }

  return currentUser.sub;

}
